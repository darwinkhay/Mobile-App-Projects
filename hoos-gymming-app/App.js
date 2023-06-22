import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import
 MaterialCommunityIcons
from 'react-native-vector-icons/MaterialCommunityIcons';
import 'react-native-gesture-handler';
import {
  NavigationContainer
} from '@react-navigation/native';
import {
  createStackNavigator
} from '@react-navigation/stack';
import {
  createBottomTabNavigator
} from '@react-navigation/bottom-tabs';
import DailySummary from './SummaryTab/DailySummary';
import Workouts from './SummaryTab/Workouts';
import EditWorkout from './SummaryTab/EditWorkout'
import AddWorkout from './SummaryTab/AddWorkout'
import RecipeOfDay from './SummaryTab/RecipeOfDay'
import ExploreTab from './ExploreTab/Explore'
import Gyms from './ExploreTab/Gyms' 
import Restaurants from './ExploreTab/Restaurants'
import Recipes from './ExploreTab/Recipes'
import RecipeDetails from './ExploreTab/RecipeDetails'
import Account from './AccountTab/Account'
import CameraScreen from './AccountTab/Camera'
import workoutHistory from './AccountTab/WorkoutHistory'
import { Amplify } from 'aws-amplify'
import awsconfig from './src/aws-exports'
import {UserContext, IdContext} from './context/UserContext'
import Login from './LoginScreens/login'
import SignUp from './LoginScreens/signup'
import {Auth} from '@aws-amplify/auth'
import {Storage} from '@aws-amplify/storage'


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
Amplify.configure(awsconfig)
Auth.configure(awsconfig);
Storage.configure(awsconfig)
// Auth.configure({
//   identityPoolId: 'us-east-1:f943843a-347c-42d5-b4fe-fd3d35f6de57', //REQUIRED - Amazon Cognito Identity Pool ID
//   region: 'us-east-1', // REQUIRED - Amazon Cognito Region
// })
// Storage.configure({
//   AWSS3: {
//             bucket: 'projectpictures02826-staging', //REQUIRED -  Amazon S3 bucket name
//             region: 'us-east-1', //OPTIONAL -  Amazon service region
//         }
// })
function SummaryStack() {
  return (
      <Stack.Navigator
        initialRouteName="Summary"
        screenOptions={{
          headerStyle: { backgroundColor: '#121212' ,shadowColor: 'black'},
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold', fontSize: 20 }
        }}
        >
        <Stack.Screen
          name="Summary"
          component={DailySummary}
          options={{ title: 'Daily Summary' }}/>
        <Stack.Screen
          name="Details"
          component={Workouts}
          options={{ title: 'Workouts' }} />
          <Stack.Screen
          name="Edit"
          component={EditWorkout}
          options={{ title: 'Edit Workout' }} />
          <Stack.Screen
          name="Add"
          component={AddWorkout}
          options={{ title: 'Add Workout' }} />
          <Stack.Screen
          name="Recipe"
          component={RecipeOfDay}
          options={{ title: 'Recipe' }} />
      </Stack.Navigator>
  );
}

function ExploreStack() {
  return (
    <Stack.Navigator
      initialRouteName="Explore"
      screenOptions={{
        headerStyle: { backgroundColor: '#121212' ,shadowColor: 'black'},
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' , fontSize: 20}
      }}>
      <Stack.Screen
        name="Explore Screen"
        component={ExploreTab}
        options={{ title: 'Explore' }}/>
      <Stack.Screen
        name="Gyms"
        component={Gyms}
        options={{ title: 'Nearby Gyms' }}/>
      <Stack.Screen
        name="Restaurants"
        component={Restaurants}
        options={{ title: 'Nearby Restaurants' }}/>
      <Stack.Screen
      name="Recipes"
      component={Recipes}
      options={{ title: 'Search Recipes' }}/>
      <Stack.Screen
        name="RecipeDetails"
        component={RecipeDetails}
        options={{ title: 'Recipe Details' }}/>
    </Stack.Navigator>
  );
}

function AccountStack() {
  return (
      <Stack.Navigator
        initialRouteName="Account"
        screenOptions={{
          headerStyle: { backgroundColor: '#121212',shadowColor: 'black'},
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold', fontSize: 20 }
        }}>
        <Stack.Screen
          name="AccountPage"
          component={Account}
          options={{ title: 'Account' }}/>
          <Stack.Screen
          name="WorkoutHistory"
          component={workoutHistory}
          options={{ title: 'Workout History' }}/>
          <Stack.Screen
          name="Camera"
          component={CameraScreen}
          options={{ title: 'Camera' , headerShown: false}}/>
      </Stack.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState("")
  const [id, setId] = useState("")
  return (
    <UserContext.Provider value={{user, setUser}}>
      <IdContext.Provider value={{id, setId}}>
      {user ? 
   <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Feed"
        screenOptions={{
          tabBarActiveTintColor: "#86CBF6",
          headerShown: false,
          tabBarStyle:{
            backgroundColor: "#121212",
            borderTopColor: 'black',
          }
        }}
        >
        <Tab.Screen
          name="Daily Summary"
          component={SummaryStack}
          options={{
            tabBarLabel: 'Summary',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="format-list-bulleted"
                color={color}
                size={size}
              />
            ),
          }}  />
        <Tab.Screen
          name="Explore"
          component={ExploreStack}
          options={{
            tabBarLabel: 'Explore',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="search-web"
                color={color}
                size={size}
              />
            ),
          }} />
        <Tab.Screen
          name="Account"
          component={AccountStack}
          options={{
            tabBarLabel: 'Account',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account"
                color={color}
                size={size}
              />
            ),
          }} />
      </Tab.Navigator>
    </NavigationContainer> : 
    <NavigationContainer >
      <Stack.Navigator>
        <Stack.Screen 
        name="Login"
        component={Login}
        options={{ title: "Login",
        headerShown: false}}
        
        />
        <Stack.Screen 
        name="SignUp"
        component={SignUp}
        options={{ title: "SignUp",
        headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>}
    </IdContext.Provider>
    </UserContext.Provider>
  );
}

// https://oblador.github.io/react-native-vector-icons/