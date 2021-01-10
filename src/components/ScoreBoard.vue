<template>
  <div class="score-board">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "ScoreBoard"
}
</script>

<style scoped>
.score-board {
  position: absolute;
  right: 30px;
  bottom: 50px;
  width: 200px;
  max-height: 150px;
  padding: 10px;
  background: #000;
  border: 1px #70f solid;
  z-index: 2;
  opacity: 0.7;
}
</style>
