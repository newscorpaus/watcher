<template>
  <div class="watcher-last-failures">
    <div class="watcher-form">
      <input type="text" v-model="userInput" />
      <button class="btn" @click="fetchAll">
          GET UPDATE
      </button>
    </div>
    <table border="1" v-if="getLastArticleUpdates.length > 0">
          <thead>
              <tr>
                  <th>capi_id</th>
                  <th>Event</th>
                  <th>workflow</th>
                  <th>Received</th>
                  <th>Created</th>
              </tr>
          </thead>
          <tbody>
              <tr class="item-list"
                  v-for="item in getLastArticleUpdates"
                      :key="item.id"
                      :item="item">
                  <td>{{ item.capi_id }}</td>
                  <td>{{ item.event }}</td>
                  <td>{{ item.workflow }}</td>
                  <td>{{ item.received }}</td>
                  <td>{{ item.created }}</td>
              </tr>
          </tbody>
      </table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'LastFailures',
  data: () => {
    return {
      userInput: ''
    }
  },
  computed: mapGetters([
        'getLastArticleUpdates'
  ]),
  // methods: mapActions([
  //     'FETCH_ALL'
  // ])
  methods: {
    fetchAll() {
      const userInput = this.$data.userInput
      this.$store.dispatch('FETCH_ALL', userInput)
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
</style>
