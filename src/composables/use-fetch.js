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
    const getCountryDataByID = (Name)=>{
        var g = []
        Name.forEach(h => {
            console.log(`h is: ${h} type: ${typeof(h)}`);
            const rawData = GDP.value.find( e => e.CountryName.toLowerCase() === h.toLowerCase() )
            const justGDP =  Object.values(rawData).map( c=> typeof(c)== 'number' ? c: null).slice(3)
            g.push(justGDP);
        });
        return  g
    }

    const getCountryKeyByID = (name)=>{
        const rawData = GDP.value.find( e => e.CountryName.toLowerCase() === name.toLowerCase())
        const justKey = Object.keys(rawData).map( c=> c == '' || c== null ? 'null': c).slice(3)
        return justKey
    }

    const getAllCountryName = (word = '')=>{
        const allData = GDP.value.filter( e=> e['CountryName'].toLowerCase().includes(word.toLowerCase()) )
        const countryName = []
        allData.forEach(e=>{
            countryName.push(e['CountryName'])
        })
        return countryName
    }

    const getAllCountryNameFlag = (word = '')=>{
        const allData = GDP.value.filter( e=> e['CountryName'].toLowerCase().includes(word.toLowerCase()) )
        const countryName = []
        allData.forEach(e=>{
            countryName.push([e['CountryName'] , e['CountryFlag']])
        })
        return countryName
    }
    return { getAllGDP , getCountryDataByID , getCountryKeyByID , getAllCountryName , getAllCountryNameFlag , GDP }

}
