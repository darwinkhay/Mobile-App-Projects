/**
 * Sources:
 * https://reactnative.dev/docs/tutorial (how to use props with components)
 * https://betterprogramming.pub/using-moment-js-in-react-native-d1b6ebe226d4 (moment.js for date formatting)
 * https://stackoverflow.com/questions/61054425/add-items-to-flatlist-dynamically-in-react-native (dynamic flatlist)
 * https://stackoverflow.com/questions/51742856/sorting-react-native-flatlist (sorting a flatlist)
 * https://bobbyhadz.com/blog/react-update-object-in-array (update item in array)
 * https://stackoverflow.com/questions/70444152/removing-objects-from-array-with-the-click-of-a-button-react (remove item from array)
 * 
 * 
 */
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
     
    
   } from 'react-native';
   import { Button, Title } from 'react-native-paper';
   import {
     Colors,
   } from 'react-native/Libraries/NewAppScreen';
 
   import moment from 'moment';
 
   import styles from '../styles/styles.js'
   import BucketListItem from '../components/bucketlistitem.js';
import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';
   
   const Home = ({ navigation, route }) => {
 
     const isDarkMode = useColorScheme() === 'dark';
 
     const backgroundStyle = {
         backgroundColor: isDarkMode ?  Colors.darker : Colors.lighter
     };
     var initialBucketList =[
         {id: Math.random(), title: 'Streak the lawn', desc: 'streak the lawn and make sure everyone watches in broad daylight', date: new Date('1/18/2022'), completed: true, completionDate: new Date('2/22/2022'), prepopulated: true},
         {id: Math.random(), title: 'Drink 20 shots', desc: 'make sure that the alcohol content is at least 20%', date: new Date('5/23/2022'), completed: false, completionDate: new Date()},
         {id: Math.random(), title: 'Not cry', desc: 'just dont cry for any reason, everything will be ok...', date: new Date('7/6/2022'), completed: false, completionDate: new Date()},
         {id: Math.random(), title: 'Be happier', desc: 'be happy because of what you already have', date: new Date('6/1/2022'), completed: true, completionDate: new Date('7/12/2022'), prepopulated: true}
     ]
     const [bucketListState, setBucketListState] = useState(initialBucketList);
 
     const addBucketItem=()=>{
     
         var newBucketList = [...bucketListState, route.params]
         
         setBucketListState(newBucketList)
         
         
     }
     const updateBucketItem=()=>{
         const newBucketList = bucketListState.map(item =>{
            
             if(item.id == route.params.id){
                 return route.params
                 
             } 
             
             return item
             
         
             
             
         });
         setBucketListState(newBucketList)
         
      
         
         
       
     }
     const removeItem=()=>{
         const newBucketList = bucketListState.filter((item) => item.id != route.params.id);
         
         setBucketListState(newBucketList);
     }
     function sortTheArray(a,b){
         if(a.completed && !b.completed){
             return 1
         } else if(!a.completed && b.completed){
             return -1
         } else if(!a.completed && !b.completed){
             return moment(a.date).format('YYYY/MM/DD').localeCompare(moment(b.date).format('YYYY/MM/DD'))
         } else if(a.completed && b.completed){
            return moment(a.completionDate).format('YYYY/MM/DD').localeCompare(moment(b.completionDate).format('YYYY/MM/DD'))
         }
         
     }
     
     useEffect (() => {
        
         if(route.params !== undefined && route.params.itemInfo === false){
             
             addBucketItem();
             
         } else if(route.params !== undefined && route.params.itemInfo === true){
             
             updateBucketItem();
         } else if(route.params !== undefined && route.params.checkbox === true){
             
            updateBucketItem();
         } else if(route.params !== undefined && route.params.delete ===true){
             removeItem();
         }
         
     }, [route.params]);
     
 
     
     return (
   
      
         <SafeAreaView style={styles.sectionContainer}>
         <StatusBar
         barStyle={isDarkMode ? 'light-content' : 'dark-content'}
         backgroundColor={backgroundStyle.backgroundColor}
 
         />
             <FlatList
             showsVerticalScrollIndicator={false}
             data={bucketListState.sort((a,b) =>  sortTheArray(a,b))}
             renderItem = {
               
                
                 ({item}) => <BucketListItem id={item.id} name={item.title} desc={item.desc} dueDate={moment(item.date).format('MM/DD/YYYY')} completed={item.completed} completionDate={item.completionDate} prepopulated={item.prepopulated}/>
             }
           
             />
             
         
             
 
       
 
              <Button style={{paddingLeft: 15, marginHorizontal: 50, marginTop: 25, paddingVertical: 15}} icon='pail-plus' mode='contained-tonal' dark buttonColor='#69cbf5' onPress={
                 () => navigation.navigate('Create a Bucket List Item')}></Button>
      </SafeAreaView>
     
        
 
         
         
    
         
     );
     
   };
   export default Home;
  