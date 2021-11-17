<template>
    <div class="data">
        <router-link
            :to="`/main-country/${route.params.id}/graph`"
            class="link"
        >
            <span class="span1"></span>
            <span class="span2"></span>
        </router-link>
        <div class="text">
            <h1><span style="color:rgb(101, 173, 255)">#</span> DATA</h1>
            <p>
                GDP Source:
                <a :href="`https://countryeconomy.com/gdp/${route.params.id}`"
                    >https://countryeconomy.com/gdp/{{ route.params.id }}</a
                >
            </p>
            <p>
                Range of Data: <span style="color:red">1980s</span> -
                <span style="color:green">2020s</span>
            </p>
            <p id="most">
                Most GDP: &nbsp;
                <span style="color:green;font-weight:500">{{ numberWithCommas(mostGDP) }}</span>
                <fa
                    :icon="['fas', 'backward']"
                    class="icon"
                    style="color:pink ;font-size:1rem;margin-left:.5rem"
                />
            </p>
            <p id="least">
                Least GDP: &nbsp;
                <span style="color:green;font-weight:500">{{ numberWithCommas(leastGDP) }}</span>
                <fa
                    :icon="['fas', 'backward']"
                    class="icon"
                    style="color:pink ;font-size:1rem;margin-left:.5rem"
                />
            </p>
            <h2>{{route.params.id}}</h2>
            <img :src="countryFlag[0][1]" alt="" class="country-flag">
        </div>
        <div class="table-container">
            <table>
                <tr>
                    <th>
                        Year
                        <fa
                            :icon="['fas', 'clock']"
                            class="icon"
                            style="color:#39e9c7 ;font-size:1rem;"
                        />
                    </th>
                    <th>
                        GDP
                        <fa
                            :icon="['fas', 'dollar-sign']"
                            class="icon"
                            style="color:green;font-size:1rem;"
                        />
                    </th>
                </tr>
                <tr
                    v-for="(item, index) in countryData[0].slice(0, 20)"
                    :key="index"
                    :class="[
                        isHover == item && isHover == leastGDP ? 'hover-least':'',
                        isHover == item && isHover == mostGDP ? 'hover-most':'',
                    ]"
                >
                    <td>{{ countryKey[index] }}</td>
                    <td>{{ numberWithCommas(item) }} $</td>
                </tr>
            </table>

            <table>
                <tr>
                    <th>
                        Year
                        <fa
                            :icon="['fas', 'clock']"
                            class="icon"
                            style="color:#39e9c7 ;font-size:1rem;"
                        />
                    </th>
                    <th>
                        GDP
                        <fa
                            :icon="['fas', 'dollar-sign']"
                            class="icon"
                            style="color:green;font-size:1rem;"
                        />
                    </th>
                </tr>
                <tr
                    v-for="(item, index) in countryData[0].slice(20)"
                    :key="index"
                    :class="[
                        isHover == item && isHover == leastGDP ? 'hover-least':'',
                        isHover == item && isHover == mostGDP ? 'hover-most':'',
                    ]"
                >
                    <td>{{ countryKey[20 + index] }}</td>
                    <td>{{ numberWithCommas(item) }} $</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import { onMounted, ref } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import useFetch from "../../composables/use-fetch";

