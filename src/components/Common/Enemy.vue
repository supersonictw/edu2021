<template>
  <div :style="position" class="enemy">
  </div>
</template>

<script>
import Constant from "@/data/const";

export default {
  name: 'Enemy',
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
        const computedPosition = this.initData.router(this.progress);
        this.setPosition(...computedPosition);
        this.chaosHandler(this.progress, ...computedPosition);
        this.progress += 0.01;
        window.requestAnimationFrame(this.move);
      } else {
        this.$store.commit("unregisterEnemy", this.hashSign);
      }
    },
    setPosition(top, left) {
      this.top = top * this.$store.state.boxHeight;
      this.left = left * this.$store.state.boxWidth - 30;
    },
    chaosHandler(progress, top, left) {
      const status = Number(progress).toFixed(2).toString();
      if (status in this.initData.chaos) {
        this.initData.chaos[status].forEach(
            (router, index) =>
                this.$store.dispatch("newChaos", {
                  operator: `${this.hashSign}_${index}`,
                  info: [top, left],
                  router
                })
        );
      }
    },
    async ping() {
      const messList = this.$store.state.positions.messes;
      this.checkAlive(messList, this.top, this.left);
      if (this.progress > -1 && this.progress < 1) {
        window.requestAnimationFrame(this.ping);
      }
    },
    checkAlive(messList, top, left) {
      const stmt = (mess) =>
          mess.top < top &&
          (mess.left <= left + 30 && mess.left + Constant.AIM_PREFIX >= left);
      const seal = Object.values(messList).findIndex(stmt);
      if (seal > -1) {
        this.progress = -1;
        this.$store.commit("addScores", 1);
        const messUUID = Object.keys(messList)[seal];
        this.$store.commit("revokeMess", messUUID);
      }
    },
  },
  mounted() {
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
