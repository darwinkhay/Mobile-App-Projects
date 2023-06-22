/**
 * https://callstack.github.io/react-native-paper/card.html (react native card)
 */
import React, {useState, useContext, useEffect} from 'react';
import {UserContext, IdContext} from '../context/UserContext'
import uuid from 'react-uuid';

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

import { Avatar, Card, Title, Paragraph } from 'react-native-paper';
import { DataStore } from '@aws-amplify/datastore';
import { User } from '../src/models';
import styles from '../styles/styles.js'

 import
 MaterialCommunityIcons
from 'react-native-vector-icons/MaterialCommunityIcons';
   
   const WorkoutHistory = ({ navigation, route }) => {
 
     const isDarkMode = useColorScheme() === 'dark';
    const {user, setUser} = useContext(UserContext)
    const todayDate = new Date()
    const formattedDate = (todayDate.getMonth() + 1) + '-' + todayDate.getDate() + '-' +  todayDate.getFullYear();
    const {id, setId} = useContext(IdContext)
     const [currentUser, setCurentUser] = useState(route.params)
     const [allDates, setAllDates] = useState([])
     const weekday = ["SUNDAY","MONDAY","TUESDAY","WEDNESDAY","THURSDAY","FRIDAY","SATURDAY"];
    useEffect(() => {
    let keys = Object.keys(currentUser.workout_history)
    setAllDates(keys.reverse())
  }, []);

  const convertDate = (dateToTransform) => {
      const changeFormat = dateToTransform.replace('-','/')
      const newDate = new Date(changeFormat.replace('-','/'))
      return newDate.toLocaleString('en-US', {month:'long'}) + " " + newDate.getDate() + ", " + newDate.getFullYear()
  }
 
     
     return (
   
      
      <SafeAreaView style={styles.sectionContainer}>
         <StatusBar
        barStyle={'light-content'}
         />

         <ScrollView><View >
             {
                 allDates.map((date,i) => (
                     currentUser.workout_history[date].workouts.length === 0 ? 
                     <View key={uuid()}>
                          <Title key={uuid()} style={{color: 'white', marginTop: 20, fontWeight: 'bold', fontSize:23, marginBottom:7}}>{convertDate(date)}</Title>
                      <Card key={uuid()} style={{backgroundColor: '#202020', marginBottom: 5}}>
                     <Card.Content key={uuid()} style={{backgroundColor: '#202020', borderRadius: 10}}>
                         <View key={uuid()} style={{justifyContent:'center',alignItems:'center'}}>
                     <MaterialCommunityIcons
                            name="emoticon-sad-outline"
                            color="white"
                            size={50}
                            style={{padding:10}}
                            key={uuid()}
                        />
                  <Text key={uuid()} style={{fontSize: 20, color: 'white'}}>You didn't do exercise this day!</Text>
                  </View>
                     </Card.Content>
                      </Card>
                      </View>
                     :
                     <View key={uuid()}>
                          <Title key={uuid()} style={{color: 'white', marginTop: 20, fontWeight: 'bold', fontSize:23, marginBottom:7}}>{convertDate(date)}</Title>
                     <Card key={uuid()} style={{backgroundColor: '#202020', marginBottom: 5}}>
                          <Card.Content >
                     <Title key={uuid()} style={{color: 'white', fontSize: 21}}>{currentUser.workout_history[date].name}</Title>  
                <View key={uuid()} style={{flexDirection:"row", justifyContent:'space-between', marginTop:3}}> 
                <Paragraph key={uuid()} style={{color: '#86CBF6', fontSize: 20}}>
                  {currentUser.workout_history[date].total_calories}{' '}
                  <Text style={{fontSize: 17, color: '#86CBF6'}}>CALORIES</Text> 
                </Paragraph>
                <Paragraph key={uuid()} style={{color: '#86CBF6', fontSize: 20, marginBottom:7}}>
                  {currentUser.workout_history[date].total_time}{' '}
                  <Text key={uuid()} style={{fontSize: 17, color: '#86CBF6'}}>MINUTES</Text>
                </Paragraph>
                </View>
      
                  {currentUser.workout_history[date].workouts.map((item,index)=>
                  (
                      <View key={uuid()} style={{flexDirection:"row", justifyContent:'space-between'}}>
                          <Paragraph key={uuid()} style={{color: 'white', fontSize:16,}}> {index+1}. {item.name.substring(0,28)} </Paragraph>
                          <Paragraph key={uuid()} style={{color: 'white', fontSize:15,}}> {item.calories} CAL / {item.calories} MIN </Paragraph>
                      </View>
                  )
                  )}
              </Card.Content>
              </Card>
              </View>
                 ))
             }
             </View>
             </ScrollView>
      </SafeAreaView>
     
         
     );
     
   };
   export default WorkoutHistory;