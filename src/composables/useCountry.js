import { ref , watch } from 'vue'
import { useRoute } from 'vue-router'

const compareCountry = ref('')
const currentCountry = ref('')
export default ()=> {
    const route = useRoute()
    const setCompareCountry = (payload)=>{
        compareCountry.value = payload
    }

    const setCurrentCountry = (payload)=>{
        console.log(`payload:  ${payload}`)
        currentCountry.value = payload
    }

    watch(route , ()=>{
        if (route.path == '/')
        currentCountry.value = ''
    })

    return { setCurrentCountry , setCompareCountry , compareCountry , currentCountry }
} 