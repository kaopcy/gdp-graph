<template>
    <div class="nav" :class="isSearchBar? 'normal':'left'">
        <div class="search">
            <fa :icon="['fas' , 'search']" class="icon search"/>
            <input type="text" placeholder="Searching..." v-model="search">
        </div>
        <div id="mode" @click="changeTheme">light</div>
        <div class="line"></div>
        <div class="link-wrapper">
            <div class="link" v-for="item in country" :key="item" @click="onClick">
                <img :src="item[1]" alt="">
                <router-link :to="`/country/${item[0]}`" class="router-link" active-class="active" >{{item[0]}}</router-link>
            </div>
        </div>
        
    </div>
</template>

<script>
import useFetch from '../composables/use-fetch'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { store } from '../store'
// import { store } from '../store'
export default {
    props: [ 'isSearchBar' ],
    async setup(_ , context) {
        const { getAllGDP , getAllCountryNameFlag } = useFetch()

        const country = ref([])
        const search = ref('')
        watch(search , ()=>{
            country.value = getAllCountryNameFlag(search.value)
        } )

        await getAllGDP() //using fetch for getting all data to GDP 
        country.value = getAllCountryNameFlag(search.value)

        const onClick = ()=>{
            // if(store.state.isMobile)
            context.emit('autoCloseSearchBar')
            search.value = ''
        }
        const changeTheme = ()=>{
            document.body.classList.toggle("dark-theme")
            store.commit('toggleIsDarkMode')
            context.emit('autoCloseSearchBar')
        }

        const route = useRoute()
        

        return { country , search , route , changeTheme , onClick}
    }
} 
</script>

<style lang="scss" scoped>

.nav{
    transition: all 0.5s;
    -webkit-transition: -webkit-transform 0.5s;
    &.normal{
        transform: translateX(0);
        -webkit-transform: translateX(0);
        
    }
    &.left{
        transform: translateX(-300px);
        -webkit-transform: translateX(-300px);
    }
    display: flex;
    width: 300px;
    margin: 0;
    height: 100vh;
    background-color: var(--primary--color);
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
    .search{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        .icon{
            color: var(--font--color);
            margin-right: 10px;
        }
        input{
            &:focus{
                box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
            }
            margin: 20px 0;
            position: relative;
            font-size: 1rem;
            padding: .5rem 2rem .5rem 1rem;
            outline: none;
            border: 2px solid var(--border--color);
            border-radius: 9999px;
        }
    }

    #mode{
        align-self: flex-start;
        margin-left: 1rem;
        margin-bottom: 1rem;
        padding: .5rem 1rem;
        background-color: #fff;
        cursor: pointer;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
    }

    .line{
        width: 80%;
        border-bottom: 2px solid var(--border--color);
    }
    .link-wrapper{
        overflow-y: scroll;
        width: 100%;
        .link{
            display: flex;
            flex-direction: row;
            cursor: pointer;
            position: relative;
            margin: 2rem 2rem;
            transition: .5s ;
            &:hover{
                img{
                    height: 60px;
                    width: 80px;
                }
                .router-link{
                    padding-top: 10px;
                }
            }
            img{
                transition: .3s;
                box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
                height: 30px;
                width: 40px;
                margin-right: 10px;
            }
            .router-link{
                font-size: 1.2rem;
                transition: .3s;
                color: var(--font--color);
                text-decoration: none;
            }
            &:hover , &:active{
                padding-bottom: 30px;
                border: 1px solid var(--border--color);
                &::after{
                    font-size: .7rem;
                    position: absolute;
                    right: 0;
                    bottom: 0;
                    content: 'loadmore->';
                    color: var(--font--color);
                    animation: move-in .5s;
                }
                @keyframes move-in {
                    0%{ 
                        transform: scaleY(0%);
                    }
                    100%{ 
                        transform: scaleY(100%);
                    }
                }
            }
        }
    }
    
}

</style>