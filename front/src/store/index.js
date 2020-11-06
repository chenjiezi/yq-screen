import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    headerHeight: 55,
    mainHeight: 400,
    bottomHeight: 200
  },
  mutations: {
    mainHeight (state, mainHeight) {
      state.mainHeight = mainHeight
    },
    bottomHeight (state, bottomHeight) {
      state.bottomHeight = bottomHeight
    }
  },
  actions: {
  },
  modules: {
  }
})
