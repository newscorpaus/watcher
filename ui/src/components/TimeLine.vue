<template>
    <div class="watcher-timeline__canvas" v-if="updates.length > 0">
        <div class="watcher-timeline__item" v-for="item in updates"
                :key="item.id"
                :item="item">
            <div class="watcher-timeline__item-dialog-wrapper">
                <div class="watcher-timeline__item-dialog">
                    <strong>{{item.event}}</strong> <br/>
                    <small>Created At: {{formatDate(item.created)}}</small> <br/>
                    {{getStatus(status, updates)}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
import { getStatus } from '../utils'

export default {
  name: 'TimeLine',
  props: {
      updates: Array,
      status: Boolean
  },
  methods: {
    formatDate: (date) => {
        return moment(date).format('MM-DD-YYYY HH:MM:SS')
    },
    getStatus
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.watcher-timeline__canvas {
    position: relative;
}

.watcher-timeline__canvas:before {
    content: '';
    width: 4px;
    background: #333;
    position: absolute;
    margin-left: -2px;
    top: 0;
    left: 50%;
    height: 100%;
}

.watcher-timeline__item {
    position: relative;
    display: flex;
    width: 100%;
    height: 80px;
}

.watcher-timeline__item:nth-child(even) {
    justify-content: flex-end;
}

.watcher-timeline__item:before {
    content: '';
    border-radius: 50%;
    width: 20px;
    height: 20px;
    position: absolute;
    left: 50%;
    margin-left: -10px;
    top: 0;
    background: red;
}

.watcher-timeline__item-dialog-wrapper {
    width: 50%;
    position: relative;
}

.watcher-timeline__item-dialog {
    top: 0;
    right: 0;
    padding: 20px;
    display: inline;
    position: absolute;
    background-color: #DADADA;
    margin-right: 20px;
    border-radius: 5px;
}

.watcher-timeline__item:nth-child(even) .watcher-timeline__item-dialog {
    left: 0;
    margin-left: 20px;
    right: auto;
}
</style>