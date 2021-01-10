<template>
  <div id="app">
    <div v-if="!initialized" id="header">
      <h1>東方夜魔傳</h1>
      <p>東方闇魔伝</p>
      <img alt="EDU2021" src="@/assets/logo.svg">
      <div v-if="displayOptions">
        <Options></Options>
        <div class="button" @click="showOptions">Back to title</div>
      </div>
      <div v-else>
        <div class="button" @click="initialize">Start</div>
        <div class="button" @click="showOptions">Options</div>
      </div>
    </div>
    <div id="game" ref="game" :style="mouseHidden">
      <Map>
        <div v-if="initialized">
          <Flandre></Flandre>
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
          <ScoreBoard>
            <b>Score: {{ score[level] }}</b>
          </ScoreBoard>
        </div>
      </Map>
    </div>
    <div class="footer">
      <p id="icons">
        <a href="#" @click.prevent="requestFullScreen">
          <img alt="Full Screen" src="@/assets/fullscreen.png" title="Full Screen">
        </a>
        <a href="https://github.com/supersonictw/edu2021">
          <img alt="GitHub" src="@/assets/github.png" title="GitHub Repository">
        </a>
      </p>
      <p id="copyright">
        &copy; 2020 <a href="https://github.com/supersonictw">SuperSonic</a>.
      </p>
    </div>
  </div>
</template>

<script>
import Constant from "@/data/const";

import Options from "@/components/Options";
import ScoreBoard from "@/components/ScoreBoard";
import Map from "@/components/Maps/LevelOne";
import Mess from '@/components/Common/Mess'
import Enemy from '@/components/Common/Enemy'
import Flandre from '@/components/Common/Flandre'

import {Music, MusicPlayer} from "@/components/MusicPlayer";

import Level1 from '@/data/level/one';

export default {
  name: 'App',
  components: {
    Options,
    ScoreBoard,
    Map,
    Mess,
    Enemy,
    Flandre
  },
  data: () => ({
    displayOptions: false,
    createTime: 0,
    progress: 0,
    boss: false
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
      return this.$store.state.positions.messes;
    },
    musicPlayer() {
      return new MusicPlayer(this.isMidi);
    },
    isMidi() {
      return localStorage.getItem("isMidi") === "true";
    },
    level() {
      return this.$store.state.currentLevel;
    },
    score() {
      return this.$store.state.scores;
    }
  },
  methods: {
    async initialize() {
      if (this.initialized) return;
      this.requestFullScreen();
      const target = this.$refs.game;
      this.setBoxSize(target.clientWidth, target.clientHeight);
      this.$store.commit("activeGame");
      this.$store.commit("setLevel", 1);
      this.$store.commit("addScores", 0);
      this.createTime = Date.now();
      this.musicPlayer.choose(Music.BadApple.key);
      setTimeout(() => this.musicPlayer.play(), 1000);
    },
    showOptions() {
      this.displayOptions = !this.displayOptions;
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
            top: (boxHeight - Constant.FLANDRE.HEIGHT),
            left: (boxWidth - Constant.FLANDRE.WIDTH) / 2
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
        if (Level1[time] === true && this.boss === true){
          this.boss = false;
          this.$store.commit("inactiveGame");
          setTimeout(() => this.musicPlayer.stop(), 3000);
          this.musicPlayer.stop();
        } else if (Level1[time] === true) {
          this.boss = true;
          this.musicPlayer.choose(Music.UNOwenWasHer.key);
          setTimeout(() => this.musicPlayer.play(), 1000);
        } else {
          Level1[time].forEach(
              enemy => this.$store.dispatch("newEnemy", {timestamp: time, data: enemy})
          );
        }
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
  top: 15%;
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
  animation-duration: 1s;
}

#header p {
  animation-name: header-show;
  animation-duration: 2s;
}

#header img {
  width: 300px;
  height: auto;
  margin: 10px auto;
  animation-name: header-show;
  animation-duration: 10s;
}


.button {
  width: 100px;
  background: #40a;
  color: #cff;
  padding: 10px;
  cursor: pointer;
  margin: 15px auto;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
  animation-name: header-show;
  animation-duration: 2s;
}

.button:hover {
  background: rgba(160, 10, 250, 0.9);
}

.button:active {
  box-shadow: none;
}

#game {
  width: 100%;
  min-height: 768px;
  position: relative;
  box-shadow: 0 0 15px rgba(0, 0, 0, .3);
  background: #000;
}

h1 {
  margin: 0;
}

.footer {
  margin: 35px auto;
}

#icons img {
  width: 30px;
  padding: 10px;
}
</style>
