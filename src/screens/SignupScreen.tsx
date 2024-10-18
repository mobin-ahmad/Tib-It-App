import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { CheckBox } from 'react-native-elements';
import RadioForm from 'react-native-simple-radio-button'; // Install via npm

const SignupScreen = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [cnic, setCnic] = useState('');
  const [gender, setGender] = useState(null);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const radio_props = [
    {label: 'Male', value: 'Male'},
    {label: 'Female', value: 'Female'},
  ];

  const handleSubmit = () => {
    if (!name || !phoneNumber || !gender || !termsAccepted) {
      Alert.alert(
        'Error',
        'Please fill all the required fields and accept the terms and conditions.',
      );
    } else {
      Alert.alert('Success', 'Form submitted successfully');
      // Further submit logic here
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>Tibbit</Text>
      </View>

      <Text style={styles.title}>Welcome to tibbit</Text>
      <Text style={styles.subtitle}>
        Signup to get Quality Medical Services at your fingertips
      </Text>

      {/* Form Fields */}
      <TextInput
        style={styles.input}
        placeholder="Name *"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number *"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="CNIC Number (optional)"
        keyboardType="numeric"
        value={cnic}
        onChangeText={setCnic}
      />

      {/* Gender Selection */}
      <Text style={styles.genderLabel}>Gender *</Text>
      <RadioForm
        radio_props={radio_props}
        initial={-1}
        formHorizontal={true}
        labelHorizontal={true}
        buttonColor={'#B13E2A'}
        selectedButtonColor={'#B13E2A'}
        onPress={(value: React.SetStateAction<null>) => setGender(value)}
        labelStyle={styles.radioLabel}
        buttonSize={12}
      />

      {/* Terms and Conditions */}
      <View style={styles.checkboxContainer}>
      <CheckBox
  title='I have accepted the Terms and Conditions'
  checked={termsAccepted}
  onPress={() => setTermsAccepted(!termsAccepted)}
  containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
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
        Already a member? <Text style={styles.loginText}>Login</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20,
    justifyContent: 'center',
  },
  logoContainer: {
    marginBottom: 20,
  },
  logoText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#B13E2A',
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
    marginBottom: 30,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 12,
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
    fontSize: 16,
    marginRight: 20,
    color: '#333',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#333',
  },
  termsText: {
    color: '#B13E2A',
    textDecorationLine: 'underline',
  },
  continueButton: {
    backgroundColor: '#4E4E4E',
    paddingVertical: 15,
    paddingHorizontal: 100,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#333',
  },
  loginText: {
    color: '#B13E2A',
    fontWeight: 'bold',
  },
});

export default SignupScreen;