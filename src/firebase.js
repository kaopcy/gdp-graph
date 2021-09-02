import firebase from 'firebase'
import 'firebase/firestore'
import { ref , onUnmounted  } from 'vue'
import axios from 'axios'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyATamEhtEdtfjpnrSTJUsCMH30j5PDrNvE",
    authDomain: "kmitl-linear-project.firebaseapp.com",
    projectId: "kmitl-linear-project",
    storageBucket: "kmitl-linear-project.appspot.com",
    messagingSenderId: "471543978851",
    appId: "1:471543978851:web:73ddd422554c8beac9d156"
})

const db = firebaseApp.firestore()
const userCollection = db.collection('users')
const gdpCollection = db.collection('GDP')

export function loadGDP(){
    const gdp = ref(null);
    const close = gdpCollection.onSnapshot( snapshot =>{
        gdp.value = snapshot.docs.map( doc=>({ id:doc.id , ...doc.data() }) )
    })
    onUnmounted(close)
    return { gdp }
}

export async function getCountry(id){
    const country = await gdpCollection.doc(id).get()
    return country? country.data() : null
}
 
export function createUser(user) { 
    return userCollection.add(user) 
}

export async function getuser(id){
    const user = await userCollection.doc(id).get()
    return user? user.data() : null
} 

export function updateUser( id , user ){
    return userCollection.doc(id).update(user)
}

export function deleteUser(id){
    return userCollection.doc(id).delete()
}

export function userLoadUsers(){
    const users = ref([])
    const close = userCollection.onSnapshot( snapshot =>{
        users.value = snapshot.docs.map( doc=>({ id:doc.id , ...doc.data() }) )
    })
    onUnmounted(close)
    return { users }
}

export async function API(){
    const data = ref()
    try {
        data.value = await axios.get('https://opend.data.go.th/get-ckan/datastore_search?resource_id=38ccb595-3822-4311-8867-1f5cd13effc9&limit=5' , { headers: '4GKOLs0lrYhtSPsPFPQjKWQ2F7wSrQay' })
        
    } catch (error) {
        console.log(error);
    }
    return { data }
}


