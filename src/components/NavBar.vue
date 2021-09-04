<template>
    <div class="nav" :class="isNavBar? 'normal':'left'">
        <input type="text" placeholder="Searching..." v-model="search">
        <div class="line"></div>
        <div class="link-wrapper">
            <div class="link" v-for="item in country" :key="item">
                <router-link :to="`/country/${item}`" class="router-link" active-class="active" >{{item}}</router-link>
            </div>
        </div>
        
    </div>
</template>

<script>
import useFetch from '../composables/use-fetch'
import { ref, watch } from 'vue'
import { useRouter , useRoute } from 'vue-router'
export default {
    props: [ 'isNavBar' ],
    async setup() {
        const { getAllGDP , getAllCountryName } = useFetch()

        const country = ref([])
        const search = ref('')
        watch(search , ()=>{
            country.value = getAllCountryName(search.value)
        } )

        await getAllGDP() //using fetch for getting all data to GDP 
        country.value = getAllCountryName(search.value)

        const router = useRouter()
        const onClick = (id)=>{
            router.replace( { path:`/country/${id}` } )
        }

        const route = useRoute()

        return { country , search , route ,  onClick}
    }
} 
</script>

<style lang="scss" scoped>
.nav{
    transition: .5s;
    &.normal{
        transform: translateX(0);
    }
    &.left{
        transform: translateX(-300px);
    }
    display: flex;
    width: 300px;
    margin: 0;
    height: 100vh;
    background-color: rgb(255, 255, 255);
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
    input{
        margin: 20px;
        position: relative;
        font-size: 1rem;
        padding: .5rem 2rem .5rem 1rem;
        outline: none;
        border: 2px solid hsl(0,0%,90%);
        border-radius: 9999px;
        &::before{
            content: 'X';
        }
    }
    .line{
        width: 80%;
        border-bottom: 2px solid hsl(0,0%,90%);;
    }
    .link-wrapper{
        overflow-y: scroll;
        width: 100%;
        .link{
            cursor: pointer;
            position: relative;
            margin: 10px 2rem;
            transition: .5s ;
            .router-link{
                color: #000;
                text-decoration: none;
            }
            &:hover , &:active{
                padding-bottom: 30px;
                border: 1px solid hsl(0,0%,90%);
                &::after{
                    font-size: .7rem;
                    position: absolute;
                    right: 0;
                    bottom: 0;
                    content: 'loadmore->';
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