import Vue from 'vue'
import App from './index.vue'
import store from './store'
import router from './router'
import VueRouter from 'vue-router'
// common panel component
import Panel from './components/panel'
import Copy from './components/copy'
import './style.scss'

// use 'buefy/src' when running from git,
import Buefy from 'buefy/src'
// or use 'buefy' when running from npm
// import Buefy from 'buefy'

// add Buefy to Vue
Vue.use(Buefy)

Vue.use(VueRouter)
// load panel component globally
Vue.component('panel', Panel)
// load clipboard copy button component globally
Vue.component('copy', Copy)

new Vue({
  // el: '#app',
  render: h => h(App),
  router,
  store
}).$mount('#app')
