import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import appColors from '../components/appcolors';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { useLogin } from '../hooks/useAuth';
import { authApi } from '../config/axiosConfig';
import { serverRoutes } from '../routes/serverRoutes';
import { useDispatch } from 'react-redux';
import { setToken } from '../store/slices/auth';
import { ActivityIndicator } from 'react-native-paper';

const LoginScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false); // Add loading state

  // const [enabled,setEnabled] = useState(false)
// const {mutate} = useLogin()
// const {data} = useLogin(enabled,phoneNumber)
// console.log("$data", data?.data);

const handleContinue = async () => {
  if (!phoneNumber) {
    Alert.alert('Error', 'Please enter your phone number.');
    return;
  }
  setLoading(true); // Start the loader

  try {

  
    
  

    console.log("API Request:", `${serverRoutes.LOGIN}?mobileNumber=${phoneNumber}`);
    const loginResponse = await authApi.get(`${serverRoutes.LOGIN}?mobileNumber=${phoneNumber}`);
    console.log("Login Success:", loginResponse?.data);
    const token = loginResponse?.data?.token;
    if (token) {
      console.log("token is ", token);
      
      dispatch(setToken(token));
    }
    // // Navigate to VerificationScreen on success
    navigation.navigate("VerificationScreen", { phoneNumber });
  } catch (error) {
    console.error("Login Error:", error);

    // Extract and display the error message
    const errorMessage = error?.response?.data?.message || error?.message || "Login failed. Please try again.";
    Alert.alert("Error", errorMessage);
}finally {
    setLoading(false); // Stop the loader
  }
};


  const handleGuestContinue = () => {
    navigation.navigate("tabs");
  };

  const handleRegister = () => {
    navigation.navigate("SignupScreen");
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/logo.png')}
          />
        </View>

        <Text style={styles.title}>Log in to your account</Text>
        {/* <Text style={stylkes.subtitle}>
          Please provide the following information to seamlessly connect with us
        </Text> */}

        {/* Phone Number Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Phone Number *"
            placeholderTextColor="#888"

            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
           <Image
              source={require('../assets/phone.png')} // Replace with your profile icon
              style={styles.logo}
            />
          {/* <Icon name="phone" size={20} color="#B13E2A" style={styles.iconStyle} /> */}
        </View>
      </ScrollView>

      {/* Continue Button */}
      {/* <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.buttonText}>Log in</Text>
      </TouchableOpacity> */}
        <TouchableOpacity
        style={[styles.continueButton, loading && styles.disabledButton]} // Add conditional style
        onPress={handleContinue}
        disabled={loading} // Disable button while loading
      >
        {loading ? (
          <ActivityIndicator color="#fff" /> // Show loader
        ) : (
          <Text style={styles.buttonText}>Log in</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.registerContainer}
        onPress={handleRegister}>
        <Text style={styles.registerText}>
          New to tibbit?{' '}
          {/* <Text style={styles.registerLink} onPress={handleRegister}>
            Register Now
          </Text> */}
        </Text>
      </TouchableOpacity>


      <TouchableOpacity
        style={styles.registerButton}
        onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>


      <TouchableOpacity
        style={styles.guestButton}
        onPress={handleGuestContinue}>
        <Text style={styles.guestButtonText}>Continue as guest</Text>
      </TouchableOpacity>

      {/* Divider with 'or' */}
      {/* <View style={styles.dividerContainer}>
        <View style={styles.dividerLine} />
        <Text style={styles.orText}>or</Text>
        <View style={styles.dividerLine} />
      </View>
       */}

      {/* <TouchableOpacity
        style={styles.registerContainer}
        onPress={handleRegister}>
        <Text style={styles.registerText}>
          New to tibbit?{' '}
          <Text style={styles.registerLink} onPress={handleRegister}>
            Register Now
          </Text>
        </Text>
      </TouchableOpacity> */}

      {/* <View style={styles.registerContainer}>
        <Text style={styles.registerText}>
          New to tibbit?{' '}
          <Text style={styles.registerLink} onPress={handleRegister}>
            Register Now
          </Text>
        </Text>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  registerContainer: {
    alignItems: 'center',
    marginBottom: 0,
  },
  disabledButton: {
    backgroundColor: '#999', // Optional: change color when disabled
  },
  registerText: {
    fontSize: 12,
    color: '#333',
    fontWeight:'bold',
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
    flexGrow: 1,
    // justifyContent: 'space-between', // Space out the contents to push the buttons down
  },
  logoContainer: {
    marginTop:100,
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: appColors.jazzred,
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
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 20,
    marginTop:25,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color:appColors.Btnblack,
  },
  iconStyle: {
    marginLeft: 10,
  },
  continueButton: {
    backgroundColor: appColors.jazzred,
    paddingVertical: 15,
    paddingHorizontal: 140,
    borderRadius: 8,
    marginVertical: 10,
    alignSelf: 'center',
    marginBottom: 80,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
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

  logo: {
    width: 25,
    height:25,
    resizeMode: 'contain',
  },

  guestButton: {
    // backgroundColor: '#f7c143',
    paddingVertical: 15,
    paddingHorizontal: 70,
    borderRadius: 8,
    marginVertical: 10,
    alignSelf: 'center',
    marginBottom: 0,
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
    marginBottom: 0,
  },

  guestButtonText: {
    fontWeight:'bold',
    color: appColors.jazzred,
    fontSize: 16,
    textAlign: 'center',
  },

  registerButtonText: {
    color: appColors.jazzred,
    fontSize: 16,
    textAlign: 'center',
    fontWeight:'bold',
  },
});

export default LoginScreen;
