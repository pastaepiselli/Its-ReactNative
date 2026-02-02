import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import { View, Text, TextInput, Button, StyleSheet, Alert} from 'react-native';
const Stack = createNativeStackNavigator();
import Form from './components/Form';
import { useState } from 'react';



export default function App() {

  

  return (
      <Form></Form>
    
      
    
  );
}



// <NavigationContainer>
    //   <Stack.Navigator>
    //     <Stack.Screen name='Home' component={HomeScreen}></Stack.Screen>
    //     <Stack.Screen name='Details' component={DetailsScreen}>
    //   </Stack.Navigator>
    // </NavigationContainer>