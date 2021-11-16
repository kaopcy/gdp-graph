<template>
    <div class="wrapper">
        <div class="header">
            <div class="text">
                {{countryName}}  <span>vs</span>  {{compareCountry === '' ? '..' : compareCountry}}
            </div>
            <div class="clear-btn" @click="clear">
                CLEAR <fa :icon="['fas' , 'arrow-right']" class="icon"/>
            </div>
        </div>
        <vue3-chart-js
            :id="chartData.id"
            type="line"
            :data="chartData.data"
            :options="options"
            ref="chartRef"
        />
    </div>
</template>

<script>
import { onMounted, ref, watch } from "vue";
import { store } from '../store'
import Vue3ChartJs from "@j-t-mcc/vue3-chartjs";
import zoomPlugin from "chartjs-plugin-zoom";

import useFetch from "../composables/use-fetch";
import useLinearRegression from "../composables/use-linear-regression";
import useCompareCountry from '../composables/useCompareCountry'

Vue3ChartJs.registerGlobalPlugins([zoomPlugin]);

export default {
    components: {
        Vue3ChartJs,
    },
    props: {
        countryName: {
            type: String,
            require: true,
        },
        
    },
    setup(props) {
        const { getCountryDataByID, getCountryKeyByID } = useFetch();
        const { getFasterPredictPrice } = useLinearRegression();
        const { compareCountry , setCompareCountry } = useCompareCountry();
        
        const countryData = getCountryDataByID([props.countryName]);
        const countryKey = getCountryKeyByID(props.countryName);
        const chartRef = ref(null);

        const options = {
            plugins: {
                zoom: {
                    pan:{
                        enabled: true,
                    },
                    zoom: {
                        wheel: {
                            enabled: true,
                        },
                        pinch: {
                            enabled: true,
                        },
                        mode: "y",
                    },
                },
            },
            legend: {
                position: "top",
                labels: {
                    fontColor: "white",
                },
            },
            title: {
                display: true,
                text: "Chart.js Radar Chart",
                fontColor: "white",
            },
            scale: {
                ticks: {
                    beginAtZero: true,
                    fontColor: "white", // labels such as 10, 20, etc
                    showLabelBackdrop: false, // hide square behind text
                },
                pointLabels: {
                    fontColor: "white", // labels around the edge like 'Running'
                },
                gridLines: {
                    color: "rgba(255, 255, 255, 0.2)",
                },
                angleLines: {
                    color: "white", // lines radiating from the center
                },
            },
        };

        const chartData = ref({
            id: "linear-regression",
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y',
                legend: {
                    position: "top",
                    labels: {
                        fontColor: "white",
                    },
                },
                scale: {
                    ticks: {
                        beginAtZero: true,
                        fontColor: "white", // labels such as 10, 20, etc
                        showLabelBackdrop: false, // hide square behind text
                    },
                    pointLabels: {
                        fontColor: "white", // labels around the edge like 'Running'
                    },
                    gridLines: {
                        color: "rgba(255, 255, 255, 0.2)",
                    },
                    angleLines: {
                        color: "white", // lines radiating from the center
                    },
                },
            },
            data: {
            },
        });
        
        const addDataChart = (CountryData , name , color ) => {
            const days = []
            for ( let i=0 ; i< CountryData[0].length ; i++ ) days.push(i)
            
            const { predictPrices , MSE , RMSE , MC } = getFasterPredictPrice(days, CountryData[0]);

            

            if (store.state.currentCountry.predictedPrice.length == 0){
                console.log(`w: ${MC.M} , C: ${MC.C}`);
                store.commit('setPrice' , {
                    curReal: CountryData[0],
                    curPredict: predictPrices,
                    MSE: MSE,
                    RMSE: RMSE,
                    MC: MC,
                })
            }
            else{
                store.commit('setPrice' , {
                    compareReal: CountryData[0],
                    comparePredict: predictPrices
                })
            }
            if (chartData.value.data.datasets.length < 4){
                chartData.value.data.datasets.push({
                    data: CountryData[0],
                    type: "line",
                    label: name,
                    fill: false,
                    borderColor: color.primary,
                    backgroundColor: color.primary,
                    borderWidth: 2,
                    pointRadius: 2,
                })
                chartData.value.data.datasets.push({
                    data: predictPrices,
                    type: "line",
                    label: `Linear ${name}`,
                    backgroundColor: color.secondary,
                    borderColor: color.secondary,
                    color: color.secondary,
                    pointRadius: 2,
                    borderWidth: 2
                })

            }
            else{
                chartData.value.data.datasets[2] = ({
                    data: CountryData[0],
                    type: "line",
                    label: name,
                    fill: false,
                    borderColor: color.primary,
                    backgroundColor: color.primary,
                    borderWidth: 2,
                    pointRadius: 2,
                })
                chartData.value.data.datasets[3] = ({
                    data: predictPrices,
                    type: "line",
                    label: `Linear ${name}`,
                    backgroundColor: color.secondary,
                    borderColor: color.secondary,
                    color: color.secondary,
                    pointRadius: 2,
                    borderWidth: 2
                })
            }
            console.log(`length : ${chartData.value.data.datasets.length}`);
            chartRef.value.update();
        };

        const clear = ()=>{
            if (chartData.value.data.datasets.length > 2){
                chartData.value.data.datasets.pop()
                chartData.value.data.datasets.pop()
                store.commit('clearCompareData')
                setCompareCountry('')
                chartRef.value.update();

            }
        }

        onMounted(() => {
            chartData.value.data.labels = [];
            for (let i = 0; i < countryKey.length; i++) {
                chartData.value.data.labels.push(countryKey[i].slice(2));
            }
            store.commit('setYears' ,countryKey )
            addDataChart(countryData , props.countryName , {
                primary: '#ff6384',
                secondary: '#ffc53f',
            });
        });
        
        watch(compareCountry , ()=>{
            if (compareCountry.value === '') return
            const anotherCountryData = getCountryDataByID([compareCountry.value])
            addDataChart(anotherCountryData , compareCountry.value , {
                primary: '#52c2c2',
                secondary: '#3fa6eb',
            });
        })

        watch(()=> store.state.isMobile , ()=>{
            console.log('update isMobile');
        })

        return { chartRef, chartData , options , clear , compareCountry };
    },
};
</script>


<style lang="scss" scoped>
$font-color: #404244;
.header{
    border-bottom: 1px dashed rgb(233, 233, 233);
    margin-bottom: .5rem;
    color: $font-color;
    font-size: 1.65rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .text{
        font-weight: 700;
        padding-bottom: .5rem;
    }
    .clear-btn{
        font-size: .8rem;
        font-weight: 600;
        padding: .7rem 2rem;
        color: #fff;
        background-color: #2f80d0;
        border-radius: 5px;
        margin-bottom: 1rem;
        cursor: pointer;
        transition: .15s  background-color;

        .icon{
            margin-left: .4rem;
        }

        &:hover{
            background-color: #5d9fe0;
        }
    }
    span{
        margin: 0 .25rem;
        font-size: 1.2rem;
        font-weight: 400;
    }
}
</style>