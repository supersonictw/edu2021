<template>
  <div id="app">
    <div v-if="!initialized" id="header">
      <h1>東方夜魔傳（東方闇魔伝）</h1>
      <img alt="EDU2021" src="@/assets/logo.svg">
      <div id="start-button" @click="initialize">Start</div>
    </div>
    <div id="game" ref="game" :style="mouseHidden">
      <Map>
        <Flandre v-if="initialized"></Flandre>
        <Enemy
            v-for="(_, hashSign) in returnEnemyInit"
            :key="hashSign"
            :hash-sign="hashSign"
        ></Enemy>
        <Mess
            v-for="(_, uuid) in returnMessInit"
            :key="uuid"
            :uuid="uuid"
        ></Mess>
      </Map>
    </div>
    <a href="#" @click.prevent="requestFullScreen">Full Screen</a>
    <div class="footer">&copy; 2020 <a href="https://github.com/supersonictw">SuperSonic</a>.</div>
  </div>
</template>

<script>
import Constant from "@/data/const";

import Map from "@/components/Map";
import Mess from '@/components/Mess'
import Enemy from '@/components/Enemy'
import Flandre from '@/components/Flandre'

import Level1 from '@/data/level/one';

export default {
  name: 'App',
  components: {
    Map,
    Mess,
    Enemy,
    Flandre
  },
  data: () => ({
    createTime: 0,
    progress: 0
  }),
  computed: {
    initialized() {
      return this.$store.state.initialized;
    },
    mouseHidden() {
      return this.initialized ? 'cursor:none;' : '';
    },
    returnEnemyInit() {
      return this.$store.state.positions.enemiesInit;
    },
    returnMessInit() {
      return this.$store.state.positions.messesInit;
    },
  },
  methods: {
    async initialize() {
      if (this.initialized) return;
      this.requestFullScreen();
      const target = this.$refs.game;
      this.setBoxSize(target.clientWidth, target.clientHeight);
      this.$store.commit("activeGame");
      this.createTime = Date.now();
    },
    requestFullScreen() {
      const element = document.getElementById("game");
      if (element.requestFullscreen) {
        /* Common */
        element.requestFullscreen();
      } else if (element.webkitRequestFullscreen) {
        /* Safari */
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        /* IE11 */
        element.msRequestFullscreen();
      } else {
        console.warn("The browser is not support requestFullscreen");
      }
    },
    setBoxSize(boxWidth, boxHeight) {
      this.$store.commit(
          "setBoxSize",
          {
            width: boxWidth,
            height: boxHeight
          }
      );
      this.setFlandreInitializedPosition(boxWidth, boxHeight);
    },
    setFlandreInitializedPosition(boxWidth, boxHeight) {
      this.$store.commit(
          "setFlandrePosition",
          {
            top: (boxHeight - Constant.flandre.height),
            left: (boxWidth - Constant.flandre.width) / 2
          }
      );
    },
    updateBoxSize() {
      const target = document.getElementById("game");
      const currentBoxWidth = target.clientWidth;
      const currentBoxHeight = target.clientHeight;
      const previousBoxWidth = this.$store.state.boxWidth;
      const previousBoxHeight = this.$store.state.boxHeight;
      this.setBoxSize(currentBoxWidth, currentBoxHeight);
      this.updateFlandreResizedPosition(
          currentBoxWidth,
          currentBoxHeight,
          previousBoxWidth,
          previousBoxHeight,
      );
    },
    updateFlandreResizedPosition(
        currentBoxWidth,
        currentBoxHeight,
        previousBoxWidth,
        previousBoxHeight
    ) {
      const currentFlandrePosition = this.$store.state.positions.flandre;
      this.$store.commit(
          "setFlandrePosition",
          {
            top: currentFlandrePosition.top * (previousBoxHeight / currentBoxHeight),
            left: currentFlandrePosition.left * (currentBoxWidth / previousBoxWidth)
          }
      );
    },
    enemyExecutor() {
      const currentTime = Date.now();
      const time = Math.floor((currentTime - this.createTime) / 100);
      if (time in Level1 && time > this.progress) {
        this.progress = time;
        Level1[time].forEach(
            enemy => this.$store.dispatch("newEnemy", {timestamp: time, data: enemy})
        );
      }
    },
    flush() {
      this.$forceUpdate();
      this.enemyExecutor();
      window.requestAnimationFrame(this.flush);
    }
  },
  created() {
    this.flush();
    window.addEventListener("resize", this.updateBoxSize);
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
}

a {
  color: #fff;
  text-decoration: none;
}

#header {
  width: 100%;
  position: absolute;
  top: 20%;
  z-index: 9;
}

@keyframes header-show {
  from {
    opacity: 0;
  }
  to {
    opacity: 100;
  }
}

#header h1 {
  animation-name: header-show;
  animation-duration: 2s;
}

#header img {
  width: 300px;
  height: auto;
  margin: 50px auto;
  animation-name: header-show;
  animation-duration: 10s;
}


#start-button {
  width: 100px;
  background: #40a;
  color: #cff;
  padding: 10px;
  cursor: pointer;
  border-radius: 10px;
  margin: 0 auto;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
  animation-name: header-show;
  animation-duration: 2s;
}

#start-button:hover {
  background: rgba(160, 10, 250, 0.9);
}

#start-button:active {
  box-shadow: none;
}

#game {
  width: 100%;
  min-height: 110vh;
  position: relative;
  margin-bottom: 90px;
  box-shadow: 0 0 15px rgba(0, 0, 0, .3);
  background: #000;
}

h1 {
  margin: 0;
}

.footer {
  margin: 50px auto;
}
</style>
