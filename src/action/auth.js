import auth from '@react-native-firebase/auth'
import Snackbar from 'react-native-snackbar'
import database from '@react-native-firebase/database'

export const signUp = (data) => async (dispatch) =>{
    console.log(data)
    const {name,instaUserName,bio,email,password,country,image} = data
    auth()
    .createUserWithEmailAndPassword(email,password)
    .then((data)=>{
        console.log(data)
        console.log("user creation success")
   database()
   .ref('/users/'+ data.user.uid)
   .set({
       name,
       instaUserName,
       country,
       image,
       bio,
       uid:data.user.uid
   })
   .then(()=>
       console.log("data set success"))
       Snackbar.show({
           text:"Account created",
           textColor:"white",
           backgroundColor:"green"
   })
    })
    .catch((error)=>{
        console.error(error)
        Snackbar.show({
            text:"Signup Failed",
            textColor:'white',
            backgroundColor:'red'
        })
    }) 
}

export const signIn = (data) => async (dispatch) =>{
    console.log('data from signin',data)
    const {email,password} = data

    auth()
    .signInWithEmailAndPassword(email,password)
    .then(() =>{
        console.log("signin success")
        Snackbar.show({
            text:"Account signed in",
            textColor:"white",
            backgroundColor:'greeen'
        })
    })
    .catch((error)=>{
        console.error(error)
        Snackbar.show({
            text:"Sign in Failed",
            textColor:'white',
            backgroundColor:"red"
        })
    })
}

export const signOut  = () => async (dispatch) =>{
    console.log("cooming from signout")
    auth()
    .signOut()
    .then(()=>{
        console.log("signout success")
        Snackbar.show({
            textColor:"white",
            text:"Sign Out success",
            backgroundColor:"green"
        })
    })
    .catch((error)=>{
        console.log(error)
        Snackbar.show({
            text:"Sign out Failed",
            textColor:'white',
            backgroundColor:"red"
        })
    })
}