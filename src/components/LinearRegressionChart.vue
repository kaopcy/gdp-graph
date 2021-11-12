<template>
    <div class="wrapper">
        <h2>{{countryName}}</h2>
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

import useFetch from "../composables/use-fetch";
import useLinearRegression from "../composables/use-linear-regression";
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
            },
            data: {
            },
        });
        const addDataChart = (CountryData , name) => {
            const days = []
            const curDataNum = chartData.value.data.datasets.length / 2
            console.log(`curDataNum: ${curDataNum}`);
            for ( let i=0 ; i< CountryData[0].length ; i++ ) days.push(i)
            
            const { predictPrices } = getFasterPredictPrice(days, CountryData[0]);

            chartData.value.data.datasets.push({
                data: CountryData[0],
                type: "line",
                label: name,
                fill: false,
                borderColor: "hsl(200,100,100)",
                backgroundColor: "black",
            })
            chartData.value.data.datasets.push({
                data: predictPrices,
                type: "line",
                label: `Reg ${name}`,
                backgroundColor: "transparent",
                borderColor: "hsl(360,50,70)",
            })
            chartRef.value.update();
        };

        onMounted(() => {
            chartData.value.data.labels = [];
            for (let i = 0; i < countryKey.length; i++) {
                chartData.value.data.labels.push(countryKey[i].slice(2));
            }
            addDataChart(countryData , props.countryName);
        });
        
        watch(()=> props.compareCountry , ()=>{
            const anotherCountryData = getCountryDataByID([props.compareCountry])
            addDataChart(anotherCountryData , props.compareCountry );
        })

        watch(()=> store.state.isMobile , ()=>{
            console.log('update isMobile');
        })

        return { chartRef, chartData, addDataChart , options };
    },
};
</script>

<style></style>
