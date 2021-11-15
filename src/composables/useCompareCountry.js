import { ref } from 'vue'

const compareCountry = ref('')
export default ()=> {
    compareCountry.value = ''
    const setCompareCountry = (payload)=>{
        compareCountry.value = payload
    }

    return { setCompareCountry , compareCountry }
} 