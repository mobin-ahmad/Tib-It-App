// src/navigation/AppNavigator.tsx
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import LocationTaggingScreen from '../screens/LocationTaggingScreen';
import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';
import VerificationScreen from '../screens/OTPVerificationScreen';
import AllPatientsScreen from '../screens/PatientSelectionScreen';
import NotificationScreen from '../screens/NotificationScreen';
import MedicalHistoryScreen from '../screens/MedicalHistoryScreen';
import ReportScreen from '../screens/ReportsScreen';
import AppointmentScreen from '../screens/BookAppointment';
import SelectDateScreen from '../screens/selectDateScreen';
import SelectDoctorScreen from '../screens/selectDoctorScreen';
import DoctorAvailabilityScreen from '../screens/doctorAvailibiltyScreen';
import AppointmentDetailScreen from '../screens/appointmentDetailScreen';
import Tabs from '../navigation/tab';

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

<Stack.Screen
        name="NotificationScreen" // Updated name for clarity
        component={NotificationScreen} // Use MainNavigator as the main component
        options={{headerShown: false}} // Hide header for Main
      />

<Stack.Screen
        name="MedicalHistoryScreen" // Updated name for clarity
        component={MedicalHistoryScreen} // Use MainNavigator as the main component
        options={{headerShown: false}} // Hide header for Main
      />
<Stack.Screen
        name="ReportScreen" // Updated name for clarity
        component={ReportScreen} // Use MainNavigator as the main component
        options={{headerShown: false}} // Hide header for Main
      />
<Stack.Screen
        name="AppointmentScreen" // Updated name for clarity
        component={AppointmentScreen} // Use MainNavigator as the main component
        options={{headerShown: false}} // Hide header for Main
      />


<Stack.Screen name="SelectDateScreen" component={SelectDateScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SelectDoctor" component={SelectDoctorScreen} options={{ headerShown: false }} />
        <Stack.Screen name="DoctorAvailability" component={DoctorAvailabilityScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AppointmentDetailScreen" component={AppointmentDetailScreen} options={{ headerShown: false }} />

        <Stack.Screen
        name="Tabs" // Updated name for clarity
        component={Tabs} // Use MainNavigator as the main component
        options={{headerShown: false}} // Hide header for Main
      />


    </Stack.Navigator>
  );
};

export default AppNavigator;
