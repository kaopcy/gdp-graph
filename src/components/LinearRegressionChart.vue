<template>
    <div class="wrapper">
        <h2>{{countryName}}  <span>vs</span>  {{compareCountry === '' ? '..' : compareCountry}}</h2>
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
        compareCountry: {
            type: String,
            require: true,
        }
    },
    setup(props) {
        const { getCountryDataByID, getCountryKeyByID } = useFetch();
        const { getFasterPredictPrice } = useLinearRegression();

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
            
            const { predictPrices , MSE , RMSE } = getFasterPredictPrice(days, CountryData[0]);

            

            if (store.state.currentCountry.predictedPrice.length == 0){
                store.commit('setPrice' , {
                    curReal: CountryData[0],
                    curPredict: predictPrices,
                    MSE: MSE,
                    RMSE: RMSE,
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
                    borderWidth: 1,
                    pointRadius: 1,
                })
                chartData.value.data.datasets.push({
                    data: predictPrices,
                    type: "line",
                    label: `Linear ${name}`,
                    backgroundColor: color.secondary,
                    borderColor: color.secondary,
                    color: color.secondary,
                    pointRadius: 1,
                    borderWidth: 1
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
                    borderWidth: 1,
                    pointRadius: 1,
                })
                chartData.value.data.datasets[3] = ({
                    data: predictPrices,
                    type: "line",
                    label: `Linear ${name}`,
                    backgroundColor: color.secondary,
                    borderColor: color.secondary,
                    color: color.secondary,
                    pointRadius: 1,
                    borderWidth: 1
                })
            }
            console.log(`length : ${chartData.value.data.datasets.length}`);
            chartRef.value.update();
        };

        onMounted(() => {
            store.commit('clearCountryData')
            chartData.value.data.labels = [];
            for (let i = 0; i < countryKey.length; i++) {
                chartData.value.data.labels.push(countryKey[i].slice(2));
            }
            store.commit('setYears' ,countryKey )
            addDataChart(countryData , props.countryName , {
                primary: 'red',
                secondary: 'orange',
            });
        });
        
        watch(()=> props.compareCountry , ()=>{
            const anotherCountryData = getCountryDataByID([props.compareCountry])
            addDataChart(anotherCountryData , props.compareCountry , {
                primary: 'blue',
                secondary: 'black',
            });
        })

        watch(()=> store.state.isMobile , ()=>{
            console.log('update isMobile');
        })

        return { chartRef, chartData , options };
    },
};
</script>


<style lang="scss" scoped>
$font-color: #404244;
h2{
    border-bottom: 1px dashed rgb(233, 233, 233);
    padding-bottom: .5rem;
    margin-bottom: .5rem;
    color: $font-color;
    font-size: 1.65rem;
    font-weight: 700;
    span{
        margin: 0 .25rem;
        font-size: 1.2rem;
        font-weight: 400;
    }
}
</style>