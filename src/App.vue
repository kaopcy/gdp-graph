<template>  
  <Suspense>
      <template #default>
        <SearchBar :isSearchBar="isSearchBar" @autoCloseSearchBar="autoCloseSearchBar"/>
      </template>
      <template #fallback>
        <span>I'm a loading screen, I'm waiting the view to be ready!</span>
      </template>
  </Suspense>
  
  <div id="app" :class="isSearchBar? 'right':'normal' ">
    <div class="nav-tab">
      <div class="menu" :class="isSearchBar? 'active':'' " @click="isSearchBar = !isSearchBar" >
        <fa :icon="['fas' , 'bars']" class="menu-icon"/>
        <router-link to="" class="link menu-text"  v-if="!isMobile">{{ isSearchBar? 'CLOSE':'MENU'}}</router-link>
      </div>
      <router-link to="/" class="link project-icon">ASEAN gdp</router-link>
      <router-link to="" class="link about">ABOUT US</router-link>
    </div>
    <div class="black" @click="isSearchBar = !isSearchBar" :style="isSearchBar ? 'opacity:70%;visibility:visible':'opacity:0%;visibility:hidden'"></div>
    <router-view :key="route.path"></router-view>
  </div>
</template>

<script>
import SearchBar from './components/SearchBar.vue'
import { useRoute } from 'vue-router'
import { store } from './store'
import { computed, onMounted , ref } from 'vue'

export default {
  components:{ SearchBar },
  setup() {
    const isMobile = computed(()=> store.state.isMobile )
    const isLoading = computed(()=> store.state.isLoading )

    const isSearchBar = ref(false)
    onMounted( ()=> { 
      window.innerWidth < 670? store.commit('setIsMobile' , true) : store.commit('setIsMobile' , false)
      window.addEventListener( 'resize' , ()=>{
        window.innerWidth < 670? store.commit('setIsMobile' , true) : store.commit('setIsMobile' , false)
      })
      if(isMobile.value) isSearchBar.value = false
    })

    const autoCloseSearchBar = ()=>{
      isSearchBar.value = false
    }
    const route = useRoute()
    return { isMobile , isSearchBar , isLoading , route , autoCloseSearchBar }
  }
} 
</script>


<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Libre+Barcode+39+Text&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700;800&display=swap');
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root{
  --primary--font: 'Inter', sans-serif;
  --danger--color: rgb(248, 61, 61);


  --primary--color: #fff;
  --secondary--color: rgb(92, 247, 200);
  --border--color: #E6EAEA;
  --font--color: #202121;
  --font--color-light: #202121;
}

.dark-theme{
  --primary--color: #1c1c21;
  --secondary--color: #eb548c;
  --secondary--color--dark: #ee3478;
  --border--color: #686868;
  --font--color: #ffffff;
}

body{
  background-color: var(--primary--color);
}
#app{
  font-family: var(--primary--font);
  overflow-x: hidden;
  width: 100vw;
  min-height: 100vh;
  position: relative;
  transition: .5s;
  &.right{
    transform: translateX(300px);
    -webkit-transform: translateX(300px);
    width: 100vw;
  }
  &.normal{
    transform: translateX(0);
    -webkit-transform: translateX(0);
    width: 100vw;
  }
  .black{
    transition: .5s;
    position: fixed;
    background-color: #000;
    top: 0px;
    z-index: 200;
    width: 100%;
    height: 100vh;
    opacity: 50%;
  }
  .nav-tab{
    display: flex;
    font-display: row;
    justify-content: space-between;
    align-items: center;
    height: 90px;
    border-bottom: 2px solid var(--border--color);
    @media (max-width: 670px) {
      height: 70px;
    }
    .link{
      text-decoration: none;
      color: var(--font--color);
    }
    .menu{
      @media (max-width: 670px) {
        height: 70px;
        padding: 1.5rem;
        gap: 9px;
      }
      position: relative;
      background-color: var(--primary--color);
      z-index: 201;
      padding: 2rem;
      height: 90px;
      border-right: 2px solid var(--border--color);
      cursor: pointer;
      overflow: hidden;
      transition: all 0.3s ease-in-out;
      -webkit-transition: 0.3s ease-in-out;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 12px;
      &:hover{
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
      }
      .menu-text{
        color: var(--font--color);
        font-size: 13px;
        transition: .5s background-color;
      }
      .menu-icon{
        color: var(--font--color);
        font-size: 15px;
        transition: .3s ease-in;
      }
    }
    .active{
      background-color: var(--danger--color);
    }
    .project-icon{
      font-family: 'Libre Barcode 39 Text', cursive;
      @media (max-width: 670px) {
        font-size: 40px;
      }
      font-size: 64px;
    }
    .about{
      height: 100%;
      padding: 10px 35px;
      background-color: var(--secondary--color);
      color: #fff;
      line-height: 60px;
      text-align: center;
      font-size: 14px;
      font-weight: 700;
      font-size: 1rem;
      cursor: pointer;
      border: none;
      transition: all 0.3s;
      @media (max-width: 670px) {
        font-size: 0.95rem;
        padding: 0 10px;
        background-color: transparent;
        color: var(--font--color);
      }
      &:hover{
        @media (max-width: 670px) {
          color: var(--font--color);
          box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 16px;
          background-color: transparent;
        }
        background-color: var(--secondary--color--dark);
      }
    }
  }
  .btn{
    position: relative;
    z-index: 2000;
    background-color: #fff;
    margin: 1rem;
    padding: 1rem;
    cursor: pointer;
  }
  
  
}
</style>
