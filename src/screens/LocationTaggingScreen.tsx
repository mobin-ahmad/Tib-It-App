import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import Geolocation, {GeoPosition, GeoError} from '@react-native-community/geolocation';
import {useNavigation} from '@react-navigation/native';

const LocationTaggingScreen = () => {
  const [location, setLocation] = useState<GeoPosition | null>(null);
  const navigation = useNavigation();

  const chooseCurrentLocation = () => {
    navigation.navigate("LoginScreen");
    // Check if location services are enabled
    // Geolocation.getCurrentPosition(
    //   (position: GeoPosition) => {
    //     const {latitude, longitude} = position.coords;
    //     setLocation(position);
        
    //     Alert.alert(
    //       'Location chosen!',
    //       `Latitude: ${latitude}, Longitude: ${longitude}`,
    //     );

        // Navigate to the new screen (replace 'NewScreen' with your target screen)
        // navigation.navigate('LoginScreen');
    //   },
    //   (error: GeoError) => {
    //     Alert.alert('Error', error.message);
    //   },
    //   {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    // );
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Image
          source={require('../assets/location.png')}
          style={styles.image}
        />
      </View>
      <Text style={styles.heading}>Choose your preferred location</Text>
      <Text style={styles.subheading}>
        Choose the location against which you want to avail our services
      </Text>

      <TouchableOpacity
        style={styles.currentLocationButton}
        onPress={chooseCurrentLocation}>
        <Text style={styles.buttonText2}>Choose Your Current Location</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.selectCityButton} onPress={() => {}}>
        <Text style={styles.buttonText}>Select City</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  image: {
    width: 220,
    height: 180,
    resizeMode: 'contain',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#B13E2A',
  },
  subheading: {
    fontSize: 14,
    textAlign: 'center',
    color: '#333',
    marginBottom: 40,
  },
  currentLocationButton: {
    backgroundColor: '#4E4E4E', // Dark Gray
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 5,
    marginBottom: 20,
  },
  selectCityButton: {
    backgroundColor: '#F2BB44', // Yellow
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 5,
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

export default LocationTaggingScreen;
