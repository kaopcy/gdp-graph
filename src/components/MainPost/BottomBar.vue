<template>
    <div class="bottom-bar-wrapper">
        <div class="card-wrapper">
            <router-link class="card" :to="`/main-country/${country}/data`">
                <img src="../../../public/logo/data_logo.svg" alt="" class="img">
                <div class="text-wrapper">
                    <h1>DATA</h1>
                    <span>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus, illo.</span>
                </div>
            </router-link>
            <router-link class="card" :to="`/main-country/${country}/graph`">
                <img src="../../../public/logo/chart_logo.svg" alt="" class="img">
                <div class="text-wrapper">
                    <h1>CHART</h1>
                    <span>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus, illo.</span>
                </div>
            </router-link>
            <router-link class="card" :to="`/main-country/${country}/year`">
                <img src="../../../public/logo/year_logo.svg" alt="" class="img">
                <div class="text-wrapper">
                    <h1>YEAR</h1>
                    <span>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus, illo.</span>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
import { onMounted } from '@vue/runtime-core'
export default {
    props: {
        country:{
            type: String,
            require: true,
        }
    },
    name: 'BottomBar',
    setup(props) {
        onMounted(()=>{
            console.log(props.country);
        })
    }

}
</script>

<style lang="scss" scoped>
.bottom-bar-wrapper{
    position: absolute;
    width: 100%;
    height: 65%;
    bottom: 0;
    right: 0;
    background: linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 21%, rgba(3,0,0,0) 100%);

    z-index: 5;
    @media (max-width: 500px) {
        background: linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 45%, rgba(3,0,0,0) 100%);
    }

    .card-wrapper{
        width: 100%;
        height: 60%;
        position: absolute;
        display: flex;
        justify-content: center;
        @media (max-width: 500px) {
            flex-direction: column;
            overflow-y: scroll;
            justify-content: start;
            height: 80%;
        }
    }

    .card{
        text-decoration: none;
        padding: 1rem 1rem;
        display: flex;
        height: 100%;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border: 4px solid white;
        margin: 0 3%;
        margin-bottom: 1rem;
        cursor: pointer;
        transition: .25s;
        &:hover{
            background-color: rgba(0, 0, 0, 0.384);
        }

        img{
            width: 40%;
            margin-bottom: 1rem;
        }
        .text-wrapper{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: #fff;
            h1{
                text-align: center;
                margin-bottom: 1rem;
            }
            span{
                text-align: center;
            }
        }
    }
}
</style>