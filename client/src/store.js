import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ImgPath: '',
  },
  mutations: {
    SET_IMGPATH: (state, name) => {
      state.ImgPath = name
    },
  },
  actions: {

  }
})
