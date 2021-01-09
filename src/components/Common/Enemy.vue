<template>
  <div :style="position" class="enemy">
  </div>
</template>

<script>
import Constant from "@/data/const";

export default {
  name: 'Enemy',
  props: ["hashSign"],
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
      this.setPosition(...this.mover(this.progress));
      if (this.progress < 1) {
        window.requestAnimationFrame(this.move);
      } else {
        this.$store.commit("unregisterEnemy", this.hashSign);
      }
      this.progress += 0.01;
    },
    setPosition(top, left) {
      this.top = top * this.$store.state.boxHeight;
      this.left = left * this.$store.state.boxWidth - 30;
    },
    async ping() {
      const messList = this.$store.state.positions.messes;
      const top = this.top;
      const left = this.left;
      this.checkAlive(messList, top, left);
      window.requestAnimationFrame(this.ping);
    },
    checkAlive(messList, top, left) {
      const stmt = (mess) => mess.top < top && (mess.left + Constant.aimPrefix >= left && mess.left <= left + 30);
      const seal = Object.values(messList).findIndex(stmt);
      if (seal > -1) {
        this.progress = 1;
        const messUUID = Object.keys(messList)[seal];
        this.$store.commit("revokeMess", messUUID);
      }
    },
  },
  mounted() {
    this.mover = this.$store.state.positions.enemiesInit[this.hashSign].router;
    this.move();
    this.ping();
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
