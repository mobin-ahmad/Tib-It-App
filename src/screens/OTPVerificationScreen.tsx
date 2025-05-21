import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  Alert,
} from 'react-native';
// import { useVerifyOTP } from '../hooks/apiHooks'; // Update the path as per your folder structure
import appColors from '../components/appcolors';
import { useVerifyOTP } from '../hooks/useAuth';
import { SafeAreaView } from 'react-native-safe-area-context'; // Import SafeAreaView
import { useNavigation } from '@react-navigation/native';

const VerificationScreen = ({ route }) => {
  const { phoneNumber } = route.params; // Extract phoneNumber from route params
  const navigation = useNavigation();

  const [timer, setTimer] = useState(40); // Timer for resend
  const [otp, setOtp] = useState(['', '', '', '']); // Array for 4 digits of OTP

  const { mutate: verifyOtp, isLoading } = useVerifyOTP();

  // Countdown for resend timer
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleResendCode = () => {
    setTimer(40); // Reset the timer when resend is clicked
    // Add resend code logic here
    Alert.alert('Code Resent', 'A new OTP code has been sent to your number.');
  };

  const handleVerify = () => {
    const otpCode = otp.join(''); // Concatenate the array into a single string
    if (otpCode.length < 4) {
      Alert.alert('Error', 'Please enter the complete OTP.');
      return;
    }

    // Call API to verify OTP
    verifyOtp(otpCode, {
      onSuccess: () => {
        navigation.navigate('AllPatientsScreen', {phoneNumber});

        Alert.alert('Success', 'OTP Verified Successfully');
      },
      onError: (error) => {
        Alert.alert('Error', 'Failed to verify OTP. Please try again.');
        console.error(error);
      },
    });
  };

  // Handle OTP input changes
  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Automatically move to the next input if a value is entered
    if (value !== '' && index < 3) {
      const nextInput = `otpInput${index + 1}`;
      if (this[nextInput]) {
        this[nextInput].focus();
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <SafeAreaView style={styles.safeAreaHeader}>

      <View style={styles.header}>
        <TouchableOpacity style={styles.locationContainer}>
          <Image
            source={require('../assets/backarrow.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>OTP Verification</Text>
        <Image
          source={require('../assets/Vector.png')}
          style={styles.icon2}
        />
      </View>
      </SafeAreaView>

      {/* Verification Text */}
      <Text style={styles.title}>OTP Verification</Text>
      <Text style={styles.description}>
        We sent you a verification code to your phone number{' '}
        <Text style={styles.phoneNumber}>{phoneNumber}</Text>.
      </Text>

      {/* Custom OTP Input */}
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(input) => {
              this[`otpInput${index}`] = input;
            }}
            style={styles.otpBox}
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            onChangeText={(value) => handleOtpChange(value, index)}
          />
        ))}
      </View>

      {/* Resend Code & Timer */}
      <View style={styles.resendContainer}>
        {timer > 0 ? (
          <Text style={styles.resendText}>
            Resend in <Text style={styles.timer}>{timer}s</Text>
          </Text>
        ) : (
          <TouchableOpacity onPress={handleResendCode}>
            <Text style={styles.resendLink}>Resend code</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Verify Button */}
      <TouchableOpacity
        style={styles.verifyButton}
        onPress={handleVerify}
        disabled={isLoading}
      >
        <Text style={styles.verifyButtonText}>
          {isLoading ? 'Verifying...' : 'Verify'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: appColors.jazzred,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#A33E39',
    marginBottom: 10,
    marginTop: 30,
  },
  description: {
    paddingHorizontal: 20,
    fontSize: 16,
    textAlign: 'center',
    color: '#000',
    marginBottom: 30,
  },
  phoneNumber: {
    fontWeight: 'bold',
    color: '#A33E39',
  },
  otpContainer: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  otpBox: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    textAlign: 'center',
    fontSize: 20,
    borderRadius: 10,
    color: '#A33E39',
  },
  resendContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  icon2: {
    width: 0,
    height: 0,
    marginRight: 5,
  },
  resendText: {
    fontSize: 16,
    color: '#000',
  },
  timer: {
    color: '#A33E39',
  },
  resendLink: {
    color: '#A33E39',
    fontSize: 16,
    fontWeight: 'bold',
  },
  verifyButton: {
    marginHorizontal: 20,
    padding: 20,
    backgroundColor: appColors.jazzred,
    borderRadius: 8,
    alignItems: 'center',
  },
  verifyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default VerificationScreen;
