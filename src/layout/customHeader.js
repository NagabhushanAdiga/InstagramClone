import React from 'react'
import { StyleSheet, View } from 'react-native'
import {Body,Right,Button,Title,Text,Icon,Header} from "native-base"
import {connect} from "react-redux"
import propTypes from "prop-types"
import {signOut} from "../action/auth"

const CustomeHeader = ({signOut,authState,navigation}) =>{
    return(
       <Header
       androidStatusBarColor="red"
       style={{backgroundColor:"red"}}
       >
         <Body>
           <Title>Social Media</Title>
         </Body>
         <Right>
           {authState.isAuthenticated && (
             <>
             <Button
             transparent
             iconLeft
             onPress={()=>{
               navigation.navigate('AddPost')
             }}
             >
               <Text style={{color:"#fff"}}>Add Post</Text>

             </Button>
             <Button
             transparent
             iconLeft
             onPress={()=>{
              signOut()
              // navigation.goBack()

              // navigation.navigate('SignIn')
             }}
             >
               <Icon name="log-out-outline" style={{color:"#fff"}}/>
               {/* <Text style={{color:"#fff"}}>Add Post</Text> */}
             </Button>
             </>
           )}
         </Right>

       </Header>
    )
}

const mapStateToProps = (state) =>({
  authState:state.auth
})

const mapDispatchToProps = () =>({
  signOut
})

CustomeHeader.propTypes = {
  signOut:propTypes.func.isRequired,
  authState:propTypes.object.isRequired
}
export default connect(mapStateToProps,mapDispatchToProps)(CustomeHeader);
// const styles = StyleSheet.create({})
