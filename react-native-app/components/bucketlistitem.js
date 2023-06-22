/**
 * Sources:
 * https://docs.expo.dev/versions/latest/sdk/checkbox/(expo checkbox)
 * https://callstack.github.io/react-native-paper/getting-started.html (react-native-paper)
 * https://callstack.github.io/react-native-paper/card.html (react-native-paper cards)
 * https://github.com/react-navigation/react-navigation/issues/7961 (navigation issues)
 * https://ievgen.de/2021/04/25/swipe-to-delete-react-native/ (swipe to delete)
 * 
 * 
 * 
 */
 import React, {useEffect, useState, useRef} from 'react';
 import {Alert, Animated, Text, View} from 'react-native';
 import {Avatar, Button, Card ,Title, Paragraph} from 'react-native-paper';
 import CheckBox from 'expo-checkbox'
 import styles from '../styles/styles';
 import ItemInfo from '../screens/iteminfo.js';
 import { NavigationContainer, useNavigation } from '@react-navigation/native';
 import {Swipeable, TouchableOpacity} from 'react-native-gesture-handler';
 import moment from 'moment';
 const BucketListItem = (props) => {
     
     const name = "";
     const desc = "";
     const dueDate = "";
     const completed = false;
     const id = "";
    const completionDate = "";
    const prepopulated = "";
     const [isSelected, setSelection] = useState(false);
     const navigation = useNavigation(); 
     function updateCheckbox(){
         //setSelection(!isSelected)
        if(props.completed){
          navigation.navigate('Home', {id: props.id, checkbox: true, title: props.name, desc: props.desc, date: props.dueDate, completed: !props.completed, completionDate: new Date() })

        } else{ 
          
          navigation.navigate('Home', {id: props.id, checkbox: true, title: props.name, desc: props.desc, date: props.dueDate, completed: !props.completed, completionDate: props.completionDate })

        }
         
     }
     const renderRightActions = (
         progress,
         dragAnimatedValue,
       ) => {
         const opacity = dragAnimatedValue.interpolate({
           inputRange: [-125, 0], // -150, 0
           outputRange: [1, 0],
           extrapolate: 'clamp',
         });
         return (
           <View style={styles.swipedRow}>
             {/* <View style={styles.swipedConfirmationContainer}><Text>yo</Text></View> */}
             <Animated.View style={[styles.deleteButton, {opacity}]}>
               <TouchableOpacity onPress={() => removeItem()}>
                 <Text style={styles.deleteButtonText}>Delete</Text>
               </TouchableOpacity>
             </Animated.View>
           </View>
         );
       };
       const removeItem = () =>{
         
 
     
     
         navigation.navigate('Home', {id: props.id, delete: true, title: props.name, desc: props.desc, date: props.dueDate, completed: props.completed })
         
     
     }
       
     
     return(
         <View style={styles.container}>
             <View style={styles.checkboxContainer}>
 
                 <Swipeable renderRightActions={renderRightActions}>
                     
                 <Card mode="contained" style={{width: 350, padding: 10, height: 160, borderTopLeftRadius: 25, borderBottomLeftRadius: 25, backgroundColor: 'white'}} onPress={() =>navigation.navigate('Item Info', {id: props.id, title: props.name, desc: props.desc, date: props.dueDate, completed: props.completed, completionDate: props.completionDate, prepopulated: props.prepopulated})}>
                 
                     <Card.Title titleStyle={{fontSize: 22, fontWeight: 'bold'}} title={props.name}/>
                     
                     <Card.Content>
                         
                         <Paragraph style={{fontSize: 18}}>{props.desc}{'\n'}</Paragraph>
                         
                          <Text style={{fontSize: 15}}>Due Date: {props.dueDate}</Text>
                          
                     </Card.Content>

                     <Card.Actions>
                     <Text>{props.completed ? `COMPLETED ON: ${moment(props.completionDate).format('MM/DD/YYYY')}` : "" }</Text>
                         <CheckBox
                                 color={'#f5b576'}
                                 value={props.completed}
                                 onValueChange={
                                     updateCheckbox
                                 }
                                 style={styles.checkbox}
                             />
                     
                     </Card.Actions>
                     
                    
 
                 </Card>
                 </Swipeable>
                 
                 
                 
 
            
                 
                 
             </View>
         </View>
 
         
     );
     
 }
 export default BucketListItem;