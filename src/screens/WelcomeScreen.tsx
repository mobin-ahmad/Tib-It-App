import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import appColors from '../components/appcolors';
import { useSelector } from 'react-redux';
// import { API_URL, API_KEY } from '@env';

const WelcomeScreen = ({ navigation }) => {

  const selectedPatient = useSelector((state) => state.patients.selectedPatient);

  // console.log("asdasdsadsadasd",API_URL);
  // console.log(API_KEY);

  return (
    <View style={styles.container}>
     
      
      <View style={styles.content}>
        <Image
          source={require('../assets/logo.png')}  // Add your image path here
          style={styles.image}
        />
        <Text style={styles.welcomeText}>
          Welcome to TibbiT
        </Text>
        <Text style={styles.welcomeText2}>
          Welcome to our medical app—your easy way to book appointments and access healthcare services anytime!
        </Text>
      </View>

      <TouchableOpacity
  style={styles.button}
  onPress={() => {
    if (selectedPatient && selectedPatient.patient_Name) {
      navigation.reset({
        index: 0, // The index of the screen you want to navigate to
        routes: [{ name: 'tabs' }], // The screen you want to navigate to
      });
    } else {
      navigation.navigate("LoginScreen");
    }
  }}
>
  <Text style={styles.buttonText}>Get Started</Text>
</TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',  // Ensure space between content and button
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
    // borderWidth: 1,
    borderColor: '#000',  // To match the outer black border
  },
  title: {
    position: 'absolute',
    top: 40,  // Positioning title at the top left
    left: 20,
    fontSize: 16,
    color: '#808080',  // Grey color for the title text
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,  // Adds space between the title and image
  },
  image: {
    width: 250,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 130, 
    // marginVertical:40,

    // Adding space between image and text
  },
  welcomeText: {
    fontSize: 24,
    textAlign: 'center',
    color:appColors.jazzred,
    fontWeight:'bold',
    paddingHorizontal: 20,

    
  },
  welcomeText2: {
    fontSize: 16,
    textAlign: 'center',
    color: '#000',
    paddingHorizontal: 20,
    marginVertical:20,

  },
  button: {
    backgroundColor: appColors.jazzred,
    paddingVertical: 15,
    paddingHorizontal: 100,
    borderRadius: 8,
    marginBottom: 20,  // Positioning button near the bottom with some margin
  },
  buttonText: {
    color: appColors?.Btnblack,
    fontSize: 16,
  },
});

export default WelcomeScreen;
