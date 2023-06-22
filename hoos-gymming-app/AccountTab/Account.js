import React, {useState, useEffect, useContext} from 'react';
import {Storage} from '@aws-amplify/storage'
import {Auth} from '@aws-amplify/auth'

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
     Image
     
    
   } from 'react-native';

  import { Ionicons } from '@expo/vector-icons'
 import
 MaterialCommunityIcons
from 'react-native-vector-icons/MaterialCommunityIcons';
   
   import styles from '../styles/styles.js'
import { DataStore } from '@aws-amplify/datastore';
import { User } from '../src/models';
import {UserContext, IdContext} from '../context/UserContext'


const Account = ({ navigation, route }) => {
    const {id, setId} = useContext(IdContext)
    const {user, setUser} = useContext(UserContext)
    const [currentUser, setCurentUser] = useState({})
    const [profilePic, setProfilePic] = useState(null)
    const [memberDate, setDate] = useState("")
    

    useEffect(() => { 
    //query the initial user and subscribe to data updates
    const subscription = DataStore.observeQuery(User).subscribe((snapshot) => {
      //isSynced can be used to show a loading spinner when the list is being loaded. 
      const { items, isSynced } = snapshot;
    for (let i = 0; i < items.length; i++) {
                if ( items[i].id === id ){
                    setCurentUser(items[i])
                    getPicFromS3(items[i].member_date)
                    let createdDate = new Date (items[i].createdAt)
                    setDate(createdDate.toLocaleDateString())
                    break;
                } 
            } 
    });
    //unsubscribe to data updates when component is destroyed so that you don’t introduce a memory leak.
    return function cleanup() {
      subscription.unsubscribe();
    }
  }, []);
  async function getPicFromS3(fileName) {
    Auth.configure({
  identityPoolId: 'us-east-1:f943843a-347c-42d5-b4fe-fd3d35f6de57', //REQUIRED - Amazon Cognito Identity Pool ID
  region: 'us-east-1', // REQUIRED - Amazon Cognito Region
})
Storage.configure({
  AWSS3: {
            bucket: 'projectpictures02826-staging', //REQUIRED -  Amazon S3 bucket name
            region: 'us-east-1', //OPTIONAL -  Amazon service region
        }
})
    try {
  
      let response = await Storage.get(fileName)
      setProfilePic(response)
    } catch (err) {
      console.log('error getting image:', err)
    }
  
  }
  
// const models = await DataStore.query(User);
     const isDarkMode = useColorScheme() === 'dark';
 
     const backgroundStyle = {
         backgroundColor: isDarkMode ?  "#FFFFFF" : "#dae1f7"
     };
     
 const LogOutAlert = () =>
    Alert.alert(
      "Log out?",
      "",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => {
            setId("")
            setUser("")
        } }
      ]
    );
     
     return (
   
      
         <SafeAreaView style={styles.sectionContainer2}>
             <StatusBar
         barStyle={'light-content'}
         backgroundColor={backgroundStyle.backgroundColor}
 
         />
         {currentUser.member_date === null ? 
         <View>
          <View style={{borderColor: "white", borderWidth: '1px', width: 140, height: 140, backgroundColor:'#121212', marginTop: 30,
         borderRadius: 140/2, justifyContent: 'center', alignItems:'center'}} 
         onStartShouldSetResponder={() => navigation.navigate('Camera')}>
            <Ionicons
                name="person"
                color="white"
                size={55}
              />
         </View>
         <View style={{flexDirection:"row", margin:10, justifyContent: 'center', borderColor: "#86CBF6", borderWidth: '0.5px', padding: 5, borderRadius: 10}}> 
            <MaterialCommunityIcons
                name="pencil"
                color="#86CBF6"
                size={14}
              />
             <Text onPress={() => navigation.navigate('Camera')} 
             style={{color: '#86CBF6', textAlign: 'center', fontSize: 15, marginLeft: 4}} >
                Add Photo
            </Text>
            </View>
            </View>
         : route.params ? 
         <TouchableOpacity  onPress={() => navigation.navigate('Camera')}>
         <Image style={{width: 140, height: 140,borderRadius: 140/2,  marginTop: 30}} 
         source={{ uri: route.params.photo}} />
         </TouchableOpacity>
         : 
         <TouchableOpacity  onPress={() => navigation.navigate('Camera')}>
           {/* {console.log("profilePic",profilePic)} */}
         <Image style={{width: 140, height: 140,borderRadius: 140/2,  marginTop: 30}} 
         source={{ uri: profilePic}} />
         </TouchableOpacity>
         }
         {currentUser.member_date ? 
         <View style={{flexDirection:"row", margin:10, justifyContent: 'center', borderColor: "#86CBF6", borderWidth: '0.5px', padding: 5, borderRadius: 10}}> 
            <MaterialCommunityIcons
                name="pencil"
                color="#86CBF6"
                size={14}
              />
             <Text onPress={() => navigation.navigate('Camera')} 
             style={{color: '#86CBF6', textAlign: 'center', fontSize: 15, marginLeft: 4}} >
                Change Photo
            </Text>
            </View>
         : ""}
             <Text style={{color: 'white', textAlign: 'center', fontSize: 33, marginTop:5, fontWeight:'bold'}} >
                {currentUser.firstName}{' '}{currentUser.lastName}
            </Text>
            <Text style={{color: 'white', textAlign: 'center', fontSize: 20, marginTop: 6}}>Member since {memberDate}</Text>
            <View style={{flexDirection:"row", margin:10, justifyContent: 'center'}}> 
            <MaterialCommunityIcons
                name="email"
                color="white"
                size={17}
              />
             <Text style={{color: 'white', textAlign: 'center', fontSize: 20, marginLeft: 4}} >
                {currentUser.email}
            </Text>
            </View>
            <View onStartShouldSetResponder={() => navigation.navigate('WorkoutHistory', currentUser)}
            style={{backgroundColor: "#202020", width:'100%', padding: 15, flexDirection:"row", marginTop: 20, marginBottom:20}}>
              <MaterialCommunityIcons
                name="history"
                color="white"
                size={24}
              />
              <Text style={{color:'white', fontSize: 22, marginLeft: 10}}>
                View Workout History
              </Text>
            </View>
             <TouchableOpacity  
                style={styles.button}            
                onPress={() => {
                    LogOutAlert()
                    }}><Text 
                    style={styles.buttonText}

            > LOG OUT </Text>
             </TouchableOpacity>
      </SafeAreaView>
     
    
         
     );
     
   };
   export default Account;