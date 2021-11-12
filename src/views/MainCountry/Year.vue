<template>
    <div class="year">
        <router-link :to="`/main-country/${route.params.id}/graph`" class="link">
            <span class="span1"></span>
            <span class="span2"></span>
        </router-link>
    </div>
</template>

<script>
import { useRoute , useRouter } from 'vue-router'

export default {
    name: 'Year',
    setup() {
        const router = useRouter()
        const route = useRoute()
        console.log(router.options.history);
        return {
            route
        }
    }
}
</script>

<style lang="scss" scoped>
@keyframes fade {
    0%{
        transform: translateX(100%);
        opacity: 0;
    }
    100%{
        transform: translateX(0%);
        opacity: 100%;
    }
}
.year{
    animation: fade .5s;
    position: relative;
    width: 100%;
    height: 100%;
    .link{
        &:nth-child(1){
            left: 0;
            .span1{
                transform: rotate(-45deg) translateY(-150%);
            }
            .span2{
                transform: rotate(45deg) translateY(150%);
            }
        }
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 50%;
        width: 60px;
        transform: translateY(50%);
        top: 0;
        right: 0;
        &:hover{
            background-color: rgba(255, 255, 255, 0.267);
        }
        .span1{
            position: absolute;
            width: 20px;
            height: 5px;
            background-color: #fff;
            transform: rotate(45deg) translateY(-150%);
        }
        .span2{
            position: absolute;
            width: 20px;
            height: 5px;
            position: absolute;
            transform: rotate(-45deg) translateY(150%);
            background-color: #fff;
        }
    }

}
</style>