import { ref } from 'vue'
const GDP = ref([])

export default function useFetch(){

    const getAllGDP = async () =>{
        try {
            const res = await fetch('../gdp.json')
            const json = await res.json()
            GDP.value = json
        } catch (error) {
            console.log(error);        
        }
    }
    const getCountryByID = (Name)=>{
        var g = []
        Name.forEach(h => {
            g.push(GDP.value.find( e => e.CountryName.toLowerCase() === h.toLowerCase()));
        });
        return  g
    }

    const getAllCountryName = (word = '')=>{
        const allData = GDP.value.filter( e=> e['CountryName'].toLowerCase().includes(word.toLowerCase()) )
        const countryName = []
        allData.forEach(e=>{
            countryName.push(e['CountryName'])
        })
        return countryName
    }
    return { getAllGDP , getCountryByID , getAllCountryName , GDP }

}
