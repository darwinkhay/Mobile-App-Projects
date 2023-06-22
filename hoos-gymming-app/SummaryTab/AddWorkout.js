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
    import
 MaterialCommunityIcons
from 'react-native-vector-icons/MaterialCommunityIcons';
 import { DataStore } from 'aws-amplify';
import { User } from '../src/models';

   import {UserContext, IdContext} from '../context/UserContext'
   import styles from '../styles/styles.js'
import { useEffect } from 'react';
   
   const AddWorkout = ({ navigation, route }) => {
    const {id, setId} = useContext(IdContext)
    const todayDate = new Date()
    const formattedDate = (todayDate.getMonth() + 1) + '-' + todayDate.getDate() + '-' +  todayDate.getFullYear();
    const [exerciseName, setExerciseName] = useState("")
    const [newCalories, setCalories] = useState("")
    const [newTime, setTime] = useState("")
    const [message, showMessage] = useState(false)
    const [calorieCount, setCalorieCount] = useState(0)
    const [timeCount, setTimeCount] = useState(0)

     const isDarkMode = useColorScheme() === 'dark';
 
     const backgroundStyle = {
         backgroundColor: isDarkMode ?  "#FFFFFF" : "#dae1f7"
     };

 useEffect(() => {
        let countC = 0
        let countT = 0
        route.params.currentUser.workout_history[formattedDate].workouts.map(item =>{
            countC += parseInt(item.calories)
            countT += parseInt(item.time)
        })
        setCalorieCount(countC)
        setTimeCount(countT)
  }, []);

   async function addSpecificWorkout(newExercise) {
  const original = await DataStore.query(User, id);
  await DataStore.save(
    User.copyOf(original, updated => {
      updated.workout_history[formattedDate].workouts.push(newExercise)
      updated.workout_history[formattedDate].total_calories = calorieCount + parseInt(newCalories)
      updated.workout_history[formattedDate].total_time = timeCount + parseInt(newTime)
    })
  );
}
          
async function saveChanges() {
    const newExercise = {
        calories: newCalories,
        name: exerciseName,
        time: newTime
    }
    if (exerciseName=="" || newCalories==="" || newTime===""){
        showMessage(true)
    } else {
         addSpecificWorkout(newExercise)
         showMessage(false)
        navigation.navigate('Details')
    }
    }
     
     return (
   
      
         <SafeAreaView style={styles.sectionContainer}>
         <StatusBar
         barStyle={'light-content'}
         backgroundColor={backgroundStyle.backgroundColor}
 
         />
         <View style={{marginTop:30}}></View>
         <Text style={styles.textWhite}>Name of Exercise:</Text>
              <TextInput
                style={styles.textInput2}
                placeholder="ex: Squats"
                onChangeText={item => setExerciseName(item)}
                value={exerciseName}
                placeholderTextColor="#8c8b8b"
            />
            <Text style={styles.textWhite}>Calories Burned:</Text>
             <View style={{flexDirection:"row"}}>
                  <MaterialCommunityIcons style={{paddingLeft:10, paddingTop:10, marginLeft:25}} name="fire" size={30} color="white"/>
                   <TextInput
                style={styles.textInput2}
                placeholder="ex: 157"
                keyboardType='numeric'
                onChangeText={item => setCalories(item)}
                value={newCalories}
                maxLength={4} 
                placeholderTextColor="#8c8b8b"
            />
              </View>
           
            <Text style={styles.textWhite}>Minutes Exercised:</Text>
            <View style={{flexDirection:"row"}}>
                  <MaterialCommunityIcons style={{paddingLeft:10, paddingTop:10, marginLeft:25}} name="clock-time-eight-outline" size={30} color="white"/>
                   <TextInput
                style={styles.textInput2}
                placeholder="ex: 24"
                keyboardType='numeric'
                onChangeText={item => setTime(item)}
                value={newTime}
                maxLength={3} 
                placeholderTextColor="#8c8b8b"
            />
              </View>
             {message ? <Text 
                    style={{color: '#86CBF6', textAlign: 'center', fontSize: 15}}         
            > * All fields are required. * </Text> : ""}
              <TouchableOpacity  
                style={styles.button}            
                onPress={() => {
                    saveChanges()
                    }}><Text 
                    style={styles.buttonText}

            > SAVE </Text>
             </TouchableOpacity>
      </SafeAreaView>
     
    
         
     );
     
   };
   export default AddWorkout;