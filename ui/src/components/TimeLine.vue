<template>
    <div class="watcher-timeline__canvas" 
        v-bind:class="{ 
            'watcher-timeline__canvas--pending': status === 'pending', 
            'watcher-timeline__canvas--completed': status === 'complete',
            'watcher-timeline__canvas--incompleted': status === 'failed' 
        }"
        v-if="updates.length > 0">
        <div class="watcher-timeline__item" v-for="item in updates"
                :key="item.id">
            <div class="watcher-timeline__item-dialog-wrapper">
                <div class="watcher-timeline__item-dialog">
                    <strong>{{item.event}}</strong> <br/>
                    <small>Created At: {{formatDate(item.created)}}</small>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'TimeLine',
  props: {
      updates: Array,
      status: String
  },
  methods: {
    formatDate: (date) => {
        return moment(date).format('MM-DD-YYYY HH:MM:SS')
    }
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
    background: green;
}

.watcher-timeline__canvas--complete .watcher-timeline__item:first-child.watcher-timeline__item:before {
    background: green;
}

.watcher-timeline__canvas--pending .watcher-timeline__item:first-child.watcher-timeline__item:before {
    background: orange;
}

.watcher-timeline__canvas--fail .watcher-timeline__item:first-child.watcher-timeline__item:before {
    background: red;
}

.watcher-timeline__item-dialog-wrapper {
    width: 50%;
    position: relative;
}

.watcher-timeline__item-dialog:before {
    content: '';
    width: 0; 
    height: 0; 
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
    border-left: 8px solid #DADADA;
    position: absolute;
    right: -8px;
    top: 5px;
}

.watcher-timeline__item:nth-child(even) .watcher-timeline__item-dialog:before {
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent; 
    border-right: 8px solid #DADADA; 
    border-left: 0;
    left: -8px;
    right: auto;
}

.watcher-timeline__item-dialog {
    top: 0;
    right: 0;
    padding: 20px;
    display: inline;
    position: absolute;
    background-color: #DADADA;
    margin-right: 20px;
}

.watcher-timeline__item:nth-child(even) .watcher-timeline__item-dialog {
    left: 0;
    margin-left: 20px;
    right: auto;
}
</style>