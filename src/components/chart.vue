<template>
    <div>
        
    </div>
    <apexchart :type="type" height="350"  :options="options" :series="series" v-if="!isLoading"></apexchart>
</template>

<script>
import {  onMounted , computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

export default {
    props: ['countryData' , 'countryKey' , 'type' ],
    setup(props) {
        const route = useRoute()
        const store = useStore()

        const series = ref(null)
        const options = ref({
            chart: {
                id: 'GDP'
            },
            colors: [( { value } )=> {
                    if (value < 40) {
                        return 'rgb(0,255,0)'
                    } 
                    else {
                        return 'rgb(255,0,0)'
                    }
                }
            ],
            fill: {
                colors: ['#F44336', '#E91E63', '#9C27B0']
            }
        },)
        const getKey = computed( ()=> props.countryKey )
        const getData = computed( ()=> props.countryData)
        const isLoading = computed(()=> store.state.isLoading)

        const update = ()=>{
            store.commit('setIsLoading' , true)
            setTimeout(() => {
                var serie = getData.value.map( e=> { 
                    const r = {}
                    r.name = "GDP"
                    r.data = e
                    return r
                })
                series.value = serie            
                options.value = {
                    chart: {
                        id: 'vuechart-example'
                    },
                    xaxis:{
                        categories: getKey.value
                    },
                    yaxis:{
                        decimalsInFloat: 2
                    },
                    dataLabels: {
                        enabled: false,
                    },
                    tooltip:{
                        followCursor: true,
                        shared: true,
                    },
                    plotOptions: {
                        area: {
                            fillTo: 'origin',
                        }
                    },
                    stroke: { 
                        curve: 'straight', 
                        width: 1
                    }

                }
                store.commit('setIsLoading' , false)
            }, 500);
        }
        watch( route , ()=>{
            update()
        } )

        onMounted( ()=>{
            update()
        })
        return { series , options , isLoading }
    },
}
</script>

<style>

</style>