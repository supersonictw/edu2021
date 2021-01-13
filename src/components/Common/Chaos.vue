<template>
  <div :style="position" class="chaos">
  </div>
</template>

<script>
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
        this.setPosition(...this.initData.router(this.progress));
        this.progress += 0.01;
        window.requestAnimationFrame(this.move);
      } else {
        this.$store.commit("unregisterChaos", this.hashSign);
      }
    },
    setPosition(top, left) {
      this.top = top * this.$store.state.boxHeight;
      this.left = left * this.$store.state.boxWidth - 30;
    }
  },
  mounted() {
    this.move();
  }
}
</script>

<style scoped>

</style>
