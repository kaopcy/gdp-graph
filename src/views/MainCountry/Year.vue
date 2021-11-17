<template>
    <div class="year">
        <router-link
            :to="`/main-country/${route.params.id}/graph`"
            class="link"
        >
            <span class="span1"></span>
            <span class="span2"></span>
        </router-link>

        <div class="wrapper">
            <h1 class="head">
                <span style="color:#64adfc;">#</span>
                Predict Price
            </h1>
            <p>
                <span style="font-weight:700">Formula:</span>
                 Y = mX + c
                 <a href="https://en.wikipedia.org/wiki/Linear_regression">
                    <fa :icon="['fas' , 'external-link-alt']" style="color:#b1b1b1;margin-left:1rem;cursor:pointer"/>
                 </a>
            </p>
            <p>
                <span style="font-weight:700">Y = </span>
                <span style="color:green;font-size:.8rem">{{ numberWithCommas(store.state.MC.M) }}</span>
                <span style="font-weight:700"> X + </span>
                <span style="color:red;font-size:.8rem">({{ numberWithCommas(store.state.MC.C) }})</span>
            </p>
            <div class="input-wrapper">
                <span>Year
                    <fa :icon="['fas' , 'calendar-alt']" style="color:#757679"></fa>
                </span>
                <input type="number" v-model="year" />
            </div>
            <div class="price-wrapper">
                <span>Predicted price</span>
                <h2 class="price">
                    {{ numberWithCommas(predictedPrice) }}
                    <span></span>
                </h2>

            </div>
        </div>
    </div>
</template>

<script>
import { computed, onMounted, ref, watch } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import { store } from "../../store";

export default {
    name: "Year",
    setup() {
        const router = useRouter();
        const route = useRoute();

        const year = ref("2020");

        const predictedPrice = computed(
            () => (year.value - 1980) * store.state.MC.M + store.state.MC.C
        );

        if (!store.state.MC.M || store.state.MC.M === "") {
            router.back();
        }
        onMounted(() => {
            console.log(router.options.history);
        });

        watch(year, () => {
            console.log("");
        });

        const numberWithCommas = (x) => {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        };

        return {
            route,
            store,
            year,
            predictedPrice,
            numberWithCommas,
        };
    },
};
</script>

<style lang="scss" scoped>
$font-color: #404144;

@keyframes fade {
    0% {
        transform: translateX(100%);
        opacity: 0;
    }
    100% {
        transform: translateX(0%);
        opacity: 100%;
    }
}
.year {
    animation: fade 0.5s;
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .link {
        &:nth-child(1) {
            left: 0;
            .span1 {
                transform: rotate(-45deg) translateY(-150%);
            }
            .span2 {
                transform: rotate(45deg) translateY(150%);
            }
        }
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 50%;
        width: 60px;
        transform: translateY(50%);
        top: 0;
        right: 0;
        &:hover {
            background-color: rgba(255, 255, 255, 0.267);
        }
        .span1 {
            position: absolute;
            width: 20px;
            height: 5px;
            background-color: #fff;
            transform: rotate(45deg) translateY(-150%);
        }
        .span2 {
            position: absolute;
            width: 20px;
            height: 5px;
            position: absolute;
            transform: rotate(-45deg) translateY(150%);
            background-color: #fff;
        }
    }
}

.wrapper {
    width: 600px;
    height: 500px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    color: $font-color;
    padding: 3em 3em;
    margin: auto;
    line-height: 1.75;

    h1 {
        font-size: 2rem;
        font-weight: 700;
        color: $font-color;
        &.head {
            border-bottom: 1px dashed rgb(184, 184, 184);
        }
    }
    p{
        padding: .5rem;
        padding-bottom: 0;
        &:nth-child(3){
            margin-bottom: 1rem;
            padding-bottom: 1rem;
            border-bottom: 1px dashed rgb(216, 216, 216);
        }
    }

    .input-wrapper {
        display: flex;
        align-items: center;
        flex-direction: column;
        span {
            margin-right: 1rem;
        }
        input {
            position: relative;
            color: $font-color;
            font-size: 2rem;
            font-family: var(--primary--font);
            font-weight: 700;
            padding: 0.5rem 1rem;
            outline: none;
            width: 40%;
            border: 1px solid rgb(236, 236, 236);
        }
    }
    .price-wrapper{
        align-self: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 2rem;
        padding: 1rem;
        border: 1px dashed rgb(216, 215, 215);
        span{

        }
        h2{
            padding: 1rem 2rem;
            position: relative;
            span{
                position: absolute;
                top: 50%;
                transform: translate(0,-50%);
                right: 0;
                width: 30px;
                height: 30px;
                text-align: center;
                background-color: rgb(226, 230, 38);
                border-radius: 50%;
                &::after{
                    transform: translate(-50% , -135%);
                    color: #fff;
                    position: absolute;
                    content: '$';
                    inset: 0;
                    top: 50%;
                    left: 50%;
                }
            }
        }
    }
}
</style>
