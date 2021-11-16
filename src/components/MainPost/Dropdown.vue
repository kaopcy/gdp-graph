<template>
<div class="wrapper">
    <div class="main-country">
        {{currentCountry}}
    </div>
    <div class="input-wrapper">
        <input
            class="chosen-value"
            type="text"
            placeholder="Type to filter"
            v-model="selectedCountry"
        />
        <ul class="value-list">
            <li v-for="(i , index) in filterdCountry" :key="i" @click="click(i)">
                <img :src="filterdCountryFlag[index][1]" alt="" >
                <span>{{ i }}</span>
            </li>
        </ul>
    </div>
</div>
</template>

<script>
import { computed, onMounted, ref } from "@vue/runtime-core";
import useFetch from "../../composables/use-fetch";
import useCompareCountry  from '../../composables/useCompareCountry'

export default {
    name: "Dropdown",
    props: {
        currentCountry: {
            type: String,
            require: true,
        },
    },
    setup(props ) {
        const { getAllCountryName , getAllCountryNameFlag } = useFetch();
        const { setCompareCountry } = useCompareCountry();

        const allCountry = getAllCountryName();
        const allFlag = getAllCountryNameFlag();

        const arrayOfSelectedCountry = ref([])
        const selectedCountry = ref(null);


        const filterdCountry = computed(()=>{
            return allCountry.filter((e) => e !== props.currentCountry && !arrayOfSelectedCountry.value.includes(e) )
        })

        const filterdCountryFlag = computed(()=>{
            return allFlag.filter((e)=> e!== props.currentCountry)
        })

        const click = (value)=>{
            setCompareCountry(value)
        }

        onMounted(() => {
            const inputField = document.querySelector(".chosen-value");
            const dropdown = document.querySelector(".value-list");
            const dropdownArray = [...document.querySelectorAll("li")];

            let valueArray = [];
            dropdownArray.forEach((item) => {
                valueArray.push(item.textContent);
            });
            inputField.addEventListener("input", () => {
                dropdown.classList.add("open");
                let inputValue = selectedCountry.value.toLowerCase();
                if (inputValue.length > 0) {
                    for (let j = 0; j < valueArray.length; j++) {
                        if (
                            !(
                                inputValue.substring(0, inputValue.length) ===
                                valueArray[j]
                                    .substring(0, inputValue.length)
                                    .toLowerCase()
                            )
                        ) {
                            dropdownArray[j].classList.add("closed");
                        } else {
                            dropdownArray[j].classList.remove("closed");
                        }
                    }
                } else {
                    for (let i = 0; i < dropdownArray.length; i++) {
                        dropdownArray[i].classList.remove("closed");
                    }
                }
            });

            dropdownArray.forEach((item) => {
                item.addEventListener("click", () => {
                    selectedCountry.value = item.textContent;
                    dropdownArray.forEach((dropdown) => {
                        dropdown.classList.add("closed");
                    });
                });
            });
            inputField.addEventListener("focus", () => {
                inputField.placeholder = "Type to filter";
                dropdown.classList.add("open");
                dropdownArray.forEach((dropdown) => {
                    dropdown.classList.remove("closed");
                });
            });

            inputField.addEventListener("blur", () => {
                inputField.placeholder = "Select Country";
                dropdown.classList.remove("open");
            });

            document.addEventListener("click", (evt) => {
                const isDropdown = dropdown.contains(evt.target);
                const isInput = inputField.contains(evt.target);
                if (!isDropdown && !isInput) {
                    dropdown.classList.remove("open");
                }
            });
        });

        return {
            filterdCountry,
            filterdCountryFlag,
            selectedCountry,
            arrayOfSelectedCountry,
            click
        };
    },
};
</script>

<style lang="scss" scoped>
$font-color: #404244;

.wrapper{
    height: 4rem;
    display: flex;
    flex-direction: row;
    .list{
        font-family: var(--primary--font);
        text-transform: uppercase;
        font-weight: 600;
        letter-spacing: 4px;
        height: 4rem;
        font-size: 1.1rem;
        padding: 1rem;
        background-color: #fafcfd;
        transition: 0.3s ease-in-out;

        &::-webkit-input-placeholder {
            color: #333;
        }
    }
}
.main-country{
    flex: 1;
    font-family: var(--primary--font);
    color: $font-color;
    font-weight: 700;
    font-size: 1.5rem;
    transition: 0.3s ease-in-out;
    display: flex;
    align-items: center;
    justify-content: center;
}
.input-wrapper {
    flex: 1;
    
    position: relative;
}

.chosen-value,
.value-list {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
}

.chosen-value {
    font-family: var(--primary--font);
    height: 4rem;
    color: $font-color;
    font-weight: 700;
    font-size: 1.5rem;
    transition: 0.3s ease-in-out;
    border: none;
    &::-webkit-input-placeholder {
        color: #333;
    }

    &:hover {
        background-color: #ff908b;
        cursor: pointer;

        &::-webkit-input-placeholder {
            color: #333;
        }
    }
    
    &:focus,
    &.open {
        box-shadow: 0px 5px 8px 0px rgba(0, 0, 0, 0.2);
        outline: 0;
        background-color: #ff908b;
        color: #000;

        &::-webkit-input-placeholder {
            color: #000;
        }
    }
}

.value-list {
    list-style: none;
    margin-top: 4rem;
    box-shadow: 0px 5px 8px 0px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    max-height: 0;
    transition: 0.3s ease-in-out;

    &.open {
        max-height: 320px;
        overflow: auto;
    }

    li {
        position: relative;
        height: 4rem;
        background-color: #fafcfd;
        padding: 1rem;
        font-size: 1.1rem;
        display: flex;
        align-items: center;
        cursor: pointer;
        transition: background-color 0.3s;
        opacity: 1;
        z-index: 1000;
        img{
            width: 50px;
            height: 30px;
            object-fit: cover;
            margin-right: 1rem;
        }
        &:hover {
            background-color: #ff908b;
        }

        &.closed {
            max-height: 0;
            overflow: hidden;
            padding: 0;
            opacity: 0;
        }
    }
}
</style>
