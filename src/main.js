// Vue
import Vue from "vue";

// Basic View
import App from "./App.vue";

// Configure Plugin Automatically
import Store from "./data/store.js";

// The snippet is only used for analyzing the visitor with Google Analytics
import VueGtag from "vue-gtag";

Vue.use(VueGtag, {config: {id: "G-FDNELQW7T0"}});

// Vue Settings
Vue.config.productionTip = false

// Create Vue Application
new Vue({
    render: (h) => h(App),
    store: Store,
}).$mount("#app");
