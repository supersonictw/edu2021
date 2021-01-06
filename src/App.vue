<template>
  <div id="app">
    <div v-if="!initialized" id="start-button" @click="initialize">Start</div>
    <div id="game" ref="game" :style="mouseHidden">
      <Map>
        <Flandre v-if="initialized"></Flandre>
        <Mess
            v-for="(mess, uuid) in returnMess()"
            :key="uuid"
            :style="returnMessPosition(mess.top, mess.left)"
        ></Mess>
      </Map>
    </div>
    <div class="footer">&copy; 2020 <a href="https://github.com/supersonictw">SuperSonic</a>.</div>
  </div>
</template>

<script>
import Map from "@/components/Map";
import Mess from '@/components/Mess'
import Flandre from '@/components/Flandre'

export default {
  name: 'App',
  components: {
    Map,
    Mess,
    Flandre
  },
  computed: {
    initialized() {
      return this.$store.state.initialized;
    },
    mouseHidden() {
      return this.initialized ? 'cursor:none;' : '';
    },
    boxWidth() {
      return this.$refs.game.clientWidth - 50;
    },
    boxHeight() {
      return this.$refs.game.clientHeight - 50;
    }
  },
  methods: {
    async initialize() {
      if (this.initialized) return;
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
    returnMess() {
      return this.$store.state.positions.messes;
    },
    returnMessPosition(top, left) {
      return `top: ${top}px; left: ${left}px;`
    },
    start() {
      this.$forceUpdate();
      window.requestAnimationFrame(this.start);
    }
  },
  created() {
    this.start();
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

#start-button {
  width: 100px;
  position: absolute;
  top: 720px;
  right: 50%;
  z-index: 9;
  background: #40a;
  color: #cff;
  padding: 10px;
  cursor: pointer;
  border-radius: 10px;
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
  min-height: 760px;
  position: relative;
  margin: 90px auto;
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
