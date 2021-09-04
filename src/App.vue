<template>  
  <!-- <Echarts/> -->
  <Loading v-if="isLoading"/>
  <Suspense>
      <template #default>
        <NavBar :isNavBar="isNavBar"/>
      </template>
      <template #fallback>
        <span>I'm a loading screen, I'm waiting the view to be ready!</span>
      </template>
  </Suspense>
  
  <div id="app" :class="isNavBar? 'right':'normal' ">
    <button @click="isNavBar = !isNavBar">{{ isNavBar? 'CLOSE':'OPEN'}}</button>
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import Loading from './components/loading.vue'
import { store } from './store'
import { computed, onMounted , ref } from 'vue'

export default {
  components:{ NavBar , Loading },
  setup() {
    const isMobile = computed(()=> store.state.isMobile )
    const isLoading = computed(()=> store.state.isLoading )

    const isNavBar = ref(true)
    onMounted( ()=> { 
      window.innerWidth < 670? store.commit('setIsMobile' , true) : store.commit('setIsMobile' , false)
      window.addEventListener( 'resize' , ()=>{
        window.innerWidth < 670? store.commit('setIsMobile' , true) : store.commit('setIsMobile' , false)
      })
      if(isMobile.value) isNavBar.value = false


    })
    return {  isMobile , isNavBar , isLoading}
  }
} 
</script>


<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap');
*{
  font-family: 'Roboto Mono', monospace;
}
#app{
  transition: .5s;
  &.right{
    transform: translateX(300px);
    width: calc(100vw - 300px);
  }
  &.normal{
    width: 100vw;
    transform: translateX(0);
  }
  .btn{
  margin: 1rem;
  font-size: 2rem;
  padding: 1rem;
  border-radius: 20px;
  cursor: pointer;
}
}
</style>
