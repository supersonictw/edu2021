<template>
  <div>
    <div v-if="displayOption === 'Sound'">
      <div v-if="!(get('isMidi') === 'true')">
        <div class="button" @click="set('isMidi', 'true')">Use Midi</div>
      </div>
      <div v-else>
        <div class="button" @click="set('isMidi', 'false')">Use Opus</div>
      </div>
    </div>
    <div v-else>
      <div class="button" @click="switchMenu">Sound</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Options",
  data: () => ({
    displayOption: null
  }),
  methods: {
    switchMenu(dom) {
      this.displayOption = dom.target.textContent;
    },
    set(key, value) {
      localStorage.setItem(key, value);
      this.displayOption = null;
    },
    get(key) {
      return localStorage.getItem(key);
    }
  }
}
</script>
