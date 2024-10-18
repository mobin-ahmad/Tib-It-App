import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
     
      
      <View style={styles.content}>
        <Image
          source={require('../assets/medical_image.png')}  // Add your image path here
          style={styles.image}
        />
        
        <Text style={styles.welcomeText}>
          Welcome to our medical app—your easy way to book appointments and access healthcare services anytime!
        </Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LocationTagging')}>
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
    borderWidth: 1,
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
    marginTop: 60,  // Adds space between the title and image
  },
  image: {
    width: 220,
    height: 180,
    resizeMode: 'contain',
    marginBottom: 40,  // Adding space between image and text
  },
  welcomeText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#000',
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#444',
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 8,
    marginBottom: 30,  // Positioning button near the bottom with some margin
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default WelcomeScreen;
