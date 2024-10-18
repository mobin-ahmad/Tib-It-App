import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  ScrollView, // Import ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // You can use any icon library
import {useNavigation} from '@react-navigation/native';

const LoginScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigation = useNavigation();

  const handleContinue = () => {
    if (!phoneNumber) {
        navigation.navigate("VerificationScreen");
    //   Alert.alert('Error', 'Please enter your phone number.');
    } else {
        navigation.navigate("VerificationScreen");
      // Continue with phone number
    //   Alert.alert('Success', 'Phone number submitted: ' + phoneNumber);
      // Further submit logic here
    }
  };

  const handleGuestContinue = () => {
    navigation.navigate("tabs");
    // Alert.alert('Proceeding as Guest');
    // Navigate or handle guest logic
  };

  const handleRegister = () => {
    Alert.alert('Redirecting to Registration');
    // Navigate to registration screen
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/logo.png')}
            // style={styles.logo}
          />
        </View>

        <Text style={styles.title}>Welcome to tibbit</Text>
        <Text style={styles.subtitle}>
          Please provide the following information to seamlessly connect with us
        </Text>

        {/* Phone Number Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Phone Number *"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
          <Icon name="phone" size={20} color="#B13E2A" style={styles.iconStyle} />
        </View>

        {/* Continue Button */}
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>

        {/* Register and Guest Options */}
        <View style={styles.registerContainer}>
  <Text style={styles.registerText}>
    New to tibbit?{' '}
    <Text style={styles.registerLink} onPress={handleRegister}>
      Register Now
    </Text>
  </Text>
</View>

        {/* Divider with 'or' */}
        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.orText}>or</Text>
          <View style={styles.dividerLine} />
        </View>
      </ScrollView>

      {/* Continue as Guest Button at the Bottom */}
      <TouchableOpacity
        style={styles.guestButton}
        onPress={handleGuestContinue}>
        <Text style={styles.guestButtonText}>Continue as guest</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({

    registerContainer: {
        alignItems: 'center', // Center the content horizontally
        marginBottom: 20, // Optional: Add space below the text
      },
      registerText: {
        fontSize: 14,
        color: '#333',
      },
      registerLink: {
        color: '#B13E2A',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
      },

  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1, // Allows ScrollView to grow
    justifyContent: 'center', // Center content vertically
  },
  logoContainer: {
    marginBottom: 20,
    alignItems: 'center', // Center the logo
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#B13E2A',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#333',
    marginBottom: 40,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 12,
    marginBottom: 40,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  iconStyle: {
    marginLeft: 10,
  },
  continueButton: {
    backgroundColor: '#4E4E4E',
    paddingVertical: 15,
    paddingHorizontal: 100,
    borderRadius: 5,
    marginBottom: 40,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
 
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  orText: {
    fontSize: 14,
    color: '#B13E2A',
    marginHorizontal: 5,
  },
  guestButton: {
    backgroundColor: '#f7c143',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 5,
    marginVertical: 20,
    alignSelf: 'center', // Center the button horizontally
    marginBottom: 20, // Adjust as necessary
  },
  guestButtonText: {
    color: '#333',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default LoginScreen;
