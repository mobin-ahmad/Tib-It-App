import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const VerificationScreen = () => {
  const [timer, setTimer] = useState(40); // Timer for resend
  const [otp, setOtp] = useState(['', '', '', '']); // Array for 4 digits of OTP
  const navigation = useNavigation();

  // Countdown for resend timer
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleResendCode = () => {
    setTimer(40); // Reset the timer when resend is clicked
    // Trigger resend code functionality here
  };

  const handleVerify = () => {
    navigation.navigate("AllPatientsScreen");
    // Handle OTP verification here
    const otpCode = otp.join(''); // Concatenate the array into a single string
    console.log('OTP entered:', otpCode);
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
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Verification</Text>
      </View>

      {/* Verification Text */}
      <Text style={styles.title}>Verification</Text>
      <Text style={styles.description}>
        We sent you a verification code to your phone number{' '}
        <Text style={styles.phoneNumber}>03******1</Text>.
      </Text>

      {/* Custom OTP Input */}
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(input) => { this[`otpInput${index}`] = input; }} // Assign refs to inputs for focus control
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
      <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
        <Text style={styles.verifyButtonText}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#A33E39',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#A33E39',
    marginBottom: 10,
  },
  description: {
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
    backgroundColor: '#555555',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  verifyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default VerificationScreen;
