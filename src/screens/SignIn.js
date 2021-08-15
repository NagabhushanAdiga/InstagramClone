import React,{useState} from 'react'
import { StyleSheet, Image,View,ScrollView,TouchableOpacity } from 'react-native'
import {Form,Container,Item,Input,Text,Button,H3} from "native-base"


import Welcome from "../Images/welcome.png"

import {connect} from "react-redux"
import {signIn} from "../action/auth"
import propTypes from "prop-types"


const SignIn = ({navigation,signIn}) =>{

const [email,setEmail] = useState('')
const [password,setPassword] = useState('')


const doSignIn = () =>{
  signIn({email,password})
}

    return(
      <Container style={styles.container}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <Image
          source={Welcome}
          style={{width: null, height: 150, marginTop: 30}}
          resizeMode="contain"
        />

        <Form style={styles.forms}>
          <Item regular style={styles.formItem}>
            <Input
              placeholder="enter your registerd email"
              value={email}
              style={{color: '#000'}}
              onChangeText={(text) => setEmail(text)}
            />
          </Item>
          <Item regular style={styles.formItem}>
            <Input
              placeholder="enter your registerd password"
              value={password}
              secureTextEntry={true}
              style={{color: '#000'}}
              onChangeText={(text) => setPassword(text)}
            />
          </Item>
          <Button style={{backgroundColor:"red"}} regular block onPress={doSignIn}>
            <Text>SignIn</Text>
          </Button>
          <TouchableOpacity
            onPress={() => navigation.navigate('SignUp')}
            style={{marginTop: 10}}>
            <Text style={{color: '#000', textAlign: 'center'}}>
              Do not have an account, SignUp here
            </Text>
          </TouchableOpacity>
        </Form>
      </ScrollView>
    </Container>
    )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'flex-start',
  },
  heading: {
    textAlign: 'center',
    color: '#fdcb9e',
    marginHorizontal: 5,
    marginTop: 30,
  },
  formItem: {
    marginBottom: 20,
  },
  forms:{
    marginTop:50
  }
});


const mapDispatchToProps  ={
  signIn:(data) =>signIn(data)
}

SignIn.propTypes= {
  signIn:propTypes.func.isRequired
}

export default connect(null,mapDispatchToProps)(SignIn);
// const styles = StyleSheet.create({})
