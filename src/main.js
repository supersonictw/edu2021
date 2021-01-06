// Vue
import Vue from "vue";

// Basic View
import App from "./App.vue";

// Configure Plugin Automatically
import Store from "./data/store.js";

Vue.config.productionTip = false

// Create Vue Application
new Vue({
    render: (h) => h(App),
    store: Store,
}).$mount("#app");
