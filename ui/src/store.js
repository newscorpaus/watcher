import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    receivedData: {}
  },
  mutations: {
    setAll (state, data) {
      state.receivedData = data
      Vue.set(state.receivedData)
    }
  },
  getters: {
    getLastArticleUpdates (state) {
      const eventsList = state.receivedData.events || []

      return eventsList
    },
    getStatus (state) {
      return state.receivedData.status
    }
  },
  actions: {
    FETCH_ALL ({commit}, userInput) {
      const dataJson = './article-updates/' + userInput
      
      axios
        .get(dataJson)
          .then(response => {
            commit('setAll', response.data)
          })
    }
  }
})
