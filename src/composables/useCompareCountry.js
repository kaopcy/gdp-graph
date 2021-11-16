import { ref } from 'vue'

const compareCountry = ref('')
export default ()=> {
    const setCompareCountry = (payload)=>{
        compareCountry.value = payload
    }

    return { setCompareCountry , compareCountry }
} 