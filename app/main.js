import Vue from 'vue'
import App from './App.vue'
import bus from './bus.js'

Vue.prototype.$bus = bus

new Vue({
  el: 'div',
  components: { App }
})
