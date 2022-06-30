<template>
  <nav class="pb-3 ps-3">
    <div class="row align-items-center justify-content-between">
      <div class="col">
        <img class="ps-4" src="logo.png" alt="">
      </div>
      
      <div class="col">
        <div class="input-group mb-3 px-3 py-3 w-50 ms-auto">
          <input v-model="currentSearch" type="text" class="form-control" @keyup.enter="onSearchData">
          <button @click="onSearchData" class="btn btn-outline-secondary" type="button">Search</button>
        </div>
      </div>
    </div>
    <TabFilter></TabFilter>
  </nav>
</template>

<script>
import {searchData} from '../store';
import TabFilter from './TabFilter.vue';

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
    
  },

  components: {
    TabFilter
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  nav {
    position: sticky;
    background-color: black;
    top: 0;
    opacity: 1;
    z-index: 30;
  }

  img {
    width: 130px
  }

</style>
