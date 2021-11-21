<template>
    <div class="main-country">
        <img :src="require(`../../../public/picture/${route.params.id}.png`)" alt="">
    <router-view></router-view>
    </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { useRoute } from 'vue-router'
import { onMounted } from '@vue/runtime-core'
import useCountry from '../../composables/useCountry'

export default {
    name: 'MainCountry',
    setup() {
        const route = useRoute()
        const { setCurrentCountry } = useCountry()

        const isBottomBar = ref(false)
        
        onMounted(() => {
            setCurrentCountry(route.params.id)
            console.log( route.params.id );
        })

        return {
            route,
            isBottomBar
        }
    }
}
</script>

<style lang="scss" scoped>
.main-country{
    height: 100vh;
    width: 100%;
    position: relative;
    z-index: 3;
    overflow: hidden;
    img{
        position: absolute;
        // filter: blur(1px);
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: 50% 50%;
    }
}
</style>
