import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox'; // Install via npm
import RadioForm from 'react-native-simple-radio-button'; // Install via npm
import appColors from '../components/appcolors';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRegisters } from '../hooks/useAuth';

const SignupScreen = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [cnic, setCnic] = useState('');

  const [DOB, setDOB] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());  const [gender, setGender] = useState(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const navigation = useNavigation();
  const { mutate, isLoading } = useRegisters();

  const radio_props = [
    { label: 'Male', value: 'Male', },
    { label: 'Female', value: 'Female' },
    { label: 'Other', value: 'Other' },

  ];

  const handleDateChange = (event, date) => {
    setShowPicker(Platform.OS === 'ios');
    if (date) {
      setSelectedDate(date);
      
      // Format the date as an ISO 8601 string in UTC
      const isoDate = date.toISOString();
      
      setDOB(isoDate); // Save the date in "2025-01-30T09:25:18.349Z" format
    }
  };
  


  const handleSubmit = () => {
    if (!name || !phoneNumber || !gender || !termsAccepted || !DOB) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }


    const requestBody = {
      name: name,
      mobileNumber: phoneNumber,
      dob: DOB,
      gender: gender,
      relation: "patient",
    };
    console.log("Payload for Patient:", requestBody);
  
    // Call the bookAppointment function
    // confirmAppointment(payload);
    // const { mutate } = useRegisters();

    mutate(requestBody, {
      onSuccess: (response) => {
        Alert.alert('Success', 'Registration successful.');
        navigation.navigate('LoginScreen');
      },
      onError: (error) => {
        // if (error?.response?.status === 400) {
        //   Alert.alert('Error', 'Invalid request. Please check the inputs.');
        // } else {
        //   Alert.alert('Error', 'Failed to register the patient. Please try again.');
        // }
      }
    });
  
    
  }

  // const handleSubmit = async () => {
  //   if (!name || !phoneNumber || !gender || !termsAccepted || !DOB) {
  //     Alert.alert(
  //       'Error',
  //       'Please fill all the required fields and accept the terms and conditions.'
  //     );
  //     return;
  //   }

  //   const requestBody = {
  //     name: name,
  //     mobileNumber: phoneNumber,
  //     dob: DOB,
  //     gender: gender,
  //     relation: cnic || 'N/A',
  //   };

  //   try {
  //     const response = await axios.post(
  //       'https://api.tibbit.garajcloud.com/RegisterUser/Register',
  //       requestBody
  //     );
  //     Alert.alert('Success', response.data);
  //     navigation.navigate('LoginScreen');
  //   } catch (error) {
  //     Alert.alert('Registration Failed', error.message);
  //   }
  // };

  const handleRegister = () => {
    navigation.navigate('LoginScreen');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Logo */}
        <View style={styles.logoContainer}>
        <Image source={require('../assets/logo.png')} style={styles.icon} />

        </View>

        <Text style={styles.title}>User Registeration</Text>
        <Text style={styles.subtitle}>
          Create an account for easy health management
        </Text>

        {/* Form Fields */}
      <TextInput
  style={styles.input}
  placeholder="Name *"
  placeholderTextColor="#888"
  value={name}
  onChangeText={setName}
/>

        <TextInput
          style={styles.input}
          placeholder="Phone Number *"
          placeholderTextColor="#888"

          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <TextInput
          style={styles.input}
          placeholder="CNIC Number (optional)"
          placeholderTextColor="#888"

          keyboardType="numeric"
          value={cnic}
          onChangeText={setCnic}
        />

<View style={styles.container1}>
      <TouchableOpacity onPress={() => setShowPicker(true)}>
        <TextInput
          style={styles.input}
          placeholder="DOB (dd/mm/yyyy)"
          placeholderTextColor="#888"
          value={DOB}
          editable={false}
          pointerEvents="none"
        />
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
          maximumDate={new Date()} // Optional: restrict to past dates
        />
      )}
    </View>


        {/* Gender Selection */}
        <Text style={styles.genderLabel}>Gender *</Text>
        <RadioForm
          radio_props={radio_props}
          initial={-1}
          formHorizontal={true}
          labelHorizontal={true}
          buttonColor={'#B13E2A'}
          selectedButtonColor={'#B13E2A'}
          onPress={(value) => setGender(value)}
          labelStyle={styles.radioLabel}
          buttonSize={10}
        />

        {/* Terms and Conditions */}
        <View style={styles.checkboxContainer}>
        <CheckBox
          value={termsAccepted}
          onValueChange={setTermsAccepted}
          tintColors={{ true: '#B13E2A', false: '#333' }}
        />
        <Text style={styles.checkboxLabel}>
          I have accepted the{' '}
          <Text style={styles.termsText}>Terms and Conditions</Text>
        </Text>
      </View>


        {/* Continue Button */}
        <TouchableOpacity style={styles.continueButton} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>

        {/* Already a Member */}
        <Text style={styles.footerText}>
          Already a member? <Text style={styles.loginText}></Text>
        </Text>

        <TouchableOpacity
        style={styles.registerButton}
        onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Login</Text>
      </TouchableOpacity>


      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,

    flex: 1,
    backgroundColor: '#fff',
  },
  logoContainer: {
    marginTop:30,

    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: appColors.jazzred,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#333',
    paddingHorizontal: 50,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 12,
    color:appColors.Btnblack,
    marginBottom: 15,
  },
  genderLabel: {
    alignSelf: 'flex-start',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#B13E2A',
  },
  radioLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    marginRight: 40,
    color: '#333',
    
  },
 
  continueButton: {
    backgroundColor: appColors.jazzred,
    paddingVertical: 15,
    paddingHorizontal: 100,
    borderRadius: 8,
    marginBottom: 40,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },

  registerButton:{
    backgroundColor: '#AF35301A',
    // paddingVertical: 15,
    // paddingHorizontal: 70,
    // borderRadius: 8,
    // marginVertical: 20,
    // alignSelf: 'center',
    // marginBottom: 5,
    paddingVertical: 15,
    paddingHorizontal: 140,
    borderRadius: 8,
    marginVertical: 10,
    alignSelf: 'center',
    marginBottom: 10,
  },
  registerButtonText: {
    color: appColors.jazzred,
    fontSize: 16,
    textAlign: 'center',
    fontWeight:'bold',
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  footerText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#333',
  },
  loginText: {
    color: '#B13E2A',
    fontWeight: 'bold',
  },

  icon: {
    height: 80,
    width:200,
    // color: appColors.Btnblack,
  },

  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    
  },
  // checkboxContainer: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   marginVertical: 15,
  //   // Adjust space between checkbox and text
  //   justifyContent: 'flex-start',
  // },
  checkbox: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 10,
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#333',
    marginLeft: 5, // Add space between the checkbox and text
  },
  termsText: {
    color: '#B13E2A',
    fontWeight:'bold',
    textDecorationLine: 'underline',
  },

});




export default SignupScreen;
