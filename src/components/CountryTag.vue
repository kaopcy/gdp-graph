<template>
    <div class="wrapper">
        <div class="tag" v-for="item in getSelectedCountry" :key="item">
            <div class="circle" v-bind:style="{ backgroundColor: item.color}"></div>
            <div class="text">{{item.name}}</div>
        </div>
        <div class="add tag" @click="toggleSelect = !toggleSelect">+
            <div class="select" v-if="toggleSelect">
                <span v-for="countryName in countryNames" :key="countryName" @click.prevent="addEvent(countryName)">{{countryName}}</span>
            </div>
        </div>
        
    </div>
</template>

<script>
import { ref , onMounted , computed } from 'vue'
import useFetch from '../composables/use-fetch'
export default {
    props: ['selectedCountry'],
    name: 'showCountry',
    setup(props , context) {
        
        const { getAllCountryName } = useFetch()
        const countryNames = ref([])
        const getSelectedCountry = computed(()=>{
            var data = []
            props.selectedCountry.forEach(e => {
                data.push({ name: e , color: getColor() })
            });
            return data
        })

       
        const getColor = ()=>{
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }

        const addEvent = (ct)=>{
            context.emit('addCountry' , ct)
        }
        
        onMounted(()=>{
            countryNames.value = getAllCountryName()
        })

        const toggleSelect = ref(false)

        return { getColor , addEvent , countryNames , toggleSelect , getSelectedCountry }
    }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700&display=swap');
.wrapper{
    display: flex;
    gap: .5rem;
    .tag{
        position: relative;
        transition: .3s background-color;
        padding: 5px 10px;
        border-radius: 40px;
        border: 2px solid rgb(122, 122, 122);
        display: flex;
        flex-direction: row;
        align-items: center;
        background-color: #fff;
        .circle{
            order: 0;
            
            height: 13px;
            width: 13px;
            border-radius: 50%;
        }
        .text{
            margin-left: 5px;
            order: 1;
            font-family: 'Lato';
        }
    }
    .add{
        color: transparent;
        position: relative;
        transition: .5s background-color;
        &::after , &::before{
            position: absolute;
            top: 30%;
            left: 45%;
            content: '';
            height: 12px;
            width: 2px;
            background-color: #333;
        }
        &::after{
            transform: rotate(90deg);
        }
        &:hover{
            &::after , &::before{
                background-color: #fff;
            }
            background-color: #303030;

        }

    }
    .select{
        z-index: 100;
        position: absolute;
        top: 0;
        left: 30px;
        max-width: 250px;
        max-height: 500px;
        color: #000;
        background-color: rgb(190, 190, 190);
        overflow-x: scroll;
        display: flex;
        flex-direction: column;

    }
}
</style>