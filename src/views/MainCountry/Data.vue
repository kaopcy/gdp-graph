<template>
<div class="data">
    <router-link :to="`/main-country/${route.params.id}/graph`" class="link">
        <span class="span1"></span>
        <span class="span2"></span>
    </router-link>
    <div class="text">
        <h1>DATA</h1>
    </div>
    <div class="table-container">
        <table>
            <tr>
                <th>Year</th>
                <th>GDP</th>
            </tr>
            <tr v-for="(item, index) in countryData[0].slice(20)" :key="index">
                <td>{{countryKey[index]}}</td>
                <td>{{numberWithCommas(item)}} $</td>
            </tr>
        </table>
        <table>
            <tr>
                <th>Year</th>
                <th>GDP</th>
            </tr>
            <tr v-for="(item, index) in countryData[0].slice(0,20)" :key="index">
                <td>{{countryKey[21+index]}}</td>
                <td>{{numberWithCommas(item)}} $</td>
            </tr>
        </table>
    </div>



</div>
</template>

<script>
import { useRoute } from 'vue-router'
import useFetch from '../../composables/use-fetch'

export default {
    name: 'Data',
    setup() {
        const route = useRoute()
        const { getCountryKeyByID , getCountryDataByID } = useFetch()

        const countryData = getCountryDataByID(['thailand'])
        const countryKey = getCountryKeyByID(route.params.id)
        
        const numberWithCommas = (x)=> {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

        return {
            route,
            countryData,
            countryKey,
            numberWithCommas
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
.data{
    animation: fade .25s;
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    @media (max-width: 850px) {
        display: flex;
        flex-direction: column;
        justify-content: center;

    }
    @media (max-width: 850px) {
        align-items: flex-start;
    }
    .link{
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

    .text{
        h1{
            margin-top: 3rem;
            margin-bottom: 1rem;
            font-size: 4rem;
            padding: 1rem 2rem;
            background-color: #fff;
            color: #000;
            font-weight: 900;
            mix-blend-mode: screen;
            @media (max-width: 850px) {
                padding: .5rem 1rem;
                font-size: 2rem;
            }
        }
    }

    .table-container{
        display: flex;
        width: 700px;
        justify-content: space-between;
        color: #fff;
        padding: 1rem;
        @media (max-width: 640px) {
            align-items: flex-start;
            justify-content: flex-start;
            flex-direction: column;
        }
        

        table{
            width: 100%;
            border-collapse: collapse;
            tr{
                background-color: rgba(0, 0, 0, 0.603);
                &:nth-child(1){
                    background-color: rgba(255, 255, 255, 0.603);
                    color: #000;
                    font-size: 1.3rem;
                }
            }
            th{
                padding: .5rem 0;
            }
            td , th{
                text-align: center;
                border-right: 1px solid rgba(255, 255, 255, 0.603);
            }
            td{
                
                padding: .125rem 0;
            }
        }
    }

}
</style>