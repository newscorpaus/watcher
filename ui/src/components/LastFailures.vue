<template>
  <div class="watcher-last-failures">
    <div class="watcher-form">
      <input type="text" v-model="userInput" />
      <button class="btn" @click="fetchAll">
          GET UPDATE
      </button>
    </div>
    
    <TimeLine v-bind:updates="getLastArticleUpdates" v-bind:status="getStatus" />

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TimeLine from './TimeLine.vue'

const urlParams = new URLSearchParams(window.location.search)
const capiId = urlParams.get('capiId')

export default {
  name: 'LastFailures',
  components: {
    TimeLine
  },
  data: () => {
    return {
      userInput: capiId
    }
  },
  computed: mapGetters([
        'getLastArticleUpdates',
        'getStatus'
  ]),
  methods: {
    fetchAll() {
      const requestId = this.$data.userInput

      this.$store.dispatch('FETCH_ALL', requestId)
    }
  },
  mounted () {
    if (capiId) {
      this.$store.dispatch('FETCH_ALL', capiId)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.watcher-status--active {
  color: green;
}

.watcher-status__wrapper {
  font-size: 20px;
  font-weight: bold;
  text-align: left;
}

.watcher-form {
  margin-bottom: 20px;
}

.watcher-form input {
  font-size: 20px;
  width: 400px;
}

.watcher-form button {
  font-size: 20px;
  margin-left: 10px;
  font-weight: bold;
}
</style>
