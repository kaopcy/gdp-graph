<template>
    <div class="country-wrapper">
        <h1>Country: {{countryName}}</h1>
        <div class="country">
            <!-- <button @click="type == 'area' ? type='line':type='area'">{{type=='area'? 'line':'area'}}</button> -->
            <NormalChart :countryData="countryData" :countryKey="countryKey" :selectedCountry="selectedCountry" />
            <!-- <Chart :countryData="countryData" :countryKey="countryKey" :type="type" :selectedCountry="selectedCountry" /> -->
            <LinearRegressionChart :countryName="countryName"/>
        </div>
        <br>
        <Card/>
    </div>
</template>

<script>
import { computed  , ref , onMounted } from 'vue'
import { useRoute } from 'vue-router'
// import Chart from '../components/chart.vue'
import NormalChart from '../components/NormalChart.vue'
import LinearRegressionChart from '../components/LinearRegressionChart.vue'
import Card from '../components/Card.vue'
import useFetch from '../composables/use-fetch'

export default {
    components:{
        // Chart , 
        NormalChart,
        LinearRegressionChart,
        Card
    },
    setup() {
        const route = useRoute()
        const countryName = computed( ()=> route.params.id)
        
        const { getCountryDataByID , getCountryKeyByID } = useFetch()
        const countryData = ref([])
        const countryKey = ref('')
        
        const type = ref('area')

        const selectedCountry = ref([])

        const addCountry = name=>{
            selectedCountry.value.push(name)
            console.log(`country name: ${name}`);
            countryData.value = getCountryDataByID(selectedCountry.value)
        }
        
        onMounted( ()=>{ 
            selectedCountry.value = [countryName.value]
            countryData.value = []
            countryData.value = getCountryDataByID(selectedCountry.value)
            countryKey.value = getCountryKeyByID(countryName.value)
        })

        return { countryName , countryData , countryKey , type , selectedCountry , addCountry}
    }
}
</script>
<style lang="scss" scoped>
.country-wrapper{
    display: flex;
    flex-direction: column;
    width: 100vw;
    overflow-x: hidden;
    justify-content: center;
    align-items: center;
    .country{
    }
    .country-tag{

    }
}
</style>