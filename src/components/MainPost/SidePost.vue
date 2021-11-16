<template>
<div class="side-post">
    <div class="head">
        <Dropdown :currentCountry="route.params.id"/>
    </div>
    <div class="body">
        <div class="block">
            <p><b>Linear Regression</b> </p>
            <p>
                <span style="margin-left:1rem;font-weight:500">Y<span style="font-size:.65rem">predicted</span> = 
                    <span style="color:green;font-size:.8rem;font-weight:400" >{{numberWithCommas(store.state.MC.M)}}</span> X + 
                    <span style="color:red;font-size:.8rem;font-weight:400" >{{numberWithCommas(store.state.MC.C)}}</span>
                </span>
            </p>
            <ul style="margin-left:1.5rem">
                <p>
                    <span style="font-weight:500; font-size:.8rem;">m = 
                        <span style="color:green;font-size:.8rem;font-weight:400" >{{numberWithCommas(store.state.MC.M)}}</span>
                    </span>
                </p>
                <p>
                    <span style="font-weight:500; font-size:.8rem;">c = 
                        <span style="color:red;font-size:.8rem;font-weight:400" >{{numberWithCommas(store.state.MC.C)}}</span>
                    </span>
                </p>
            </ul>
        </div>

        <div class="block">
            <p><b>Mean square error (MSE)</b> </p>
            <p><span style="font-weight:500; margin-left:.65rem">MSE</span> = Σ(P – R)2 / n </p>
            <p style="color:green; font-weight:500">&nbsp; = {{numberWithCommas(store.state.MSE)}}</p>
        </div>

        <div class="block">
            <p style="margin-top:.4rem"><b>Root mean square error (RMSE)</b></p>
            <p><span style="font-weight:500; margin-left:.65rem">RMSE</span> = √[ Σ(P – R)2 / n ]</p>
            <p style="color:green; font-weight:500">&nbsp; = {{numberWithCommas(store.state.RMSE)}}</p>
        </div>

        <p style="margin-top:.6rem; font-weight: 700">where:</p>
        <ul>
            <p> <span style="font-weight:500">Σ</span>  is a fancy symbol that means “sum”</p>
            <p> <span style="font-weight:500">P</span>  is the predicted value</p>
            <p> <span style="font-weight:500">R</span>  is the Real value</p>
            <p> <span style="font-weight:500">n</span>  is the sample size</p>
        </ul>

    </div>
</div>
</template>

<script>
import Dropdown from '../../components/MainPost/Dropdown.vue'
import { useRoute } from 'vue-router'
import { store } from '../../store'
import { isInteger } from 'mathjs'

export default {
    name: 'SidePost',
    components:{
        Dropdown,
    },

    setup() {
        const route = useRoute()

        const numberWithCommas = (x)=> {
            if (x)
                return isInteger(x) ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : x.replace(/\B(?=(\d{3})+(?!\d))/g, ",") ;
        }

        return { numberWithCommas , route , store }
    }
}
</script>

<style lang="scss" scoped>
$font-color: #404244;

.side-post{
    color: $font-color;
    position: relative;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;
    .head{
        width: 100%;
        margin: 1rem;
    }
    .body{
        background-color: rgba(255, 255, 255, 0.89);
        box-shadow: rgba(0, 0, 0, 0.2) 0px 18px 50px -10px;
        padding: 1rem 2rem;
        width: 100%;
        font-weight: 300;
        line-height: 1.6rem ;
        .block{
            border-bottom: 1px dashed rgb(207, 207, 207);
            padding-bottom: .5rem;
            margin-bottom: 1rem;

        }
        b{
            font-size: 1.25rem;
        }
        p{
        }
        ul{
            padding-left: 2rem;
            p{
                position: relative;
                &::before {
                    position: absolute;
                    content: "";
                    left: -15px;
                    top: 50%;
                    transform: translate(-50% , -50%);
                    height: 5px;
                    width: .5px;
                    border-radius: 50%;
                    background: rgb(187, 187, 187);
                    padding-right: 5px;
                }

            }
        }
    }
}
</style>