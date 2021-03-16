import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueMeta from 'vue-meta';
import router from './router'

Vue.use(VueMeta);
Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
