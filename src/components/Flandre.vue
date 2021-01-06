<template>
  <div :style="flandrePosition" class="flandre">
  </div>
</template>

<script>
export default {
  name: 'Flandre',
  methods: {
    async keyListener() {
      const prefix = 10;
      Object.keys(this.$store.state.keyPool).forEach(key => {
        switch (key.toLocaleLowerCase()) {
          case "w":
          case "arrowup":
            this.$store.dispatch(
                "setFlandreTopWithPrefix",
                {direction: true, prefix: prefix}
            );
            break;
          case "s":
          case "arrowdown":
            this.$store.dispatch(
                "setFlandreTopWithPrefix",
                {direction: false, prefix: prefix}
            );
            break;
          case "a":
          case "arrowleft":
            this.$store.dispatch(
                "setFlandreLeftWithPrefix",
                {direction: false, prefix: prefix}
            );
            break;
          case "d":
          case "arrowright":
            this.$store.dispatch(
                "setFlandreLeftWithPrefix",
                {direction: true, prefix: prefix}
            );
            break;
          case " ":
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
    flandrePosition() {
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
  position: absolute;
  content: " ";
  background: white;
  width: 50px;
  height: 50px;
  border-radius: 50px;
}
</style>
