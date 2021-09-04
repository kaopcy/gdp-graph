<template>
    <h1>Country: {{countryName}}</h1>
    <ShowCountry @addCountry="addCountry"/>
    <br>
    <div class="country">
        <button @click="type == 'area' ? type='line':type='area'">{{type=='area'? 'line':'area'}}</button>
        <Chart :countryData="countryData" :countryKey="countryKey" :type="type" />
    </div>
</template>

<script>
import { computed  , ref , watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import Chart from '../components/chart.vue'
import ShowCountry from '../components/showCountry.vue'
import useFetch from '../composables/use-fetch'

export default {
    components:{
        Chart , ShowCountry
    },
    setup() {
        const route = useRoute()
        const countryName = computed( ()=> route.params.id)
        
        const { getCountryByID } = useFetch()

        const countryData = ref([])
        const countryKey = ref('')
        
        const type = ref('area')

        const addCountry = name=>{
            alert(name)
        }

        watchEffect(()=>{ 
            countryData.value = []
            const data = getCountryByID([countryName.value , 'thailand' , 'angola'])
            console.log(data);
            data.forEach(e=>{
                countryData.value.push(Object.values(e).map( c=> typeof(c)== 'number' ? c: null).slice(2))
            })
            countryKey.value = Object.keys(data[0]).map( c=> c == '' || c== null ? 'null': c).slice(2)
        })
        
        return { countryName , countryData , countryKey , type , addCountry }
    }
}
</script>

<style>

</style>