import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { StyleSheet, Text, View } from 'react-native';


import Home from './screens/home.js'
import CreateItem from './screens/createitem.js'
import ItemInfo from './screens/iteminfo.js'
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: 'My UVA Bucket List' }}
        />
        <Stack.Screen
          name="Create a Bucket List Item"
          component={CreateItem}
          />
          <Stack.Screen
          name="Item Info"
          component={ItemInfo}
          />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
