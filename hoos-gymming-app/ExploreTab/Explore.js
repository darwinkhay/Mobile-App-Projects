
import React, {useState, useEffect} from 'react';

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
     Image,
     ImageBackground
     
    
   } from 'react-native';

 
 import {Button, Card, Title} from 'react-native-paper';
   
import styles from '../styles/styles.js'



   
   const Explore = ({ navigation, route }) => {
 
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
         <ScrollView  showsVerticalScrollIndicator={false}>
         <TouchableOpacity onPress={() => navigation.navigate('Gyms')} style={{marginTop: 60}}>
         <Image style={{flex: 1, width: '95%', height:120, opacity: 0.55, alignSelf:'center', borderRadius: 15}} source={require("../assets/explore-gym-button.jpg")}/>
         <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
            <Title style={{color: 'white', fontWeight: 'bold', fontSize: 24}}>Find Nearby Gyms →</Title>
        </View>
         </TouchableOpacity>
        <Text>{'\n'}{'\n'}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Restaurants')} style={{marginTop: 10}}>
         <Image style={{flex: 1, width: '95%', height:120, opacity: 0.55, alignSelf:'center', borderRadius: 15}} source={require("../assets/explore-restaurant-button.jpg")}/>
         <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
            <Title style={{color: 'white', fontWeight: 'bold', fontSize: 24}}>Find Restaurants →</Title>
        </View>
         </TouchableOpacity>
         <Text>{'\n'}{'\n'}</Text>
         
         <TouchableOpacity onPress={() => navigation.navigate('Recipes')} style={{marginTop: 10}}>
         
         <Image style={{flex: 1, width: '95%', height:120, opacity: 0.55, alignSelf:'center', borderRadius: 15}} source={require("../assets/explore-recipe-button.jpg")}/>
         <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
            <Title style={{color: 'white', fontWeight: 'bold', fontSize: 24}}>Browse Healthy Recipes →</Title>
        </View>
        
         
         </TouchableOpacity>
        </ScrollView>
        
       
             
      </SafeAreaView>
     
    
         
     );
     
   };
   export default Explore;