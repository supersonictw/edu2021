<template>
  <div :style="position" class="enemy">
  </div>
</template>

<script>
export default {
  name: 'Enemy',
  props: ["hashSign"],
  data: () => ({
    top: 0,
    left: 0,
    metadata: null
  }),
  computed: {
    position() {
      return `top: ${this.top}px; left: ${this.left}px;`
    }
  },
  mounted() {
    this.metadata = this.$store.state.positions.enemiesInit[this.hashSign];
    this.top = this.metadata.start.top * this.$store.state.boxHeight;
    this.left = this.metadata.start.left * this.$store.state.boxWidth - 30;
  }
}
</script>

<style scoped>
.enemy {
  position: absolute;
  content: " ";
  background: white;
  width: 30px;
  height: 25px;
  border-radius: 50px;
  box-shadow: 0 0 15px rgba(255, 255, 255, .3);
}
</style>
