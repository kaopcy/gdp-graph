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
        <div class="left-wrapper">
            <SidePost/>
        </div>
        <div class="right-wrapper">
            <h1>
                Linear Regression
            </h1>
            <div class="graph-wrapper">
                <LinearRegressionChart  :countryName="route.params.id" :compareCountry="compareCountry" />
            </div>
            <h1>
                Data Table 
            </h1>
            <div class="table-data">
                <div class="table">
                    <div class="head">
                        <span>{{route.params.id}}</span>
                        <span class="color"  :style="`background-color:${'#ff6384'};`"></span>
                    </div>
                    <div class="body">
                        <div class="column">
                            <span>Years</span>
                            <span v-for="i in store.state.currentCountry.years" :key="i">
                                {{i}} 
                            </span>
                        </div>
                        <div class="column">
                            <span>Real Price</span>
                            <span v-for="i in store.state.currentCountry.realPrice" :key="i">
                                {{numberWithCommas(i)}} 
                            </span>
                        </div>
                        <div class="column">
                            <span>Predicted Price</span>
                            <span v-for="(i) in store.state.currentCountry.predictedPrice" :key="i">
                                {{numberWithCommas(i)}} 
                            </span>
                        </div>
                        <div class="column">
                            <span>Error</span>
                            <span v-for="(i,index) in store.state.currentCountry.realPrice" :key="i" 
                                :style="i - store.state.currentCountry.predictedPrice[index] > 0 ?'color:green' : 'color:red'"
                            >
                                {{i - store.state.currentCountry.predictedPrice[index] > 0 ? '+' : ''}}
                                {{numberWithCommas(i - store.state.currentCountry.predictedPrice[index])}} 
                            </span>
                        </div>
                    </div>
                </div>
                <div class="table" v-if="store.state.compareCountry.predictedPrice.length > 0">
                    <div class="head">
                        <span>{{compareCountry}}</span>
                        <span class="color" :style="`background-color:${'#52c2c2'};`"></span>
                    </div>
                    <div class="body">
                        <div class="column">
                            <span>Years</span>
                            <span v-for="i in store.state.currentCountry.years" :key="i">
                                {{i}} 
                            </span>
                        </div>
                        <div class="column">
                            <span>Real Price</span>
                            <span v-for="i in store.state.compareCountry.realPrice" :key="i">
                                {{numberWithCommas(i)}} 
                            </span>
                        </div>
                        <div class="column">
                            <span>Predicted Price</span>
                            <span v-for="(i) in store.state.compareCountry.predictedPrice" :key="i">
                                {{numberWithCommas(i)}} 
                            </span>
                        </div>
                        <div class="column">
                            <span>Error</span>
                            <span v-for="(i,index) in store.state.compareCountry.realPrice" :key="i"
                                :style="i - store.state.compareCountry.predictedPrice[index] > 0 ?'color:green' : 'color:red'"
                            >
                                {{i - store.state.compareCountry.predictedPrice[index] > 0 ? '+' : ''}}
                                {{numberWithCommas(i - store.state.compareCountry.predictedPrice[index])}} 
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { store } from '../../store'
import LinearRegressionChart from '../../components/LinearRegressionChart'
import SidePost from '../../components/MainPost/SidePost.vue'
import useCompareCountry from '../../composables/useCountry' 

export default {
    name: 'Data',
    components:{
        LinearRegressionChart,
        SidePost,
    },
    setup() {
        const { compareCountry } = useCompareCountry()

        const route = useRoute()

        const numberWithCommas = (x)=> {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

        return {
            route,
            compareCountry,
            numberWithCommas,
            store
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

$font-color: #404244;


h1{
    color: $font-color;
    padding: 2rem 0rem;
    font-weight: 700;
    font-size: 2.2rem;
    width: 80%;
    border-bottom: 1px dashed rgb(207, 207, 207);
    position: relative;
    cursor: pointer;
    &:hover{
        &::after{
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            content: '#';
            color: rgb(101, 173, 255);
            position: absolute;
            top: 0;
            left: -40px;
        }
    }
}

.graph{
    animation: fade .5s;
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    margin-top: 2rem;
    padding: 0 4rem;
    @media (max-width: 700px) {
        flex-direction: column;
    }
    .left-wrapper{
        position: relative;
        height: 630px;
        flex: 2;
        background-color: rgb(255, 255, 255);
        display: flex;
        padding-left: 2rem;
    }

    .right-wrapper{
        position: relative;
        height: 630px;
        flex: 5;
        background-color: rgb(255, 255, 255);
        padding: 1rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow-x: hidden;
        overflow-y: scroll;
        .table-data{
            color: $font-color;
            margin-top: 2rem;
            width: 100%;
            display: flex;
            justify-content: space-evenly;
            .table{
                box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
                display: flex;
                flex-direction: column;
                margin-bottom: 5rem;
                background-color: rgba(255, 255, 255, 0.836);
                .head{
                    display: flex;
                    justify-content: center;
                    padding: .8rem 0;
                    background-color: #f3f5f7;
                    border-left: 10px solid #42b983;
                    font-weight: 700;
                    display: flex;
                    align-items: center;
                    .color{
                        transform: translateY(1px);
                        width: 10px;
                        height: 10px;
                        margin-left: 1rem;
                    }
                }
                .body{
                    display: flex;
                    flex-direction: row;
                }
                .column{
                    border-left: 2px solid rgb(241, 241, 241);
                    display: flex;
                    flex-direction: column;
                    font-size: .76rem;
                    span{
                        padding: .2rem .7rem;
                        &:nth-child(1){
                            font-weight: 700;

                            padding: .5rem .7rem;
                            border-bottom: 1px solid rgb(218, 218, 218);
                            background-color: rgba(255, 255, 255, 0.897);
                        }
                        &:nth-child(even){
                            background-color: rgb(247, 247, 247);
                        }

                    }

                    &:nth-child(1){
                        border-left: none;
                    }
                }
            }
        }
    }

    @media (max-width: 600px) {
    }

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
        margin-top: 2rem;
        width: 80%;
        border-radius: 5px;
        background-color: rgba(255, 255, 255, 0.911);
        padding: 2rem;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        @media (max-width: 600px) {
            width: 100%;
        }

    }

}
</style>