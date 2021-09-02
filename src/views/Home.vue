<template>
  <div class="home">
    <button  v-for="{id ,CountryName } in gdp" :key="id">
      <router-link :to="`/country/${id}`">{{CountryName}}</router-link>
    </button>
  </div>
</template>

<script>
import { loadGDP } from '../firebase'
export default {
  setup(){
    const { gdp } = loadGDP()
    return { gdp }
  }
}

</script>

<style lang="scss" scoped>
  .home{
    font-family: 'Roboto Mono', monospace;
  }
</style>