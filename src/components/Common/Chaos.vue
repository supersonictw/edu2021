<template>
  <div :style="position" class="chaos">
  </div>
</template>

<script>
import Constant from "@/data/const";

export default {
  name: "Chaos",
  props: ["hashSign", "initData"],
  data: () => ({
    top: 0,
    left: 0,
    progress: 0,
    mover: null
  }),
  computed: {
    position() {
      return `top: ${this.top}px; left: ${this.left}px;`
    }
  },
  methods: {
    async move() {
      if (this.progress > -1 && this.progress < 1) {
        const computedPosition = this.initData.router(this.initData.info, this.progress);
        this.setPosition(...computedPosition);
        this.progress += 0.01;
        window.requestAnimationFrame(this.move);
      } else {
        this.$store.commit("revokeChaos", this.hashSign);
      }
    },
    setPosition(top, left) {
      this.top = top * this.$store.state.boxHeight;
      this.left = left * this.$store.state.boxWidth - 30;
    },
    async pingFlandre() {
      if (this.progress > -1 && this.progress < 1) {
        const flandre = this.$store.state.positions.flandre;
        const stmt = () =>
            (flandre.top + Constant.FLANDRE.HEIGHT >= this.top && flandre.top <= this.top) &&
            (flandre.left + Constant.FLANDRE.WIDTH >= this.left && flandre.left <= this.left);
        if (stmt()) {
          this.$store.commit("lostHeart");
        }
        window.requestAnimationFrame(this.pingFlandre);
      } else {
        this.$store.commit("revokeChaos", this.hashSign);
      }
    }
  },
  mounted() {
    this.pingFlandre();
    this.move();
  }
}
</script>

<style scoped>
.chaos {
  position: absolute;
  content: " ";
  background: pink;
  width: 30px;
  height: 25px;
  border-radius: 50px;
  box-shadow: 0 0 15px rgba(255, 255, 255, .3);
}
</style>
