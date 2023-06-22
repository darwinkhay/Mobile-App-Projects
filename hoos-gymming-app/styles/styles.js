/**
 * Taken from MyDailySchedule app from in class
 */

 import React from 'react';
 import {
   StyleSheet
 } from 'react-native';
 
 const styles = StyleSheet.create({
     sectionContainer: {
      //  marginTop: 10, //32
       paddingHorizontal: 24, //24
       flex: 1,
      //  marginBottom: 75, 
   backgroundColor: '#0A0F1D',
     },
     sectionContainer2: {
      //  paddingHorizontal: 24, //24
       flex: 1,
       backgroundColor: '#0A0F1D',
       alignItems:'center',
     
     },
     sectionTitle: {
       fontSize: 24,
       fontWeight: '600',
       alignContent: 'center',
     },
     sectionDescription: {
       marginTop: 8,
       fontSize: 18,
       fontWeight: '400',
     },
     highlight: {
       fontWeight: '700',
     },
     // added from https://reactnative.dev/docs/checkbox
     container: {
       flex: 1,
       backgroundColor: 'black',
       width: '100%'
     },
     formContainer:{
       marginTop: 10,
       paddingVertical: 20,
       paddingHorizontal: 10,
  
     },
     checkboxContainer: {
       flexDirection: "row",
       marginBottom: 20,
     },
     checkbox: {
       alignSelf: "center",
       
     },
     label: {
       margin: 8,
     },
     swipedRow: {
       flexDirection: 'row-reverse',
       flex: 0,
       alignItems: 'center',
       paddingLeft: 0, //50
       backgroundColor: '#202020', //#818181
       margin: 0,
       width: '35%',
       borderTopRightRadius: 25,
       borderBottomRightRadius: 25,
       // minHeight: 50,
     },
     swipedConfirmationContainer: {
       flex: 1,
       backgroundColor: 'black'
     },
     deleteConfirmationText: {
       color: '#fcfcfc',
       fontWeight: 'bold',
     },
     deleteButton: {
       backgroundColor: '#ed5a5a',
       flexDirection: 'column',
       flex: 0,
       justifyContent: 'center',
       // direction: 'rtl',
       height: '100%',
       width:  125,
       margin: 0,
       borderTopRightRadius: 25,
       borderBottomRightRadius: 25,
     },
     deleteButtonText: {
       color: '#fcfcfc',
       fontWeight: 'bold',
       fontSize: 20,
       padding: 30, //3
      
       
     },
     buttonText:{
      color: "#000000",
      fontSize: 18,
      fontWeight: 'bold'
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#86CBF6',
    padding: 15,
    borderRadius: '10px',
    text: "#ffffff",
    margin: 25
  },
  button2: {
    alignItems: 'center',
    backgroundColor: '#86CBF6',
    padding: 15,
    borderRadius: '10px',
  },
  textInput: {
      borderStyle: 'solid',
      borderColor: "black",
      borderRadius: '10px',
      backgroundColor: '#eeeeee',
      padding: 10,
      marginLeft: 25,
      marginRight: 25,
      borderWidth: 1,
      fontSize: 18,
      minHeight: 50,
      marginBottom: 10
  },
    textInput2: {
      borderStyle: 'solid',
      borderColor: "#202020",
      borderRadius: '10px',
      backgroundColor: '#202020',
      padding: 10,
      marginLeft: 15,
      marginRight: 15,
      borderWidth: 1,
      fontSize: 18,
      color: 'white',
      minHeight: 50,
      marginBottom: 25,
      minWidth:70
  },

  map: {
    width: '100%',
    height: '100%',
    flex: 1
    
   },
  textWhite :{
    color: 'white',
    fontSize: 20,
    marginBottom:5,
    marginLeft: 15
  },
  buttonContainer: {
    backgroundColor: '#fff',
    alignSelf: 'flex-end'
  },
  preview: {
    alignSelf: 'stretch',
    flex: 1,
  }

   });
 
 export default styles;