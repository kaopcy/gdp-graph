
export const useGDP = async (word = '')=>{
    var GDP = []
    const res = await fetch( '../gdp.json' )
    const json = await res.json()
    GDP = json.filter( e => e['CountryName'].toLowerCase().includes(word) )
    console.log('gdp is :');
    console.log(GDP);
    return GDP
}

const sortKey = (obj_1)=>{
    var key = Object.keys(obj_1)
    .sort(function order(key1, key2) {
        if (key1 < key2) return -1;
        else if (key1 > key2) return +1;
        else return 0;
    });
    var temp = {};
    
    for (let i = 0; i < key.length; i++) {
        temp[key[i]] = obj_1[key[i]];
        delete obj_1[key[i]];
    }
    for (let i = 0; i < key.length; i++) {
        obj_1[key[i]] = temp[key[i]];
    }
    return obj_1;
}

export async function getGdpByID(id){
    var GDP = []
    const res = await fetch( '../gdp.json' )
    const json = await res.json()
    for(let i = 0; i < id.length; i++){
        json.forEach(e => {
            if(e['CountryCode'] == id[i]){
                sortKey(e)
                GDP.push(e)
                console.log(GDP);
            }
        });
    }
    return GDP
}

export const getCountryByID = async (code)=>{
    var GDP = []
    var g = []
    const res = await fetch('../gdp.json')
    const json = await res.json()
    GDP = json
    code.forEach(h => {
        g.push(GDP.filter( e => e['CountryCode'].toLowerCase().includes(h))[0]);
    });
    return  g
}



