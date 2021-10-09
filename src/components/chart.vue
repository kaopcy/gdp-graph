<template>
    <div>
    </div>
    <div class="chart-wrapper">
        <apexchart  height="350" :options="options" :series="series"  class="chart"></apexchart>
    </div>
</template>

<script>
import { computed, watch , onMounted } from 'vue'
import { store } from '../store'
import useChart from '../composables/use-chart'
export default {
    props: ['countryData' , 'countryKey' , 'type' , 'selectedCountry' ],
    setup(props) {
        const { series , options , updateSeries , updateOption  } = useChart()
        
        // const series = ref(null)
        // const options = ref({
        //     chart: {
        //         id: 'GDP'
        //     },
        //     colors: [( { value } )=> {
        //             if (value < 40) {
        //                 return 'rgb(0,255,0)'
        //             } 
        //             else {
        //                 return 'rgb(255,0,0)'
        //             }
        //         }
        //     ],
        //     fill: {
        //         colors: ['#F44336', '#E91E63', '#9C27B0']
        //     }
        // },)
        const getKey = computed( ()=> props.countryKey )
        const getData = computed( ()=> props.countryData)
        const isLoading = computed(()=> store.state.isLoading)
        updateSeries(props.selectedCountry , getData.value  )
        updateOption(getKey) 
        // const update = ()=>{
        //         let i = 0
        //         var serie = getData.value.map( e=> { 
        //             const r = {}
        //             r.name = props.selectedCountry[i]
        //             r.data = e
        //             i++
        //             return r
        //         })
                
        //         series.value = serie            
        //         options.value = {
        //             chart: {
        //                 id: 'vuechart-example'
        //             },
        //             xaxis:{
        //                 categories: getKey.value
        //             },
        //             yaxis:{
        //                 decimalsInFloat: 2
        //             },
        //             dataLabels: {
        //                 enabled: false,
        //             },
        //             tooltip:{
        //             },
        //             plotOptions: {
        //                 area: {
        //                     fillTo: 'origin',
        //                 }
        //             },
        //             stroke: { 
        //                 curve: 'straight', 
        //                 width: 1
        //             }
        //         }
        // }
        onMounted(()=>{
            window.addEventListener('keyup' , ()=>{
                updateSeries(props.selectedCountry , getData.value  )
                updateOption(getKey)
                console.log(series);
                console.log(options);
            }) 
        })
        watch( getData , ()=>{
            console.log(props.selectedCountry);
            updateSeries(props.selectedCountry , getData.value  )
            updateOption(getKey) 
        } )
        return { series , options , isLoading }
    },
}
</script>

<style lang="scss" scoped>
.chart-wrapper{
    display: flex;
    justify-content: center;
    .chart{
        background-color: #fff;
        width: 90%;
    }
}
</style>