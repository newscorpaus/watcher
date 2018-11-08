<template>
  <div id="app">
    <h1>Article Updates</h1>
    <LastFailures/>
  </div>
</template>

<script>
import LastFailures from './components/LastFailures.vue'

export default {
  name: 'app',
  components: {
    LastFailures
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  max-width: 1024px;
  margin-left: auto;
  margin-right: auto;
}

table {
  border: 1px solid #333;
  border-collapse: collapse;
}

table tr td {
  padding: 2px;
}

table tr:nth-child(even) {
  background-color: #DDD;
}

</style>