export default {
    name: "Data",
    setup() {
        const route = useRoute();
        const {
            getCountryKeyByID,
            getCountryDataByID,
            getMostGDPbyID,
            getLeastGDPbyID,
            getAllCountryNameFlag,
        } = useFetch();

        const countryData = getCountryDataByID([route.params.id]);
        const countryKey = getCountryKeyByID(route.params.id);
        const mostGDP = getMostGDPbyID([route.params.id]);
        const leastGDP = getLeastGDPbyID([route.params.id]);
        const countryFlag = getAllCountryNameFlag(route.params.id)

        const isHover = ref(false);

        const numberWithCommas = (x) => {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        };

        onMounted(() => {
            const most = document.getElementById("most");
            const least = document.getElementById("least");
            most.addEventListener("mouseover", () => {
                isHover.value = mostGDP;
            });
            most.addEventListener("mouseout", () => {
                isHover.value = '';
            });

            least.addEventListener("mouseover", () => {
                isHover.value = leastGDP;
            });
            least.addEventListener("mouseout", () => {
                isHover.value = '';
            });
        });

        return {
            route,
            countryData,
            countryKey,
            numberWithCommas,
            mostGDP,
            leastGDP,
            isHover,
            countryFlag,
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

@keyframes scale{
    0%{
        transform-origin: right;
        transform: scaleX(0);
    }
    100%{
        transform-origin: right;
        transform: scaleX(100%);
    }
}

.data {
    animation: fade 0.5s;
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    @media (max-width: 850px) {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    @media (max-width: 850px) {
        align-items: flex-start;
    }
    .link {
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

    .text {
        margin-top: 3rem;
        height: 600px;
        width: 400px;
        background-color: #fff;
        display: flex;
        flex-direction: column;
        h1 {
            align-self: center;
            color: $font-color;
            padding: 2rem 0rem;
            padding-bottom: 1rem;
            font-weight: 700;
            font-size: 2.2rem;
            width: 80%;
            border-bottom: 1px dashed rgb(207, 207, 207);
            position: relative;
            cursor: pointer;
            &:hover {
            }
        }

        p {
            padding: 1.5rem;
            margin-left: 1rem;
            font-size: 1.25rem;
            color: $font-color;
            font-weight: 700;
            position: relative;
            border-bottom: 1px dashed rgb(207, 207, 207);
            cursor: pointer;
            &:hover{
                &::after{
                    background-color: #64adfc;
                }
            }
            
            a {
                font-size: 1rem;
                color: rgb(40, 151, 255);
                font-weight: normal;
            }

            &:nth-child(n+4){
                &:hover{
                &::before{
                    z-index: 10;
                    position: absolute;
                    animation: scale 0.5s;
                    content: '';
                    width: 80%;
                    height: 3px;
                    bottom: 18px;
                    left: 1.4rem;
                    background-color: rgb(170, 170, 170);
                }
            }
            }

            &::after {
                content: "";
                position: absolute;
                left: 0;
                top: 2rem;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background-color: rgb(134, 134, 134);
            }
        }
        
        h2{
            margin: 1rem;
            align-self: center;
            color: $font-color;
            font-weight: 700;
            font-size: 2rem;
        }
        .country-flag{
            margin: 0rem;
            width: 120px;
            justify-self: center;
            align-self: center;
        }

    }

    .table-container {
        margin-top: 3rem;
        display: flex;
        width: 900px;
        height: 600px;
        justify-content: space-between;
        color: $font-color;
        padding: 1rem;
        background-color: #fff;

        @media (max-width: 640px) {
            align-items: flex-start;
            justify-content: flex-start;
            flex-direction: column;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
            margin-left: 1rem;
            font-size: 0.8rem;
            overflow: hidden;
            tr {
                z-index: 1;
                position: relative;
                transition: .5s;
                &:nth-child(1) {
                    color: $font-color;
                    font-size: 1.3rem;
                    border-bottom: 1px dashed rgb(223, 221, 221);
                }
                &.hover-most {
                    font-size: 1rem;
                    font-weight: 700;
                    &::after{
                        animation: fade 0.5s;
                        position: absolute;
                        inset: 0;
                        content: '';
                        background-color: rgba(50, 221, 127, 0.295);
                    }
                }
                &.hover-least {
                    font-size: 1rem;
                    font-weight: 700;
                    &::after{
                        animation: fade 0.5s;
                        position: absolute;
                        inset: 0;
                        content: '';
                        background-color: rgba(255, 0, 0, 0.356);
                    }
                }
            }
            th {
                padding: 0.5rem 0;
                .icon {
                    margin-left: .5rem;
                    margin-bottom: 0.1rem;
                }
            }
            td,
            th {
                text-align: center;
                border-right: 1px solid rgba(255, 255, 255, 0.603);
            }
            td {
                padding: 0.125rem 0;
            }
        }
    }
}
</style>
