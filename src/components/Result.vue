<template>
  <div class="result">
    <h2>Score: {{ displayScore }}</h2>
    <p>The development is not finished, for demo only.</p>
  </div>
</template>

<script>
export default {
  name: "Result",
  data: () => ({
    displayScore: 0
  }),
  computed: {
    score() {
      return this.$store.state.scores[this.$store.state.currentLevel];
    }
  },
  methods: {
    scoreAnimation() {
      if (this.displayScore === this.score) return;
      this.displayScore++;
      setTimeout(this.scoreAnimation, 50);
    }
  },
  created() {
    this.scoreAnimation();
  }
}
</script>

<style scoped>
.result {
  width: 50%;
  max-height: 500px;
  padding: 30px;
  margin: 200px auto;
  border: 10px #40a solid;
  border-radius: 10px;
}
</style>
