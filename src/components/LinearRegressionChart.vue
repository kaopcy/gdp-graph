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
    setup(){
        const { getCountryDataByID , getCountryKeyByID } = useFetch()
        const { getPredictPrice } = useLinearRegression()

        const countryData = getCountryDataByID(['Thailand'])
        const countryKey = getCountryKeyByID('Thailand')

        const chartRef = ref(null)
        
        const chartData = ref({
            id: 'linear-regression',
            type: 'line',
            options: {
            },
            data: {
                labels:[],
                datasets: [{
                    type: 'scatter',
                    label: 'GDP Data',
                    data: [],
                    backgroundColor: 'rgb(255, 99, 132)'
                },{
                    type: 'line',
                    label: 'Linear Regression',
                    data:[],
                    backgroundColor: 'transparent'
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
            const { predictPrices } = getPredictPrice(days , prices )

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