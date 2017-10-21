import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const moduleA = {
  state: {
    counter: 10,
    msg: 10
  },
  mutations: {
    increment (state, num) {
      state.counter += num
    },
    cheng (state,num) {
      state.msg *= num
    }
  },
  actions: {},
  getters: {}
}

const moduleB = {
  state: {
    counter: 10
  },
  mutations: {},
  actions: {},
  getters: {}
}

export const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})
