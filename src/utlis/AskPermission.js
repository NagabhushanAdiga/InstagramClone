import React from "react"
import {PermissionsAndroid,ToastAndroid} from "react-native"



// export const requestPermission = async () => {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
//         {
//           title: "Cool Photo App Camera Permission",
//           message:
//             "Cool Photo App needs access to your camera " +
//             "so you can take awesome pictures.",
//           buttonNeutral: "Ask Me Later",
//           buttonNegative: "Cancel",
//           buttonPositive: "OK"
//         }
//       );
//       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//         console.log("You can use the camera");
//       } else {
//         console.log("Camera permission denied");
//       }
//     } catch (err) {
//       console.warn(err);
//     }
//   };

export const requestPermission = async () =>{
    try{
        console.log("permision")
        const granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        ])
        console.log(granted)
        if(granted['PermissionAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE'] === 'denied' || 
        granted['PermissionAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE']
        ){
            ToastAndroid.show("cannont Proceed without permission",ToastAndroid.SHORT)
            requestPermission()
        }
    }catch(error){
        console.error(error)
    }
}