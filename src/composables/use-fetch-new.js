import { reactive } from "@vue/reactivity";

export default () => {
    const isLoading = ref(false)
    const GDP = reactive({
        data: null
    })

    const getAllGDP = async ()=>{
        isLoading.value = true
        try {
            const data = await fetch('../GDP_income.json')
            const json = await data.json()
            console.log(json);
            GDP.data = json
        } catch (err) {
            console.log(err);
        }
    }

    return {
        GDP,
        getAllGDP,
    }
}