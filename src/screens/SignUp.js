import React,{useState} from 'react'
import { StyleSheet,View, ScrollView,TouchableOpacity} from 'react-native'
import {Text,Button,Item,Input,Container,Form,Thumbnail,Content} from "native-base"

import storage from "@react-native-firebase/storage"
import ProgressBar from 'react-native-progress/Bar'

import ImagePicker from "react-native-image-picker"
import {options} from "../utlis/options"

// redux

import propTypes from "prop-types"
import {signUp} from "../action/auth"
import {connect} from "react-redux"
import { response } from 'express'

const SignUp = ({signUp}) =>{
  const [name,setName] =useState('')
  const [email,setEmail] =useState('')
  const [password,setPassword] =useState('')
  const [instaUserName,setInstaUserName] =useState('')
  const [country,setCountry] =useState('')
  const [bio,setBio] =useState('')
  const [imageUploading,setImageUploading] =useState(false)
  const [uploadStatus,setUploadStatus] =useState(null)
  const [image,setImage] =useState(
    'https://firebase.google.com/downloads/brand-guidelines/PNG/logo-logomark.png'
  )

  const chooseImage = async () =>{
    ImagePicker.showImagePicker(options,(response)=>{
      console.log("response=",response)
      if(response.didCancel){
        console.log("user cancelled the image picker option")
      }else if(response.error){
        console.log("error from image picker",response.error)
      }else if(response.customButton){
        console.log("custom button presssed",response.customButton)
      }else{
        console.log(response)
        uploadImage(response)
      }
    })
   

  }

  const uploadImage = async  (response) =>{
    setImageUploading(true)
    const reference = storage().ref(response.fileName)
    const task = reference.putFile(response.path)
    task.on('state_changed',(tasksnapshot)=>{
      const percentage = (tasksnapshot.bytesTransferred/tasksnapshot.totalBytes)*1000
      setUploadStatus(percentage)
    })
    task.then(async() =>{
      const url = await reference.getDownloadURL()
      setImage(url)
      setImageUploading(false)
    })

  }

  const doSignUp = async () =>{
    signUp({name,instaUserName,bio,country,email,password,image})
  }



    return(
        <>
          <Container style={styles.container}>
      <Content padder>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.imageContainer}>
            <TouchableOpacity onPress={chooseImage}>
              <Thumbnail large source={{uri: image}} />
            </TouchableOpacity>
          </View>

          {imageUploading && (
            <ProgressBar progress={uploadStatus} style={styles.progress} />
          )}

          <Form>
            <Item regular style={styles.formItem}>
              <Input
                placeholder="Enter name"
                value={name}
                style={{color: '#eee'}}
                onChangeText={(text) => setName(text)}
              />
            </Item>
            <Item regular style={styles.formItem}>
              <Input
                placeholder="Enter email address"
                value={email}
                style={{color: '#eee'}}
                onChangeText={(text) => setEmail(text)}
              />
            </Item>
            <Item regular style={styles.formItem}>
              <Input
                placeholder="Enter password"
                value={password}
                secureTextEntry={true}
                style={{color: '#eee'}}
                onChangeText={(text) => setPassword(text)}
              />
            </Item>
            <Item regular style={styles.formItem}>
              <Input
                placeholder="Instagram user name"
                value={instaUserName}
                style={{color: '#eee'}}
                onChangeText={(text) => setInstaUserName(text)}
              />
            </Item>
            <Item regular style={styles.formItem}>
              <Input
                placeholder="Your Short Bio"
                value={bio}
                style={{color: '#eee'}}
                onChangeText={(text) => setBio(text)}
              />
            </Item>
            <Item regular style={styles.formItem}>
              <Input
                placeholder="country"
                value={country}
                style={{color: '#eee'}}
                onChangeText={(text) => setCountry(text)}
              />
            </Item>
            <Button style={{backgroundColor:"red"}}  regular block onPress={doSignUp}>
              <Text>Register</Text>
            </Button>
          </Form>
        </ScrollView>
      </Content>
    </Container> 
        </>
    )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1b262c',
    flex: 1,
    justifyContent: 'flex-start',
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 5,
  },
  progress: {width: null, marginBottom: 20},
  formItem: {
    marginBottom: 20,
  },
});


const mapDispatchToProps = {
  signUp:(data) => signUp(data)
}


SignUp.propTypes={
  signUp:propTypes.func.isRequired
}

export default connect(null,mapDispatchToProps) (SignUp);
// const styles = StyleSheet.create({})
