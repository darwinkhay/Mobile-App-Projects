
 /**
  * Sources:
  * https://www.npmjs.com/package/react-native-form-component (react native form component)
  * https://react-hook-form.com/ (react hook form)
  * hhttps://www.npmjs.com/package/@react-native-community/datetimepicker (datepicker)
  * https://reactnative.dev/docs/scrollview#keyboarddismissmode (keyboard dismiss mode and keyboard persists taps)
  * 
  * 
  * 
  */
  import React,{useState} from 'react';


  import {
      SafeAreaView,
      ScrollView,
      StatusBar,
      useColorScheme,
      Text,
      View,
      Button,
      Alert,
      Checkbox,
      TextInput,
      Keyboard,
      KeyboardAvoidingView
    } from 'react-native';
  
    import {
      Colors,
    } from 'react-native/Libraries/NewAppScreen';
  
    import {Form, FormItem, Label} from 'react-native-form-component';
    import {useForm, useController, Controller} from 'react-hook-form';
    import DatePicker, {getFormatedDate} from 'react-native-modern-datepicker';
    import DateTimePicker from '@react-native-community/datetimepicker';
    import moment from 'moment';
    import Home from '../screens/home.js'
    
 
    import styles from '../styles/styles.js'
 
    const TitleInput =({name, control}) => {
     const {field} = useController({
       control,
       defaultValue: '',
       name,
      
     })
 
     return(
       <FormItem
       value={field.value}
       onChangeText={field.onChange}
   
       />
     );
     };
 
     const DescInput =({name, control}) => {
       const {field} = useController({
         control,
         defaultValue: '',
         name,
        
       })
       
       return(
         <FormItem
         value={field.value}
         onChangeText={field.onChange}
         textArea
         />
       );
     };
 
 
    const CreateItem = ({ navigation, route }) => {
  
      const isDarkMode = useColorScheme() === 'dark';
  
      const backgroundStyle = {
          backgroundColor: isDarkMode ?  Colors.darker : Colors.lighter
      };
   
      const {control, handleSubmit} = useForm();
      const [theduedate, setDate] = useState(new Date())
      
      const changeTheDate = (event, selectedDate) => {
        setDate(selectedDate)
      }
      const onSubmit = (data) => navigation.navigate('Home', {itemInfo: false, id: Math.random(), title: data.Title, desc: data.Description, date: theduedate, completed: false, completionDate: new Date()})
      
      return (
          <SafeAreaView style={styles.sectionContainer2}>
              <StatusBar
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
              backgroundColor={backgroundStyle.backgroundColor}
          
              />
              
              <ScrollView showsVerticalScrollIndicator={false} keyboardDismissMode='on-drag' keyboardShouldPersistTaps='never' style={styles.formContainer}>
             
               <Form buttonText="Save" onButtonPress={handleSubmit(onSubmit)}>
              
             <Label fontSize={15} text="Title" isRequired/>
               <TitleInput name="Title" control={control}/>
             <Label text="Description" isRequired/>
               <DescInput name="Description"  textArea={1} onReturn={Keyboard.dismiss} control={control}/>
             <Label text="Pick a Due Date"/>
               {/* <DateInput name="DueDate" control={control}/> */}
              
                <DateTimePicker
                  
                
                  onChange={changeTheDate}
                  value={theduedate}
                  display='inline'
                  
                  
                />
             
              
             
             </Form>
             </ScrollView>
             
               
              
               
             
                   
             
          </SafeAreaView>
      );
      
    };
    export default CreateItem;