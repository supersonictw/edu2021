<template>
  <img :style="position" alt="Flandre" class="flandre" src="@/assets/flandre.png">
</template>

<script>
import Constant from "@/data/const";

export default {
  name: 'Flandre',
  data: () => ({
    touchShoot: false,
    shootDebounce: 0
  }),
  methods: {
    async keyListener() {
      let prefix = Constant.FLANDRE.STEP;
      Object.keys(this.$store.state.keyPool).forEach(key => {
        switch (key) {
          case "Shift":
            prefix = Constant.FLANDRE.SLOW_STEP;
            break;
          case "ArrowUp":
            this.$store.dispatch(
                "setFlandreTopWithPrefix",
                {direction: true, prefix: prefix}
            );
            break;
          case "ArrowDown":
            this.$store.dispatch(
                "setFlandreTopWithPrefix",
                {direction: false, prefix: prefix}
            );
            break;
          case "ArrowLeft":
            this.$store.dispatch(
                "setFlandreLeftWithPrefix",
                {direction: false, prefix: prefix}
            );
            break;
          case "ArrowRight":
            this.$store.dispatch(
                "setFlandreLeftWithPrefix",
                {direction: true, prefix: prefix}
            );
            break;
          case "z":
          case "Z":
            this.shoot();
            break;
        }
      });
      window.requestAnimationFrame(this.keyListener);
    },
    touchShooter() {
      this.shoot();
      if (this.touchShoot) {
        window.requestAnimationFrame(this.touchShooter);
      }
    },
    shoot() {
      if (this.shootDebounce < Constant.MESS_TIME_GAP) {
        this.shootDebounce++;
      } else {
        this.shootDebounce = 0;
        this.$store.dispatch("newMess");
      }
    },
    keyUpEvent(event) {
      event.preventDefault();
      const char = event.key || String.fromCharCode(event.keyCode);
      if (char in this.$store.state.keyPool) {
        this.$store.commit("releaseKey", char);
      }
    },
    keyDownEvent(event) {
      event.preventDefault();
      const char = event.key || String.fromCharCode(event.keyCode);
      if (!(char in this.$store.state.keyPool)) {
        this.$store.commit("pressKey", char);
      }
    },
    touchStartEvent() {
      this.touchShoot = true;
      this.touchShooter();
    },
    touchMoveEvent(event) {
      const fixWidth = Constant.FLANDRE.WIDTH / 2;
      const fixHeight = Constant.FLANDRE.HEIGHT / 2;
      this.$store.commit("setFlandrePosition", {
        top: event.targetTouches[0].clientY - fixHeight,
        left: event.targetTouches[0].clientX - fixWidth
      });
    },
    touchEndEvent() {
      this.touchShoot = false;
    }
  },
  computed: {
    position() {
      const obj = this.$store.state.positions.flandre;
      const top = obj.top;
      const left = obj.left;
      return `top: ${top}px; left: ${left}px;`
    }
  },
  created() {
    window.addEventListener("keyup", this.keyUpEvent);
    window.addEventListener("keydown", this.keyDownEvent);
    window.addEventListener("touchstart", this.touchStartEvent);
    window.addEventListener("touchmove", this.touchMoveEvent);
    window.addEventListener("touchend", this.touchEndEvent);
    this.keyListener();
  },
  destroyed() {
    window.removeEventListener("keyup", this.keyUpEvent);
    window.removeEventListener("keydown", this.keyDownEvent);
    window.removeEventListener("touchstart", this.touchStartEvent);
    window.removeEventListener("touchmove", this.touchMoveEvent);
    window.removeEventListener("touchend", this.touchEndEvent);
    this.$store.commit("clearAllKeys");
    this.touchShoot = false;
  }
}
</script>

<style scoped>
.flandre {
  width: 150px;
  height: 150px;
  position: absolute;
  z-index: 7;
}
</style>
