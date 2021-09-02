import  { ref } from 'vue'

const test = ref('kuay')
console.log(test);

export const useTest = ()=>{
    return test
}