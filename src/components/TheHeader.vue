<template>
  <div class="row align-items-center justify-content-between">
    <div class="col">
      <h2 class="text-danger ps-2">BOOLFLIX</h2>
    </div>
    <div class="col">
      <div class="input-group mb-3 px-3 py-3 w-50 ms-auto">
        <input v-model="currentSearch" type="text" class="form-control" @keyup.enter="onSearchData">
        <button @click="onSearchData" class="btn btn-outline-secondary" type="button">Search</button>
      </div>
    </div>
  </div>
</template>

<script>
import {searchData} from '../store';

export default {
  name: 'TheHeader',
  data(){
    return {
      currentSearch: ''
    }
  },

  methods: {
    onSearchData(){
      searchData(this.currentSearch, 'movie')
      searchData(this.currentSearch, 'tv')
    }
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">



</style>
