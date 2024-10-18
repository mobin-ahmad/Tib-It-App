// src/navigation/AppNavigator.tsx
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import LocationTaggingScreen from '../screens/LocationTaggingScreen';
import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';
import Tabs from './tab';
import VerificationScreen from '../screens/OTPVerificationScreen';
import AllPatientsScreen from '../screens/PatientSelectionScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LocationTagging"
        component={LocationTaggingScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignupScreen"
        component={SignupScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="tabs" // Updated name for clarity
        component={Tabs} // Use MainNavigator as the main component
        options={{headerShown: false}} // Hide header for Main
      />
<Stack.Screen
        name="AllPatientsScreen" // Updated name for clarity
        component={AllPatientsScreen} // Use MainNavigator as the main component
        options={{headerShown: false}} // Hide header for Main
      />
      

<Stack.Screen
        name="VerificationScreen" // Updated name for clarity
        component={VerificationScreen} // Use MainNavigator as the main component
        options={{headerShown: false}} // Hide header for Main
      />

    </Stack.Navigator>
  );
};

export default AppNavigator;
