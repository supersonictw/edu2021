<template>
  <div class="mess">
    <div :style="advancedStyle" class="side-ammo"></div>
    <div class="master-ammo"></div>
    <div :style="advancedStyle" class="side-ammo"></div>
  </div>
</template>

<script>
export default {
  name: 'Mess',
  props: ["advanced"],
  computed: {
    advancedStyle() {
      if (this.advanced) {
        return "";
      }
      return "visibility:hidden;";
    }
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
