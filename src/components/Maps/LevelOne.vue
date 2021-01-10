<template>
  <div class="wrap">
    <div class="wave left"></div>
    <slot></slot>
    <div class="wave right"></div>
  </div>
</template>

<script>
export default {
  name: "Level 1"
}
</script>

<style scoped>
.wrap {
  overflow: hidden;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  height: 100%;
}

.wave {
  position: absolute;
  top: 0;
  width: 100%;
  height: 4682px;
  background-repeat: repeat-y;
}

.left {
  background-image: url("../../assets/background/left.png");
  animation: wave-left 3s linear infinite;
  background-position: left bottom;
  transform-origin: left bottom;
}

.right {
  background-image: url("../../assets/background/right.png");
  animation: wave-right 3s linear infinite;
  background-position: right bottom;
  transform-origin: right bottom;
}

@keyframes wave-left {
  from {
    transform: translateY(-50%)
  }
  to {
    transform: translateY(-10%)
  }
}

@keyframes wave-right {
  from {
    transform: translateY(-70%)
  }
  to {
    transform: translateY(-30%)
  }
}
</style>
