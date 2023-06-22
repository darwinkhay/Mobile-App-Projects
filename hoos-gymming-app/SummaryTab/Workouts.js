/**
 * https://callstack.github.io/react-native-paper/touchable-ripple.html (touchable ripple)
 */
import React, {useState, useEffect, useContext} from 'react';
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
     TextInput,     
     Image
    
   } from 'react-native';
import { Card, Paragraph, Title, Button, TouchableRipple } from 'react-native-paper';

 import { DataStore } from '@aws-amplify/datastore';
import { User } from '../src/models';
   import styles from '../styles/styles.js'
    import
 MaterialCommunityIcons
from 'react-native-vector-icons/MaterialCommunityIcons';
   
   const Workouts = ({ navigation, route }) => {
    const {id, setId} = useContext(IdContext)
    const [name, setName] = useState("")
    const todayDate = new Date()
    const formattedDate = (todayDate.getMonth() + 1) + '-' + todayDate.getDate() + '-' +  todayDate.getFullYear();
    const [currentUser, setCurentUser] = useState({})
         useEffect(() => {
    //query the initial user and subscribe to data updates
    const subscription = DataStore.observeQuery(User).subscribe((snapshot) => {
      //isSynced can be used to show a loading spinner when the list is being loaded. 
      const { items, isSynced } = snapshot;
    for (let i = 0; i < items.length; i++) {
                if ( items[i].id === id ){
                    setCurentUser(items[i])
                    if (items[i].workout_history){
                      if (items[i].workout_history[formattedDate]){
                      setName(items[i].workout_history[formattedDate].name)
                    } 
                    }
                    break;
                } 
            } 
    });
    //unsubscribe to data updates when component is destroyed so that you don’t introduce a memory leak.
    return function cleanup() {
      subscription.unsubscribe();
    }
  }, [name]);
 
  async function updateWorkoutName(newName) {
    setName(newName)
  const original = await DataStore.query(User, id);
  await DataStore.save(
    User.copyOf(original, updated => {
      updated.workout_history[formattedDate].name = newName
    })
  );
}
     const isDarkMode = useColorScheme() === 'dark';
 
     const backgroundStyle = {
         backgroundColor: isDarkMode ?  "#FFFFFF" : "#dae1f7"
     };
     
     return (
   
      
         <SafeAreaView style={styles.sectionContainer}>
         <StatusBar
         barStyle={'light-content'}
         backgroundColor={backgroundStyle.backgroundColor}
 
         />
         <ScrollView>
             <Title style={{color: 'white', fontSize: 17, marginTop:15, marginLeft:1}}>Today's Workout:</Title>
             <Card style={{backgroundColor: '#202020'}}>
              <Card.Content>
              {/* <TextInput
                style={styles.textInput2}
                placeholder="Ex: Back & Biceps Day!!"
                placeholderTextColor= '#b0afaf'
                onChangeText={item => setName(item)}
                value={name}
            /> */}
            <Title style={{color: 'white',  fontSize:20}} onPress={() => 
            Alert.prompt(
      "Enter Workout Name",
      "",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "OK",
          onPress: text => updateWorkoutName(text)
        }
      ]
    )}>{currentUser.workout_history && currentUser.workout_history[formattedDate].name !== ""
    ? currentUser.workout_history[formattedDate].name: <Title style={{color: '#8c8b8b', fontSize: 20}}>
                  Ex: Back & Biceps Day! Click to Edit
                </Title>}</Title>
              </Card.Content>
             </Card>
            <Title style={{color: 'white', marginTop: 10, fontWeight: 'bold', fontSize:23, marginBottom: 7}}>Workouts</Title>
            {currentUser.workout_history && currentUser.workout_history[formattedDate].workouts.length !== 0? 
            currentUser.workout_history[formattedDate].workouts.map((item,index)=>
                  (
                      <Card key={uuid()} style={{backgroundColor: '#202020', marginBottom:17}} onPress={() => navigation.navigate('Edit', { item, index, currentUser })}>
                    <Card.Content>
                      <Card.Actions>
              </Card.Actions>
              <View key={uuid()} style={{flexDirection:"row", justifyContent:'space-between'}}>
                 <Paragraph key={uuid()} style={{color: 'white', fontSize:20, marginBottom:7}}> {index+1}. {item.name} </Paragraph>
                <TouchableOpacity key={uuid()} onPress={() => navigation.navigate('Edit', { item, index, currentUser })}>
                  <MaterialCommunityIcons name="pencil" size={22} color="#86CBF6"/></TouchableOpacity>
              </View>
                <View key={uuid()} style={{flexDirection:"row", justifyContent:'space-between', marginTop:3}}> 
                <Paragraph key={uuid()} style={{marginLeft: 20}}>
                  <Text key={uuid()} style={{fontSize: 17, color: 'white', fontWeight: 'bold'}}>Calories</Text> 
                </Paragraph>
                <Paragraph key={uuid()} style={{marginRight: 42}}>
                  <Text style={{fontSize: 17, color: 'white' ,fontWeight: 'bold'}}>Time</Text>
                </Paragraph>
                </View>
                <View key={uuid()} style={{flexDirection:"row", justifyContent:'space-between', marginTop:3}}> 
                <Paragraph style={{color: 'white', fontSize: 17, marginLeft: 20}}>
                  {item.calories}
                </Paragraph>
                <Paragraph key={uuid()} style={{color: 'white', fontSize: 17, marginBottom:1, marginRight: 42}}>
                  {item.time} min
                </Paragraph>
                </View>

              </Card.Content>
               </Card>
                  )
                  ) : 
                  <Card style={{backgroundColor: '#202020'}}>
              <Card.Content> 
                  <View style={{justifyContent:'center',alignItems:'center'}}>
                  <Text style={{fontSize: 20, color: 'white'}}>Let's get started!</Text>
                  <Image style={{flex: 1, width: 50, height: 50, opacity: 0.85, resizeMode: 'contain', tintColor: 'white',
                   marginTop:7,marginBottom:7}} source={require("../assets/exercise.png")}/>
                  <Text style={{fontSize: 20, color: 'white'}}>Add workouts below!</Text>
                  </View>
                  </Card.Content>
              </Card>
            }
            
             <Text>{'\n'}</Text>
              <TouchableOpacity  
                style={styles.button2}            
                onPress={() => {
                  navigation.navigate('Add', {currentUser})
                    }}><Text 
                    style={styles.buttonText}

            > + Add Workout </Text>
             </TouchableOpacity>
          <Text>{'\n'}</Text>
          <Title style={{textAlign: 'center', color: '#86CBF6', fontWeight: 'bold'}}>Total Calories:                  Total Time:</Title>
          {currentUser.workout_history ? 
          <View style={{flexDirection:"row", justifyContent:'space-between', marginTop:3}}> 
          <Title style={{margin:'auto', color: '#86CBF6', marginLeft:'16%'}}>{currentUser.workout_history[formattedDate].total_calories} calories</Title>
          <Title style={{margin:'auto', color: '#86CBF6', marginRight: '12%'}}>{currentUser.workout_history[formattedDate].total_time} minutes</Title>
            </View>
          : ''
          }

          </ScrollView>
      </SafeAreaView>
     
        
 
         
         
    
         
     );
     
   };
   export default Workouts;