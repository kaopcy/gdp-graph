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
            <div class="head-wrapper">
                <div class="head-1">
                    <h1 class="head">
                        <span style="color:#64adfc;">#</span>
                        Predict Price
                    </h1>
                    <p>
                        <span style="font-weight:700">Formula:</span>
                        Y = mX + c
                        <a
                            href="https://en.wikipedia.org/wiki/Linear_regression"
                        >
                            <fa
                                :icon="['fas', 'external-link-alt']"
                                style="color:#b1b1b1;margin-left:1rem;cursor:pointer"
                            />
                        </a>
                    </p>
                    <p>
                        <span style="font-weight:700">Y = </span>
                        <span style="color:green;font-size:.8rem">{{
                            numberWithCommas(CurrentCountry.MC.M)
                        }}</span>
                        <span style="font-weight:700"> X + </span>
                        <span style="color:red;font-size:.8rem"
                            >({{ numberWithCommas(CurrentCountry.MC.C) }})</span
                        >
                    </p>
                </div>
                <div class="head-2">
                    <h1>{{ route.params.id }}</h1>
                    <img :src="CurrentCountryFlag" alt="" />
                </div>
            </div>
            <div class="input-wrapper">
                <span
                    >Year
                    <fa
                        :icon="['fas', 'calendar-alt']"
                        style="color:#757679"
                    ></fa>
                </span>
                <input type="number" v-model="curYear" />
            </div>
            <div class="price-wrapper">
                <span>Predicted price: </span>
                <h2 class="price">
                    {{ numberWithCommas(currentPredictedPrice) }}
                    <span></span>
                </h2>
            </div>
        </div>
        <div class="is-link">
            <div class="icon-wrapper">
                <fa
                    :class="[`${isBound ? 'active' : ''}` , 'icon']"
                    :icon="['fas', `${isBound ? 'link' : 'unlink'}`]"
                    @click="isBound = !isBound"
                />
            </div>
            <div class="icon">
                <fa
                    :class="[`${isBound ? 'active' : ''}` , 'icon']"
                    :icon="['fas', `brush`]"
                    @click="clean()"
                />
            </div>
        </div>
        <div class="wrapper">
            <div class="head-wrapper">
                <div class="head-1">
                    <h1 class="head">
                        <span style="color:#64adfc;">#</span>
                        Predict Price
                    </h1>
                    <p>
                        <span style="font-weight:700">Formula:</span>
                        Y = mX + c
                        <a
                            href="https://en.wikipedia.org/wiki/Linear_regression"
                        >
                            <fa
                                :icon="['fas', 'external-link-alt']"
                                style="color:#b1b1b1;margin-left:1rem;cursor:pointer"
                            />
                        </a>
                    </p>
                    <p>
                        <span style="font-weight:700">Y = </span>
                        <span style="color:green;font-size:.8rem">{{
                            numberWithCommas(CompareCountry.MC.M)
                        }}</span>
                        <span style="font-weight:700"> X + </span>
                        <span style="color:red;font-size:.8rem"
                            >({{ numberWithCommas(CompareCountry.MC.C) }})</span
                        >
                    </p>
                </div>
                <div class="head-2">
                    <h1>{{ compareCountry }}</h1>
                    <img :src="CompareCountryFlag" />
                </div>
            </div>
            <div class="input-wrapper">
                <span
                    >Year
                    <fa
                        :icon="['fas', 'calendar-alt']"
                        style="color:#757679"
                    ></fa>
                </span>
                <input type="number" v-model="compareYear" />
            </div>
            <div class="price-wrapper">
                <span>Predicted price: </span>
                <h2 class="price">
                    {{ numberWithCommas(comparePredictedPrice) }}
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
import useCountry from "../../composables/useCountry";

