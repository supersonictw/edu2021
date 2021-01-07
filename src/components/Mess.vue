<template>
  <div :style="position" class="mess">
    <div :style="advancedStyle" class="side-ammo"></div>
    <div class="master-ammo"></div>
    <div :style="advancedStyle" class="side-ammo"></div>
  </div>
</template>

<script>
export default {
  name: 'Mess',
  props: ["advanced", "uuid"],
  data: () => ({
    top: 0,
    left: 0
  }),
  computed: {
    advancedStyle() {
      if (this.advanced) {
        return "";
      }
      return "visibility:hidden;";
    },
    position() {
      const top = this.top;
      const left = this.left;
      return `top: ${top}px; left: ${left}px;`
    }
  },
  methods: {
    move() {
      this.top -= 35;
      if (this.top > 0) {
        window.requestAnimationFrame(this.move);
      } else {
        this.$store.commit("revokeMess", this.uuid);
      }
    }
  },
  mounted() {
    const initPosition = this.$store.state.positions.messesInit[this.uuid];
    this.top = initPosition.top;
    this.left = initPosition.left;
    this.move();
  }
}
</script>

<style scoped>
.mess {
  position: absolute;
  display: flex;
  width: 50px;
  justify-content: space-between;
}

.master-ammo {
  width: 15px;
  height: 25px;
  content: " ";
  filter: blur(1px);
  background: white;
  border-radius: 50px;
  box-shadow: 0 0 15px rgba(255, 255, 255, .3);
}

.side-ammo {
  width: 10px;
  height: 15px;
  content: " ";
  filter: blur(1px);
  background: white;
  border-radius: 50px;
  box-shadow: 0 0 15px rgba(255, 255, 255, .3);
}
</style>
