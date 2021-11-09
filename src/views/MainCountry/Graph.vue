<template>
    <div class="graph">


        <router-link :to="`/main-country/${route.params.id}/data`" class="link">
            <span class="span1"></span>
            <span class="span2"></span>
        </router-link>
        <router-link :to="`/main-country/${route.params.id}/year`" class="link">
            <span class="span1"></span>
            <span class="span2"></span>
        </router-link>

        <div class="graph-wrapper">
            <LinearRegressionChart  :countryName="route.params.id"/>
        </div>
    </div>
</template>

<script>
import { useRoute } from 'vue-router'
// import  LinearRegressionChart from '../../components/chart.vue'
import  LinearRegressionChart from '../../components/LinearRegressionChart'

export default {
    name: 'Data',
    components:{
        LinearRegressionChart,
    },
    setup() {
        const route = useRoute()

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
    }
    100%{
        transform: translateX(0%);
    }
}
.graph{
    animation: fade .5s;
    position: relative;
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

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

    .graph-wrapper{
        width: 80%;
        border-radius: 5px;
        background-color: rgba(255, 255, 255, 0.911);
        padding: 2rem;
    }

}
</style>