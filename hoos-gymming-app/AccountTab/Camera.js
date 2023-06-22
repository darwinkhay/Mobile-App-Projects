import React, {useState, useEffect, useContext, useRef} from 'react';
import {Storage} from '@aws-amplify/storage'

 import {
     SafeAreaView,
     ScrollView,
     StatusBar,
     useColorScheme,
     Text,
     View,
     Alert,
     Checkbox,
     FlatList,
     TouchableOpacity,
     Animated,
     Button,
     Image
     
    
   } from 'react-native';
import { Camera } from 'expo-camera';
import { shareAsync } from 'expo-sharing';
 import { Ionicons } from '@expo/vector-icons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
   
import styles from '../styles/styles.js'
import { DataStore } from '@aws-amplify/datastore';
import { User } from '../src/models';
import {UserContext, IdContext} from '../context/UserContext'

const CameraScreen = ({ navigation, route }) => {
    const {id, setId} = useContext(IdContext)
    const {user, setUser} = useContext(UserContext)
    const [currentUser, setCurentUser] = useState({})
    let cameraRef = useRef();
    const [hasCameraPermission, setHasCameraPermission] = useState();
    const [photo, setPhoto] = useState();
    const [type, setType] = useState(Camera.Constants.Type.back)

    useEffect(() => {
    // //query the initial user and subscribe to data updates
    // const subscription = DataStore.observeQuery(User).subscribe((snapshot) => {
    //   //isSynced can be used to show a loading spinner when the list is being loaded. 
    //   const { items, isSynced } = snapshot;
    // for (let i = 0; i < items.length; i++) {
    //             if ( items[i].id === id ){
    //                 setCurentUser(items[i])
    //                 break;
    //             } 
    //         } 
    // });
    // //unsubscribe to data updates when component is destroyed so that you don’t introduce a memory leak.
    // return function cleanup() {
    //   subscription.unsubscribe();
    // }
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: "none"
      }
    });
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
    })();
  }, []);
     const isDarkMode = useColorScheme() === 'dark';
 
     const backgroundStyle = {
         backgroundColor: isDarkMode ?  "#FFFFFF" : "#dae1f7"
     };
     if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>
  } else if (!hasCameraPermission) {
       navigation.getParent()?.setOptions({
                tabBarStyle: {
                    display: "block",
                    backgroundColor: "#121212",
                    borderTopColor: 'black'
      }})
    return <Text style={{textAlign:'center', marginTop: '80%'}}>Permission for camera not granted. Please change this in settings.</Text>
  }

  let takePic = async () => {
    let options = {
      quality: 1,
      exif: false
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto.uri);
  };

     async function addPicToUserInfo(fileName) {
  const original = await DataStore.query(User, id);
  const updatedFileName = await DataStore.save(
    User.copyOf(original, updated => {
      updated.member_date = fileName
   
    })
  );
}
 
async function uploadPicToS3() {
    try {
      // new code for images
      const image = await fetch(photo)
      let fileName = photo.replace(/^.*[\\\/]/,"")
      addPicToUserInfo(fileName)
      const photoBlob = await image.blob();
      const ext = photo.substring(photo.lastIndexOf("."+1))
       let formData = new FormData()
        formData.append("files",{
            uri: photo,
            fileName,
            type: `image/${ext}`
        })
        Storage.configure({ region: "us-east-1" });
      let response = await Storage.put(fileName, photoBlob, {
        // level: 'private',
        contentType: 'image/jpg'
      })
    } catch (err) {
      console.log('error creating image:', err)
    }
     navigation.getParent()?.setOptions({
                tabBarStyle: {
                    display: "block",
                    backgroundColor: "#121212",
                    borderTopColor: 'black'
      }})
    navigation.navigate('AccountPage', {photo})
  }
 
     
     return (
   
      
         <SafeAreaView style={styles.container}>
             <StatusBar
         barStyle={'light-content'}
         backgroundColor={backgroundStyle.backgroundColor}/>
        {photo ? <View style={styles.container}>
        {/* <Button title="Discard" onPress={() => setPhoto(undefined)} /> */}
         <TouchableOpacity
          onPress={() => setPhoto(undefined)}>
              <View style={{marginLeft: 20, marginTop:20, marginBottom:10}}>
                  <Ionicons name="close" size={35} color="white" />
              </View>
          </TouchableOpacity>
          <Image style={styles.preview} source={{ uri: photo }} />
          <TouchableOpacity
          onPress={() => uploadPicToS3()}>
              <View style={{marginTop:10, marginBottom:10, marginLeft:20,flexDirection: 'row-reverse'}}>
                  <Ionicons name="ios-arrow-forward-circle" size={45} color="white" />
              </View>
          </TouchableOpacity>
        </View> :
         <Camera style={styles.container} ref={cameraRef} type={type}>
             <View style={{flexDirection:'row', padding:20, justifyContent:'space-between'}}>
                 <TouchableOpacity
                    onPress={() => {navigation.navigate('AccountPage')
                    navigation.getParent()?.setOptions({
                tabBarStyle: {
                    display: "block",
                    backgroundColor: "#121212",
      }
    });}
          }>
                  <Ionicons name="close" size={35} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
          onPress={() =>{
              setType(type === Camera.Constants.Type.back? Camera.Constants.Type.front : 
                Camera.Constants.Type.back)
          }}>
                  <Ionicons name="camera-reverse" size={35} color="white" />
          </TouchableOpacity>
           </View>
          <TouchableOpacity
          onPress={() =>takePic()}>
              <View style={{alignItems:'center',marginTop:'140%'}}>
                  <Ionicons name="radio-button-on" size={105} color="white" />
              </View>
          </TouchableOpacity>

      <StatusBar style="auto" />
    </Camera>
        }
      </SafeAreaView>
     
    
         
     );
     
   };
   export default CameraScreen;