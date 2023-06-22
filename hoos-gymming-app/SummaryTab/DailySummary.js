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

import { useIsFocused } from '@react-navigation/native';
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';
import { DataStore } from '@aws-amplify/datastore';
import { User } from '../src/models';
import styles from '../styles/styles.js'

   
   const DailySummary = ( { navigation, route }) => {
  const isFocused = useIsFocused();
     const isDarkMode = useColorScheme() === 'dark';
    const {user, setUser} = useContext(UserContext)
    const todayDate = new Date()
    const formattedDate = (todayDate.getMonth() + 1) + '-' + todayDate.getDate() + '-' +  todayDate.getFullYear();
    const {id, setId} = useContext(IdContext)
     const [currentUser, setCurentUser] = useState({})
     const weekday = ["SUNDAY","MONDAY","TUESDAY","WEDNESDAY","THURSDAY","FRIDAY","SATURDAY"];
     const [recipe, setRecipe] = useState()

    useEffect(() => {
      fetch('https://api.spoonacular.com/recipes/random?number=1&tags=lunch&apiKey=960e541de5f54e48b9e7c1a7075e5719')
	.then(response => response.json())
	.then(response => setRecipe(response))
	.catch(err => console.error(err));
  
  getUserInfo()
  }, []);

  
  const getUserInfo = () =>{
    //query the initial user and subscribe to data updates
    const subscription = DataStore.observeQuery(User).subscribe((snapshot) => {
      //isSynced can be used to show a loading spinner when the list is being loaded. 
      const { items, isSynced } = snapshot;
      if (id === ""){
        setCurentUser(items[items.length-1])
      } else {
         for (let i = 0; i < items.length; i++) {
                if ( items[i].id === id ){
                    setCurentUser(items[i])
                    break;
                } 
            } 
      }
    });
    //unsubscribe to data updates when component is destroyed so that you don’t introduce a memory leak.
    return function cleanup() {
      subscription.unsubscribe();
    }
    
  }
     
     return (
   
      
      <SafeAreaView style={styles.sectionContainer}>
         <StatusBar
        barStyle={'light-content'}
         />
         <ScrollView>
           <View >
           <Text style={{color: '#b0afaf', marginTop:15, marginLeft:1
          }}>{weekday[todayDate.getDay()]}, {todayDate.toLocaleString('en-US', {month:'short'}).toLocaleUpperCase()}{' '}
           {todayDate.getDate()}</Text>
             <Title style={{color: 'white', fontSize:28, marginTop: 8, marginBottom: 13}}>Welcome
             <Text style={{fontWeight: 'bold'}}>{' '}{currentUser.firstName ? currentUser.firstName : user}{'!'}</Text></Title>

             <Text style={{color: 'white', marginBottom: 3, fontSize: 17}}>Here's a recipe for you...</Text>
             <Card style={{backgroundColor: '#202020'}}>
              <Card.Content>
                {typeof recipe !== 'undefined' && recipe  ? <View style={{flexDirection:"row", justifyContent:'space-between'}}> 
                <Image source={{uri: recipe.recipes[0].image}}
                   style={{width: 100, height: 67, marginRight: 15}} />
                <Title style={{color: 'white', fontWeight:'bold', flexWrap:'wrap', marginRight: 15, maxWidth:220, justifyContent:'left'}}>{recipe.recipes[0].title}</Title>
                </View> 
                :''
                }
              </Card.Content>
             
             </Card>
             <TouchableOpacity  
                onPress={
              () => navigation.navigate('Recipe', recipe)}><Text 
                    style={{color: '#86CBF6', textAlign: 'right', fontSize: 17, marginTop:7, marginRight:5}}         

            > See More → </Text>
             </TouchableOpacity>
             <Title style={{color: 'white', marginTop: 20, fontWeight: 'bold', fontSize:24, marginBottom:7}}>Workout Progress</Title>
                {/* {currentUser.workout_history && currentUser.workout_history[formattedDate]?  */}
              <Card style={{backgroundColor: '#202020'}}>
                {currentUser.workout_history && currentUser.workout_history[formattedDate].workouts.length !== 0? 
                 <Card.Content>
                   { 
                     currentUser.workout_history[formattedDate].name === ""? 
                     <Title style={{color: 'white', fontSize: 15}}>*Be sure to add a workout name*</Title>: 
                     <Title style={{color: 'white', fontSize: 22, marginBottom:9}}>{currentUser.workout_history[formattedDate].name}</Title>
                   }
                
                <View style={{flexDirection:"row", justifyContent:'space-between', marginTop:3}}> 
                <Paragraph style={{color: '#86CBF6', fontSize: 22}}>
                  {currentUser.workout_history[formattedDate].total_calories}{' '}
                  <Text style={{fontSize: 19, color: '#86CBF6'}}>CALORIES</Text> 
                </Paragraph>
                <Paragraph style={{color: '#86CBF6', fontSize: 22, marginBottom:7}}>
                  {currentUser.workout_history[formattedDate].total_time}{' '}
                  <Text style={{fontSize: 19, color: '#86CBF6'}}>MINUTES</Text>
                </Paragraph>
                </View>
      
                  {currentUser.workout_history[formattedDate].workouts.map((item,index)=>
                  (
                     <View key={uuid()} style={{flexDirection:"row", justifyContent:'space-between', padding:3}}>
                          <Paragraph key={uuid()} style={{color: 'white', fontSize:17, maxWidth:170, flexWrap:'wrap'}}> {index+1}. {item.name} </Paragraph>
                          <Paragraph key={uuid()} style={{color: 'white', fontSize:16}}> {item.calories} CAL / {item.calories} MIN </Paragraph>
                      </View>
                  )
                  )} 
              </Card.Content>
                :
                <Card.Content> 
                  <View style={{justifyContent:'center',alignItems:'center'}}>
                  <Text style={{fontSize: 20, color: 'white'}}>Done exercise yet?</Text>
                  <Image style={{flex: 1, width: 50, height: 50, opacity: 0.85, resizeMode: 'contain', tintColor: 'white',
                   marginTop:7,marginBottom:7}} source={require("../assets/exercise.png")}/>
                  <Text style={{fontSize: 20, color: 'white'}}>Add workouts now!</Text>
                  </View>
                  </Card.Content>}
               
             </Card>
             <TouchableOpacity  
                onPress={
              () => navigation.navigate('Details')
             }><Text 
                    style={{color: '#86CBF6', textAlign: 'right', fontSize: 17, marginTop:7, marginRight:5}}         

            > See More → </Text>
             </TouchableOpacity>
             </View>
             </ScrollView>
      </SafeAreaView>
     
        
 
         
         
    
         
     );
     
   };
   export default DailySummary;