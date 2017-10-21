// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
import axios from 'axios'
Vue.prototype.$ajax = axios

import { store } from './store/store'
import Api from './api/Api'

Vue.prototype.$Api = Api

Vue.config.productionTip = true

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store: store,
  template: '<App/>',
  components: {App},
  methods: {
    link () {
      alert(11)
    }
  }
})
