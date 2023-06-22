import React, {useState, useContext} from 'react';

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

   import {UserContext, IdContext} from '../context/UserContext'
   import styles from '../styles/styles.js'
import { useEffect } from 'react';
   
   const Login = ({ navigation, route }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const {user, setUser} = useContext(UserContext)
    const {id, setId} = useContext(IdContext)
    const [accountExists, setAccount] = useState(false)
    const [message, showMessage] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [showError, showErrorMessage] = useState(false)
    const [currentDB, setCurrentDB] = useState({})
    const todayDate = new Date()
    const formattedDate = (todayDate.getMonth() + 1) + '-' + todayDate.getDate() + '-' +  todayDate.getFullYear();


 
     const isDarkMode = useColorScheme() === 'dark';
 
     const backgroundStyle = {
         backgroundColor: isDarkMode ?  "#FFFFFF" : "#dae1f7"
     };

    useEffect(() => {
    const subscription = DataStore.observeQuery(User).subscribe((snapshot) => {
    const { items, isSynced } = snapshot;
    setCurrentDB(items)
    });
    //unsubscribe to data updates when component is destroyed so that you don’t introduce a memory leak.
    return function cleanup() {
      subscription.unsubscribe();
    }
  }, []);

   async function addTodaysWorkoutObj(update_id) {
  const original = await DataStore.query(User, update_id);
  await DataStore.save(
    User.copyOf(original, updated => {
      updated.workout_history[formattedDate] = {
             name: "",
             total_calories: 0,
             total_time: 0,
             workouts: []
         }
    })
  );
}
          
async function saveChanges() {
          if (email && password){
        //    const models = await DataStore.query(User);
            for (let i = 0; i < currentDB.length; i++) {
                if ( currentDB[i].email === email &&  currentDB[i].password === password){
                    setAccount(true)
                    setUser(currentDB[i].firstName)
                    setId(currentDB[i].id)
                    if (!currentDB[i].workout_history[formattedDate]){
                      addTodaysWorkoutObj(currentDB[i].id)
                    }
                    break;
                } else if ( currentDB[i].email === email &&  currentDB[i].password !== password){
                    setAccount(false)
                    setErrorMessage("Incorrect password.")
                    break;
                } else {
                    setAccount(false)
                    setErrorMessage("No existing account with this email.")
                } 
            } 
            if (!accountExists) {
                showErrorMessage(true)
            } 
            showMessage(false)
         } else {
             showMessage(true)
             showErrorMessage(false)
         }
    }
     
     return (
   
      
         <SafeAreaView style={styles.sectionContainer}>
         <StatusBar
         barStyle={'light-content'}
         backgroundColor={backgroundStyle.backgroundColor}
 
         />
              <Text style={{fontSize: 40, color: '#86CBF6', textAlign: 'center', marginBottom: 30,
             fontFamily: 'Thonburi-Bold', marginTop: '50%'}}>HOO'S GYMMING</Text>
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
            {showError ? 
            <Text style={{color: '#86CBF6', textAlign: 'center', fontSize: 15}} >
                {errorMessage}
            </Text> : ""}
              <TouchableOpacity  
                style={styles.button}            
                onPress={() => {
                    saveChanges()
                    }}><Text 
                    style={styles.buttonText}

            > LOG IN </Text>
             </TouchableOpacity>
        
             <TouchableOpacity  
                onPress={
              () => navigation.navigate('SignUp')
             }><Text 
                    style={{color: '#86CBF6', textAlign: 'center', fontSize: 17}}         

            > Don't have an account? Sign up </Text>
             </TouchableOpacity>

      </SafeAreaView>
     
    
         
     );
     
   };
   export default Login;