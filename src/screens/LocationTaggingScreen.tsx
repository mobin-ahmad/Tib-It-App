import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import Geolocation, { GeoPosition, GeoError } from '@react-native-community/geolocation';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import appColors from '../components/appcolors';

const LocationTaggingScreen = () => {
  const [location, setLocation] = useState<GeoPosition | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const navigation = useNavigation();

  const chooseCurrentLocation = () => {
    // Geolocation.getCurrentPosition(
    //   (position: GeoPosition) => {
    //     const { latitude, longitude } = position.coords;
    //     setLocation(position);

        // Alert.alert(
        //   'Location chosen!',
        //   `Latitude: ${latitude}, Longitude: ${longitude}`,
        // );

        // Navigate to the next screen after location selection
        navigation.navigate('LoginScreen');
      // },
      // (error: GeoError) => {
      //   Alert.alert('Error', error.message);
      // },
      // { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    // );
  };

  const handleCitySelection = () => {
    if (selectedCity) {
      Alert.alert('City Selected', `You selected: ${selectedCity}`);
      // Navigate to the next screen (e.g., LoginScreen)
      navigation.navigate('LoginScreen');
    } else {
      Alert.alert('Error', 'Please select a city.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Image
          source={require('../assets/Frame.png')}
          style={styles.image}
        />
      </View>
      <Text style={styles.heading}>Choose your preferred location</Text>
      <Text style={styles.subheading}>
        Choose the location against which you want to avail our services
      </Text>

      {/* City Selection Picker */}
      {/* <View style={styles.pickerContainer}>
        <RNPickerSelect
          placeholder={{ label: 'Select a city...', value: null }}
          onValueChange={(value) => setSelectedCity(value)}
          items={[
            { label: 'New York', value: 'New York' },
            { label: 'Los Angeles', value: 'Los Angeles' },
            { label: 'Chicago', value: 'Chicago' },
            // Add more cities as needed
          ]}
          style={pickerSelectStyles}
        />
      </View> */}

      {/* Buttons at the Bottom */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.currentLocationButton}
          onPress={chooseCurrentLocation}>
          <Text style={styles.buttonText2}>Choose Your Current Location</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.selectCityButton} onPress={handleCitySelection}>
          <Text style={styles.buttonText}>Select City</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start', // Align items to start
    padding: 20,
    paddingVertical: 155,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 250,
    height: 240,
    resizeMode: 'contain',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    marginTop:20,
    color: '#B13E2A',
  },
  subheading: {
    fontSize: 14,
    textAlign: 'center',
    color: '#333',
    marginBottom: 20,
    paddingHorizontal: 30,
  },
  pickerContainer: {
    width: '100%',
    marginBottom: 20,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 80,
    left: 50,
    right: 50,
  },
  currentLocationButton: {
    backgroundColor: appColors.jazzred,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 10,
  },
  selectCityButton: {
    backgroundColor: '#F2BB44',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    textAlign: 'center',
  },
  buttonText2: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    color: 'black',
    marginBottom: 10,
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    color: 'black',
    marginBottom: 10,
  },
});

export default LocationTaggingScreen;
