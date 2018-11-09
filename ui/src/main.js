import Vue from 'vue'
import App from './App.vue'
import { createStore } from './store'

Vue.config.productionTip = false

const store = createStore()

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')