export default {
    name: "Year",
    setup() {
        const router = useRouter();
        const route = useRoute();
        const {
            CurrentCountryFlag,
            CompareCountryFlag,
            compareCountry,
            currentCountry,
        } = useCountry();

        const curYear = ref("2020");
        const compareYear = ref("2020");

        const isBound = ref(true);

        const CurrentCountry = computed(() => store.state.currentCountry);
        const CompareCountry = computed(() => store.state.compareCountry);

        const currentPredictedPrice = computed(
            () =>
                (curYear.value - 1980) * CurrentCountry.value.MC.M +
                CurrentCountry.value.MC.C
        );

        const comparePredictedPrice = computed(
            () =>
                (compareYear.value - 1980) * CompareCountry.value.MC.M +
                CompareCountry.value.MC.C
        );

        const clean = () => {
            curYear.value = "2020";
            compareYear.value = "2020";
        };

        if (!CurrentCountry.value.MC.M || CurrentCountry.value.MC.M === "") {
            router.back();
        }
        onMounted(() => {
            console.log(router.options.history);
        });

        watch(curYear, () => {
            if (isBound.value) compareYear.value = curYear.value;
        });

        const numberWithCommas = (x) => {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        };

        return {
            route,
            curYear,
            compareYear,
            CurrentCountry,
            CompareCountry,
            currentCountry,
            compareCountry,
            currentPredictedPrice,
            comparePredictedPrice,
            numberWithCommas,
            CompareCountryFlag,
            CurrentCountryFlag,
            isBound,
            clean,
        };
    },
};
</script>

<style lang="scss" scoped>
$font-color: #404144;
$main-height: 500px;

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

.is-link {
    height: $main-height;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    color: $font-color;
    flex-direction: column;
    .icon-wrapper {
        margin: 2rem 0;
        transition: 0.25s;
        cursor: pointer;
        position: relative;
        border: 2px dashed rgb(202, 202, 202);
        border-radius: 50%;
        width: 3.4rem;
        height: 3.4rem;
        display: flex;
        justify-content: center;
        align-items: center;
        .icon{
            transition: 0.25s;
        }
        &:hover {
            border: 2px dashed rgb(99, 99, 99);
        }
        &::before {
            content: "";
            position: absolute;
            top: -100%;
            left: 50%;
            transform: translateX(-50%);
            font-size: 0.8rem;
            color: #fff;
            background-color: rgb(167, 167, 167);
            border-radius: 10px;
            padding: 0.5rem;
            font-weight: normal;
            visibility: hidden;
        }
        &:nth-child(1):hover {
            &::before {
                content: "Link";
                visibility: visible;
            }
            &.active::before {
                content: "unLink";
            }
        }
        &:nth-child(2):hover {
            &::before {
                content: "clean";
                visibility: visible;
            }
        }
        .active {
            transform: rotate(45deg);
        }
    }
}

.wrapper {
    width: 600px;
    height: $main-height;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    color: $font-color;
    padding: 3em 3em;
    line-height: 1.75;
    .head-wrapper {
        width: 100%;
        display: flex;

        .head-1 {
            flex: 2;
            h1 {
                font-size: 2rem;
                font-weight: 700;
                color: $font-color;
                &.head {
                    border-bottom: 1px dashed rgb(184, 184, 184);
                }
            }
            p {
                padding: 0.5rem;
                padding-bottom: 0;
                &:nth-child(3) {
                    margin-bottom: 1rem;
                    padding-bottom: 1rem;
                    border-bottom: 1px dashed rgb(216, 216, 216);
                }
            }
        }
        .head-2 {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin-left: 2rem;
            h1 {
                font-size: 1rem;
                font-weight: 700;
                color: $font-color;
            }
            img {
                width: 100px;
                height: 60px;
                box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
            }
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
    .price-wrapper {
        align-self: center;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin-top: 2rem;
        padding: 1rem;
        border: 1px dashed rgb(216, 215, 215);
        span {
        }
        h2 {
            padding: 1rem 2rem;
            position: relative;
            span {
                position: absolute;
                top: 50%;
                transform: translate(0, -50%);
                right: 0;
                width: 30px;
                height: 30px;
                text-align: center;
                background-color: rgb(226, 230, 38);
                border-radius: 50%;
                &::after {
                    transform: translate(-50%, -135%);
                    color: #fff;
                    position: absolute;
                    content: "$";
                    inset: 0;
                    top: 50%;
                    left: 50%;
                }
            }
        }
    }
}
</style>
