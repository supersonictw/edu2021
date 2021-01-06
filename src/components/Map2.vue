<template>
  <div id="map2">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Map2",
  props: [
    "maxWidth",
    "maxHeight"
  ],
  data: () => ({
      bonus: [...Array(4)]
  }),
  methods: {
    generateBonus() {
      this.bonus = this.bonus.map(() => ({
        top: Math.random() * 10,
        left: Math.random() * 10
      }));
    },
    mapBonus() {
      return ``
    }
  },
  created() {
    this.generateBonus();
  }
}
</script>

<style scoped>
#map2 {
}
</style>
