<template>
  <img :style="position" alt="Flandre" class="flandre" src="@/assets/flandre.png">
</template>

<script>
import Constant from "@/data/const";

export default {
  name: 'Flandre',
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
            this.$store.dispatch("newMess");
            break;
        }
      });
    },
    start() {
      this.keyListener();
      window.requestAnimationFrame(this.start);
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
    window.addEventListener("keyup", e => {
      e.preventDefault();
      const char = e.key || String.fromCharCode(e.keyCode);
      if (char in this.$store.state.keyPool) {
        this.$store.commit("releaseKey", char);
      }
    });
    window.addEventListener("keydown", e => {
      e.preventDefault();
      const char = e.key || String.fromCharCode(e.keyCode);
      if (!(char in this.$store.state.keyPool)) {
        this.$store.commit("pressKey", char);
      }
    });
    this.start();
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
