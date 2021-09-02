<template>
    <div class="wrapper">
        <div class="tag" v-for="item in data" :key="item">
            <div class="circle"></div>
            <div class="text">{{item.name}}</div>
        </div>
        <div class="add tag">+</div>
    </div>
</template>

<script>
import { ref , onMounted } from 'vue'
export default {
    name: 'showCountry',
    setup() {
        const data = ref([
            { name: 'Thailand', color: '' },
            { name: 'Thailand', color: '' },
            { name: 'Thailand', color: '' },
            { name: 'Thailand', color: '' }
        ])
        const getColor = ()=>{
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }
        
        onMounted(()=>{
            setInterval(() => {
                const circles =  document.querySelectorAll('.circle')
                circles.forEach( e=>{
                    e.style.backgroundColor = getColor()
                } )
            }, 1000);
        })

        return { data , getColor  }
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
        .circle{
            order: 0;
            background-color: #000;
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
}
</style>