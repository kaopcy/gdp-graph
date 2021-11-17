import { ref } from 'vue'
import json from '../../public/GDP_income.json'
const GDP = ref([])



export default function useFetch(){
    const getAllGDP = () =>{
        try {
            GDP.value = json
        } catch (error) {
            console.log(error);        
        }
    }

    getAllGDP()

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
        console.log(`name: ${name}`);
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

    const getMostGDPbyID = ( name )=>{
        const data = getCountryDataByID(name)[0]
        return data.sort((a,b)=> a-b)[data.length-1]
    }
    
    const getLeastGDPbyID = ( name )=>{
        const data = getCountryDataByID(name)[0]
        return data.sort((a,b)=> a-b)[0]
    }

    return { getCountryDataByID , getCountryKeyByID , getAllCountryName , getAllCountryNameFlag , getMostGDPbyID , getLeastGDPbyID , GDP }

}
