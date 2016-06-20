<template>
  <div id="app">
    <div class="row">
      <div class="left">
        <notes></notes>
      </div>
      <div class="right">
        <weather :weather="weather"></weather>
      </div>
    </div>
    <div class="row center">
      <welcome :users="users"></welcome>
    </div>
    <div class="row">
    </div>
  </div>
</template>

<script>
  import store from './store'
  import Notes from './components/notes/Index.vue'
  import Weather from './components/Weather.vue'
  import Welcome from './components/Welcome.vue'

  export default {
    components: {
      Notes,
      Weather,
      Welcome
    },
    data () {
      return {
        weather:{},
        users:{}
      }
    },
    created () {
      // assign the event handler `updateListings` to the `data-updated` event
      store.on('data-updated', this.updateListings)
    },
    methods: {
      // received from the store
      updateListings (weather, users) {
        this.weather = weather,
        this.users = users
      }
    }
  }
</script>