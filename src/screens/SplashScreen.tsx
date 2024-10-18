// src/screens/SplashScreen.tsx
import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Welcome'); // Redirect to Welcome Screen after 2 seconds
    }, 2000);
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Main Logo Section */}
      <Image
        source={require('../assets/logo.png')} // Add your main logo here
        style={styles.logo}
      />

<Image
        source={require('../assets/doctor.png')} // Add your main logo here
        style={styles.logo2}
      />

      {/* Bottom Container with Powered by Section */}
      <View style={styles.bottomContainer}>
        <View style={styles.poweredByRow}>
          <Text style={styles.poweredText}>Powered by</Text>
          <Image
            source={require('../assets/powered_logo.png')} // Add the "Powered by" logo here
            style={styles.poweredLogo}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFC107', // Background color (same as the provided image)
  },
  logo: {
    width: 250, // Adjust the size of the logo as needed
    height: 250,
    resizeMode: 'contain',
  },
  

  logo2: {
    width: 290, // Adjust the size of the logo as needed
    height: 350,
    
    resizeMode: 'contain',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height:100,

    backgroundColor: '#464B4E66', // Color for bottom container
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 10,
    alignItems: 'center',
  },
  poweredByRow: {
    flexDirection: 'row', // To align text and logo in a row
    alignItems: 'center',
  },
  poweredText: {
    fontSize: 15,
    color: '#FFF', // White text for the "Powered by" label
    marginRight: 0,
    marginLeft:50, // Add some space between the text and the logo
  },
  poweredLogo: {
    width: 200, // Adjust the size of the powered logo
    height: 80,
    resizeMode: 'contain',
  },
});

export default SplashScreen;
