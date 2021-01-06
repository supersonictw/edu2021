<template>
  <div class="enemy">
  </div>
</template>

<script>
export default {
  name: 'Enemy',
  props: {data: Object}
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
