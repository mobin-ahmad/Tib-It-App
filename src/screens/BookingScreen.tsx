import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import appColors from '../components/appcolors';

const BookingScreen = () => {
  const [otp, setOtp] = useState(['', '', '', '']); // Array for 4 digits of OTP
  const navigation = useNavigation();

  // Countdown for resend timer
 
 



  return (
    <View style={styles.container}>
      {/* Header */}

{/*       
      <View style={styles.header}>


      <TouchableOpacity style={styles.locationContainer}
      onPress={() => navigation.goBack()}>
      <Image
            source={require('../assets/backarrow.png')} // Replace with your location icon
            style={styles.icon}
            
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Verification</Text>
      </View> */}



<View style={styles.header}>
        <TouchableOpacity style={styles.locationContainer}>
        {/* onPress={() => drawer.current.closeDrawer()} */}

          <Image
            source={require('../assets/backarrow.png')} // Replace with your location icon
            style={styles.icon}
            
          />
          {/* <Text style={styles.locationText}>Lahore</Text> */}
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bookings</Text>

        {/* <View style={styles.profileContainer}> */}
          {/* <Text style={styles.adminText}>Admin</Text> */}
          {/* <View style={styles.iconContainer}> */}
            <Image
              source={require('../assets/Vector.png')} // Replace with your profile icon
              style={styles.icon2}
            />
          {/* </View> */}
        {/* </View> */}
      </View>


      <Image
        source={require('../assets/bookingscreen.png')} // Add your main logo here
        style={styles.logo}
      />
      {/* Verification Text */}
    
      <Text style={styles.title}>No Bookings Yet</Text>
      <Text style={styles.description}>
      “Schedule your appointment quickly and easily. Choose your preferred service, date, and time for a seamless experience.”
        
      </Text> 

      {/* Custom OTP Input */}
     

      {/* Resend Code & Timer */}
     

      {/* Verify Button */}
   
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    
    flex: 1,
    // padding: 20,
    backgroundColor: '#FFFFFF',
    

  },

  locationContainer: {
    // marginRight:10,
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
  // header: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   marginBottom: 30,
  //   backgroundColor: '#A33E39',
  //   paddingVertical: 25,
  // },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

  logo: {
    marginTop:90,
    // marginLeft:60, 
    paddingHorizontal:190,
    alignItems: 'center',
    width: 200, // Adjust the size of the logo as needed
    height: 200,

    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#A33E39',
    marginBottom: 10,
    marginTop:30,
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

  backArrow: {
    fontSize: 24,
    color: '#FFFFFF', // White color for back arrow
  },
  resendContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },

  icon: {
    width: 0,
    height: 0,
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
    marginHorizontal:20,
    padding:20,
    backgroundColor: appColors.jazzred,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  verifyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BookingScreen;
