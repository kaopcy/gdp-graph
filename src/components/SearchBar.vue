<template>
    <div class="nav" :class="isSearchBar? 'normal':'left'">
        <router-link to="/" class="head" @click="onClick()">
            ASEAN GDP
        </router-link>
        <div class="search">
            <input type="text" placeholder="Searching..." v-model="search">
            <fa :icon="['fas' , 'search']" class="icon search"/>
        </div>
        <div class="line"></div>
        <div class="link-wrapper">
            <router-link :to="`/main-country/${item[0]}`" class="link" v-for="item in country" :key="item" @click="onClick">
                <img :src="item[1]" alt="">
                <div class="router-link" active-class="active" >{{item[0]}}</div>
            </router-link>
        </div>
        
    </div>
</template>

<script>
import useFetch from '../composables/use-fetch'

import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { store } from '../store'
export default {
    props: [ 'isSearchBar' ],
    setup(_ , context) {
        const { getAllCountryNameFlag } = useFetch()
        const country = ref([])
        const search = ref('')
        watch(search , ()=>{
            country.value = getAllCountryNameFlag(search.value)
        } )

        country.value = getAllCountryNameFlag(search.value)

        const onClick = ()=>{
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

    .head{
        padding-top: 1rem;
        color: #404244;
        font-family: "Libre Barcode 39 Text", cursive;
        font-size: 48px;
        text-decoration: none;
    }

    .search{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        position: relative;
        box-shadow: 0 8px 8px -10px rgb(0 0 0 / 15%);
        width: 100%;

        .icon{
            position: absolute;
            color: var(--font--color);
            color: #404144;
            left: 38px;
            width: 15px;
            height: 15px;
            
        }
        input{
            &:focus{
                outline: 2px solid rgb(89, 175, 255) !important; 
                background-color: #fff;
            }
            &:hover{
                background-color: #fff;
                outline: 2px solid var(--border--color);
            }
            border-radius: 7px;
            margin: 20px 0;
            position: relative;
            font-size: 1rem;
            padding: .8rem 1rem;
            padding-left: 2.3rem;
            outline: none;
            border: none;
            background-color: #f4f4f4;
            transition: .5s background-color;

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
        width: 100%;
        
    }
    .link-wrapper{
        overflow-y: scroll;
        width: 100%;
        
        
        .link{
            text-decoration: none;
            display: flex;
            flex-direction: row;
            cursor: pointer;
            position: relative;
            margin: 2rem 3rem;
            transition: .3s ;
            color: #404246;
            align-items: center;
            position: relative;
            font-weight: 700;
            &::after{
                content: '';
                position: absolute;
                width: 8px;
                height:8px;
                background-color: #cfcfd0;
                border-radius: 50%;
                transform: translateX(-20px);
            }

            &:hover{
                .router-link{
                    color: #4d91da;
                }
            }


            img{
                transition: .3s;
                box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
                height: 30px;
                width: 50px;
                margin-right: 10px;
            }
            .router-link{
                font-size: 1.2rem;
                transition: .3s;
                color: var(--font--color);
                text-decoration: none;
            }
            // &:hover , &:active{
            //     padding-bottom: 30px;
            //     border: 1px solid var(--border--color);
            //     &::after{
            //         font-size: .7rem;
            //         position: absolute;
            //         right: 0;
            //         bottom: 0;
            //         content: 'loadmore->';
            //         color: var(--font--color);
            //         animation: move-in .5s;
            //     }
            //     @keyframes move-in {
            //         0%{ 
            //             transform: scaleY(0%);
            //         }
            //         100%{ 
            //             transform: scaleY(100%);
            //         }
            //     }
            // }
        }

        .router-link-active{
            &::after{
                content: '';
                position: absolute;
                width: 8px;
                height:8px;
                background-color: #4d91da;
                border-radius: 50%;
                transform: translateX(-20px);
            }
            .router-link{
                color: #4d91da;
            }
        }

    }
    
}

</style>