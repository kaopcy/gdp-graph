<template>
    <h1>the name is {{name}} and its id is {{countryID}}</h1>
    <div class="country">
        <button @click="type == 'area' ? type='line':type='area'">{{type=='area'? 'line':'area'}}</button>
        <Chart :countryData="countryGdpData" :countryKey="countryGdpKey" :type="type" />
    </div>
    <ShowCountry/>
</template>

<script>
import { computed  , ref, watch , watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import Chart from '../components/chart.vue'
import ShowCountry from '../components/showCountry.vue'
// import { getCountry } from '../firebase'
import { getGdpByID } from '../useGDP'
 
export default {
    components:{
        Chart , ShowCountry
    },
    setup() {
        const route = useRoute()
        const id = ref()
        const name = ref()

        const countryID = computed( ()=> route.params.id)
        const countryGdpData = ref([])
        const countryGdpKey = ref('')
        
        const type = ref('area')

        watch(type , ()=>{console.log(type.value);})

        // const sortKey = (obj_1)=>{
        //     var key = Object.keys(obj_1)
		// 	.sort(function order(key1, key2) {
		// 		if (key1 < key2) return -1;
		// 		else if (key1 > key2) return +1;
		// 		else return 0;
		// 	});
		// 	var temp = {};
			
		// 	for (let i = 0; i < key.length; i++) {
		// 		temp[key[i]] = obj_1[key[i]];
		// 		delete obj_1[key[i]];
		// 	}
		// 	for (let i = 0; i < key.length; i++) {
		// 		obj_1[key[i]] = temp[key[i]];
		// 	}
		// 	return obj_1;
        // }
        watchEffect( async ()=>{ 
            countryGdpData.value = []
            try {
                const GDP = await getGdpByID([countryID.value , 'THA' , 'ARB'])
                console.log(GDP);
                id.value  =  GDP.CountryCode
                name.value  =  GDP.CountryName
                GDP.forEach(e=>{
                    countryGdpData.value.push(Object.values(e).map( c=> typeof(c)== 'number' ? c: null).slice(2))
                })
                countryGdpKey.value = Object.keys(GDP[0]).map( c=> c == '' || c== null ? 'null': c).slice(2)
            } catch (error) {
                console.log(error);
            }
            // try {
            //     const countryData = await getCountry(countryID.value)
            //     console.log(countryData);
            //     console.log(sortKey(countryData));
            //     id.value  =  countryData.CountryCode
            //     name.value  =  countryData.CountryName
            //     countryGdpData.value = Object.values(countryData).map( c=> typeof(c)== 'number' ? c: 10).slice(2)
            //     countryGdpKey.value = Object.keys(countryData).map( c=> c == '' || c== null ? 'null': c).slice(2)
                
            // } catch (error) {
            //     console.log(error);
            // }

        })
        return { id ,name , countryID ,countryGdpData , countryGdpKey , type }
    }
}
</script>

<style>

</style>