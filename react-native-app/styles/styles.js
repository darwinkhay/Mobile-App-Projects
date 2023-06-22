/**
 * Taken from MyDailySchedule app from in class
 */

import React from 'react';
import {
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
    sectionContainer: {
      marginTop: 10, //32
      paddingHorizontal: 24, //24
      flex: 1,
      marginBottom: 75,
 
      
      
    
    },
    sectionContainer2: {
      marginTop: 10, //32
      paddingHorizontal: 24, //24
      flex: 1
    
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
      alignItems: "center",
      justifyContent: "center",
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
      backgroundColor: '#ed5a5a', //#818181
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
  });

export default styles;