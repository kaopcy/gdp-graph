<template>
  <div class="chart">
    <vue3-chart-js
        :id="chartData.id"
        :type="chartData.type"
        :data="chartData.data"
        :options="chartData.options"
        ref="chartRef"
    ></vue3-chart-js>
  </div>
</template>

<script>
import { computed, ref, watch } from 'vue'
import Vue3ChartJs from '@j-t-mcc/vue3-chartjs'
import useChart from '../composables/use-chart'
import { store } from '../store'

export default {
  name: 'App',
  components: {
    Vue3ChartJs,
  },
  props: ['countryData' , 'countryKey' , 'type' , 'selectedCountry' ],
  setup (props) {
    const isMoblie = computed(()=> store.state.isMobile )
    const { chartData , updateChart } = useChart( isMoblie )
    const chartRef = ref(null)

    const data = computed(()=> props.countryData )

    watch( data , ()=>{
      console.log('props.countryData');
      updateChart(props.selectedCountry , props.countryKey , props.countryData )
      chartRef.value.update()
    })

    // watch( isMoblie, ()=>{
      //   console.log(`mobile: ${isMoblie.value}`);
    //   updateChart(props.selectedCountry , props.countryKey , props.countryData )
      // isMobileChart( isMoblie.value )
    //   chartRef.value.update()
    // } )
    
    return {
      chartData,
      chartRef
    }
  },
}
</script>

<style lang="scss" scoped>
.chart{
  width: 90vw;
  min-height: 70vh;
  margin: auto;
}
</style>