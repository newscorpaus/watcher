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
    }
  },
  actions: {
    FETCH_ALL ({commit}, userInput) {

      console.log(userInput)
      
      axios
        .get('./data.json')
          .then(response => {
            commit('setAll', response.data[0])
          })
    }
  }
})