<template>
  <div class="wrapper">
        <vue3-chart-js 
            :id="chartData.id"
            :type="chartData.type"
            :data="chartData.data"
            :options="chartData.options"
            ref="chartRef"
        />
        <button @click="updateChart()">Update</button>
  </div>
</template>

<script>
import Vue3ChartJs from '@j-t-mcc/vue3-chartjs'
import useFetch from '../composables/use-fetch'
import useLinearRegression from '../composables/use-linear-regression'
import { onMounted, ref } from 'vue'
export default {
    components: {
        Vue3ChartJs,
    },
    props: ['countryName'],
    setup(props){
        const { getCountryDataByID , getCountryKeyByID } = useFetch()
        const { getFasterPredictPrice } = useLinearRegression()

        const countryData = getCountryDataByID([props.countryName])
        const countryKey = getCountryKeyByID(props.countryName)
        const chartRef = ref(null)
        const chartData = ref({
            id: 'linear-regression',
            type: 'line',
            options: {
                responsive: true,
                plugins: {
                    tooltip: {
                        usePointStyle: true,
                        callbacks: {
                            labelPointStyle: function() {
                                return {
                                    pointStyle: 'circle',
                                    rotation: 0
                                };
                            }
                        }
                    }
                },
                scales: {
                    xAxes: [{
                        display: false,
                        gridLines: {
                            display: false
                        },
                    }],
                    yAxes: [{
                        display: false,
                        gridLines: {
                            display: false
                        },
                    }]
                }
            },
            data: {
                labels:[],
                datasets: [{
                    type: 'line',
                    label: props.countryName,
                    data: [],
                    backgroundColor: 'rgb(255, 99, 132)'
                },{
                    type: 'line',
                    label: `Linear ${props.countryName}`,
                    data:[],
                    backgroundColor: 'transparent',
                    borderColor: 'rgb(75, 192, 192)',
                }],
            }

        })
        const updateChart = ()=>{
            chartData.value.data.labels = []
            chartData.value.data.datasets[1].data = []
            console.log(countryKey.length);
            const data = []
            const days = []
            const prices = []
            for(let i = 0; i < countryKey.length ;i++ ){
                days.push(i)
                prices.push(countryData[0][i])
                chartData.value.data.labels.push(countryKey[i].slice(2))
                data.push({
                    y: countryData[0][i],
                    x: countryKey[i].slice(2)
                })
            }
            const { predictPrices } = getFasterPredictPrice(days , prices )

            chartData.value.data.datasets[1].data = predictPrices
            chartData.value.data.datasets[0].data = data
            console.log(data);
            chartRef.value.update()
        }

        onMounted(()=>{
            updateChart()
        })

        return { chartRef , chartData , updateChart }
    }
}
</script>

<style>

</style>