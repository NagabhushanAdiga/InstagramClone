import React,{useEffect} from "react"
import {View,Text} from "react-native"
import 'react-native-gesture-handler'
import auth from "@react-native-firebase/auth"

import {NavigationContainer} from "@react-navigation/native"
import {createStackNavigator} from "@react-navigation/stack"

import {connect,useDispatch} from "react-redux"


// importing screens
import AddPost from "./screens/AddPost"
import Signin from "./screens/SignIn"
import SignUp from "./screens/SignUp"
import Home from "./screens/Home"
import CustomHeader from "./layout/customHeader"

import {SET_USER,IS_ANTHENTICATED} from "./action/action.types"
import database from "@react-native-firebase/database"
import EmptyContainer from "./components/EmptyContainer"

import { requestPermission } from "./utlis/AskPermission"

const Stack = createStackNavigator()

const App = ({authState}) =>{
  const dispatch = useDispatch()

  const onAuthStateChanged = (user) =>{
    if(user){
      dispatch({
        type:IS_ANTHENTICATED,
        payload:true
      })
      console.log(user._user.uid)
      database()
      .ref(`/users/${user._user.uid}`)
      .on('value',(snapshot)=>{
         console.log('user details',snapshot.val())
         dispatch({
           type:SET_USER,
           payload:snapshot.val(),
         })
      })
    }else{
      dispatch({
        type:IS_ANTHENTICATED,
        payload:false
      })
    }
  }


  useEffect(()=>{
    requestPermission()
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
  
    return subscriber
 },[])

  
if(authState.loading) {
  return <EmptyContainer/>
}
return(
  <>
  <NavigationContainer>
    <Stack.Navigator
    screenOptions={{
      header:(props)=><CustomHeader {...props}/>
    }}
    >
      {authState.isAuthenticated ?  (
        <>
     <Stack.Screen name="Home" component={Home} />
     <Stack.Screen name="AddPost" component={AddPost} />

        </>
      ) :(
        <>
          <Stack.Screen name="SignIn" component={Signin} />
         <Stack.Screen name="SignUp" component={SignUp} />
        </>
      )}
    </Stack.Navigator>
  </NavigationContainer>
  </>
)
}

const mapStateToProps = (state)=>(
  {
    authState:state.auth
  }
)

export default connect(mapStateToProps)(App)