import React, {useState, useEffect, useContext} from 'react';

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
     TextInput
     
    
   } from 'react-native';

import { DataStore } from 'aws-amplify';
import { User } from '../src/models';
import {UserContext,IdContext} from '../context/UserContext'
import styles from '../styles/styles.js'
   
   const Login = ({ navigation, route }) => {
       const [firstName, setFirstName] = useState("");
       const [lastName, setLastName] = useState("");
       const [email, setEmail] = useState("");
       const [password, setPassword] = useState("")
       const [message, showMessage] = useState(false)
       const [emailMessage, showEmailMessage] = useState(false)
       const {user, setUser} = useContext(UserContext)
       const {id, setId} = useContext(IdContext)
       const todayDate = new Date()
       const formattedDate = (todayDate.getMonth() + 1) + '-' + todayDate.getDate() + '-' +  todayDate.getFullYear();
 
     const isDarkMode = useColorScheme() === 'dark';
 
     const backgroundStyle = {
         backgroundColor: isDarkMode ?  "#FFFFFF" : "#dae1f7"
     };
 
     const workoutHistory = {
         [formattedDate] : {
             name: "",
             total_calories: 0,
             total_time: 0,
             workouts: []
         }
     }
     
async function saveChanges() {
          if (firstName && lastName && email && password){
            const models = await DataStore.query(User);

            for (let i = 0; i < models.length; i++) {
                if ( models[i].email === email){
                    showEmailMessage(true)
                    break;
                }
            } 
            if (!emailMessage) {
                let newData = await DataStore.save(new User({ firstName, lastName, email, password, workout_history: workoutHistory }));
                setUser(firstName)
                setId(newData.id)
                

            }
            showMessage(false)
         } else {
             showMessage(true)
             showEmailMessage(false)
         }
    }
    

     return (
   
      
         <SafeAreaView style={styles.sectionContainer}>
         <StatusBar
         barStyle={'light-content'}
         backgroundColor={backgroundStyle.backgroundColor}
 
         />
             <Text style={{fontSize: 45, color: '#86CBF6', textAlign: 'center', marginBottom: 30,
             fontFamily: 'Thonburi-Bold', marginTop: '40%'}}>HOO'S GYMMING</Text>
            <TextInput
                style={styles.textInput}
                placeholder="First Name"
                onChangeText={name => setFirstName(name)}
                value={firstName}
            />
            <TextInput
                style={styles.textInput}
                placeholder="Last Name"
                onChangeText={name => setLastName(name)}
                value={lastName}
            />
            <TextInput
                style={styles.textInput}
                placeholder="Email"
                onChangeText={item => setEmail(item)}
                value={email}
            />
            <TextInput
                style={styles.textInput}
                placeholder="Password"
                 secureTextEntry={true}
                onChangeText={item => setPassword(item)}
                value={password}
            />
             {message ? <Text 
                    style={{color: '#86CBF6', textAlign: 'center', fontSize: 15}}         
            > * All fields are required. * </Text> : ""}
             {emailMessage ? <Text 
                    style={{color: '#86CBF6', textAlign: 'center', fontSize: 15}}         

            > Account with this email already exists </Text> : ""}
        <TouchableOpacity  
                style={styles.button}            
                onPress={() => {
                    saveChanges()
                }}
                    ><Text 
                    style={styles.buttonText}

            > SIGN UP </Text>
             </TouchableOpacity>
            
             <TouchableOpacity  
                onPress={
              () => navigation.navigate('Login')
             }><Text 
                    style={{color: '#86CBF6', textAlign: 'center', fontSize: 17}}         

            > Already have an account? Log in </Text>
             </TouchableOpacity>
      </SafeAreaView>
     
    
         
     );
     
   };
   export default Login;