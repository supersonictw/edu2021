<template>
  <div id="app">
    <div v-if="!initialized" id="header">
      <h1>edu2021</h1>
      <div id="start-button" @click="initialize">Start</div>
    </div>
    <div id="game" ref="game" :style="mouseHidden">
      <Map>
        <Flandre v-if="initialized"></Flandre>
        <Enemy
            v-for="(mess, uuid) in returnEnemy"
            :key="uuid"
            :style="returnPositionString(mess.top, mess.left)"
        ></Enemy>
        <Mess
            v-for="(mess, uuid) in returnMess"
            :key="uuid"
            :style="returnPositionString(mess.top, mess.left)"
        ></Mess>
      </Map>
    </div>
    <a href="#" @click.prevent="requestFullScreen">Full Screen</a>
    <div class="footer">&copy; 2020 <a href="https://github.com/supersonictw">SuperSonic</a>.</div>
  </div>
</template>

<script>
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
  computed: {
    initialized() {
      return this.$store.state.initialized;
    },
    mouseHidden() {
      return this.initialized ? 'cursor:none;' : '';
    },
    returnEnemy() {
      return Level1;
    },
    returnMess() {
      return this.$store.state.positions.messes;
    },
    boxWidth() {
      return this.$refs.game.clientWidth - 150;
    },
    boxHeight() {
      return this.$refs.game.clientHeight - 150;
    }
  },
  methods: {
    async initialize() {
      if (this.initialized) return;
      this.requestFullScreen();
      this.$store.commit(
          "setBoxSize",
          {width: this.boxWidth, height: this.boxHeight}
      );
      this.$store.commit(
          "setFlandrePosition",
          {top: this.boxHeight, left: this.boxWidth / 2}
      );
      this.$store.commit("activeGame");
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
    returnPositionString(top, left) {
      return `top: ${top}px; left: ${left}px;`
    },
    start() {

    },
    flush() {
      this.$forceUpdate();
      window.requestAnimationFrame(this.flush);
    }
  },
  created() {
    this.flush();
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
  top: 290px;
  z-index: 9;
}

#header h1 {
  margin: 100px auto;
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
