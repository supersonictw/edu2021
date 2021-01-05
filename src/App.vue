<template>
  <div id="app">
    <div @click="start">Start</div>
    <div id="game" ref="game">
      <Map1>
        <Mess v-for="(mess, messIndex) in messes" :key="messIndex"
              :style="returnMessPosition(mess.top, mess.left)"></Mess>
      </Map1>
    </div>
    <div class="footer">&copy; 2020 <a href="https://github.com/supersonictw">SuperSonic</a>.</div>
  </div>
</template>

<script>
import Map1 from "@/components/Map1";
import Mess from './components/Mess.vue'

export default {
  name: 'App',
  components: {
    Map1,
    Mess
  },
  data: () => ({
    current: "",
    currentMess: 0,
    messes: [
      {
        top: 1,
        left: 1
      }
    ]
  }),
  computed: {
    mess() {
      return this.messes[this.currentMess];
    },
    boxWidth() {
      return this.$refs.game.clientWidth - 50;
    },
    boxHeight() {
      return this.$refs.game.clientHeight - 50;
    }
  },
  methods: {
    returnMessPosition(top, left) {
      return `top: ${top}px; left: ${left}px;`
    },
    newMess() {
      this.messes.splice(0, 0, {
        top: 0,
        left: 0
      });
    },
    switchMess() {
      if (this.currentMess >= (this.messes.length - 1)) {
        this.currentMess = 0;
      } else {
        this.currentMess++;
      }
    },
    keyListener() {
      switch (this.current.toLocaleLowerCase()) {
        case "q":
          this.newMess();
          break;
        case "e":
          this.switchMess();
          break;
        case "w":
          this.mess.top -= 50;
          break;
        case "s":
          this.mess.top += 50;
          break;
        case "a":
          this.mess.left -= 50;
          break;
        case "d":
          this.mess.left += 50;
          break;
      }
    },
    fixer() {
      if (this.mess.left > this.boxWidth) {
        this.mess.left = this.boxWidth;
      }
      if (this.mess.left < 0) {
        this.mess.left = 0;
      }
      if (this.mess.top > this.boxHeight) {
        this.mess.top = this.boxHeight;
      }
      if (this.mess.top < 0) {
        this.mess.top = 0;
      }
    },
    start() {
      this.keyListener();
      this.fixer();
      this.current = "";
      setTimeout(this.start, 10);
    }
  },
  created() {
    window.addEventListener("keypress", e => {
      this.current = String.fromCharCode(e.keyCode);
    });
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

#game {
  position: relative;
  margin: 90px auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, .3);
  background: #000;
}

#game:hover {
  cursor: none;
}

h1 {
  margin: 0;
}

.footer {
  margin: 50px auto;
}
</style>
