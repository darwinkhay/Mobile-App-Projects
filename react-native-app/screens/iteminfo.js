
 /**
  * Sources:
  * https://www.npmjs.com/package/react-native-form-component (react native form component)
  * https://react-hook-form.com/ (react hook form)
  * https://www.npmjs.com/package/@react-native-community/datetimepicker (datepicker)
  * https://reactnative.dev/docs/scrollview#keyboarddismissmode (keyboard dismiss mode and keyboard persists taps)
  * https://stackoverflow.com/questions/60864610/is-it-possible-to-use-react-datepicker-with-react-hooks-forms (how to use controller with datepicker, but honestly with anything)
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
    import DateTimePicker from '@react-native-community/datetimepicker';
    import DatePicker from 'react-native-modern-datepicker';
    import moment from 'moment';
  
    import styles from '../styles/styles.js'
    import Home from '../screens/home.js'
 
   
 
    const ItemInfo = ({ navigation, route}) => {
  
      const isDarkMode = useColorScheme() === 'dark';
  
      const backgroundStyle = {
          backgroundColor: isDarkMode ?  Colors.darker : Colors.lighter
      };
      
      const [theduedate, setDate] = useState(new Date(route.params.date))
      const changeTheDate = (event, selectedDate) => {
        setDate(selectedDate)
      }
      const {control, handleSubmit} = useForm();
      const onSubmit = (data) => {navigation.navigate('Home', {itemInfo: true, id: route.params.id, title: data.Title, desc: data.Description, date: theduedate, completed: route.params.completed, completionDate: route.params.completionDate})};

      return (
          <SafeAreaView style={styles.sectionContainer2}>
              <StatusBar
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
              backgroundColor={backgroundStyle.backgroundColor}
          
              />
              
              <ScrollView showsVerticalScrollIndicator={false} keyboardDismissMode='on-drag' keyboardShouldPersistTaps='never' style={styles.formContainer}>
             
               <Form buttonText="Save" onButtonPress={handleSubmit(onSubmit)}>
              
             <Label text="Title" isRequired/>
               
               <Controller
               control={control}
               name='Title'
               
               defaultValue={route.params.title}
               render={({ field }) => (
                <FormItem
                  
                  
                  onChangeText={field.onChange}
                  value={field.value}
                />
             )}/>
             <Label text="Description" isRequired/>
             <Controller
               control={control}
               name='Description'
               
               defaultValue={route.params.desc}
               render={({ field }) => (
                <FormItem
                  textArea
                onReturn={Keyboard.dismiss}
                  onChangeText={field.onChange}
                  value={field.value}
                />
             )}/>
             <Label textStyle={{fontSize: 22, color: '#f5b576'}} text={route.params.completed ? `COMPLETED ON: ${moment(route.params.completionDate).format('MM/DD/YYYY')} \n` : 'NOT YET COMPLETED \n'}/>
             <Label text="Pick a Due Date"/>

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
    export default ItemInfo;