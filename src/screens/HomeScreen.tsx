import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import appColors from '../components/appcolors';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      {/* Header with Location, Logo, and Profile */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.locationContainer}>
        {/* onPress={() => drawer.current.closeDrawer()} */}

          <Image
            source={require('../assets/Vector.png')} // Replace with your location icon
            style={styles.icon}
            
          />
          {/* <Text style={styles.locationText}>Lahore</Text> */}
        </TouchableOpacity>
        <Image
          source={require('../assets/logo.png')} // Replace with your logo image
          style={styles.logo}
        />
        <View style={styles.profileContainer}>
          <Text style={styles.adminText}>Admin</Text>
          <View style={styles.iconContainer}>
            <Image
              source={require('../assets/Vector.png')} // Replace with your profile icon
              style={styles.profileIcon}
            />
          </View>
        </View>
      </View>

      <View style={styles.header2}>
        <TouchableOpacity style={styles.locationContainer}>
          {/* <Image
            source={require('../assets/bars.png')} // Replace with your location icon
            style={styles.icon}
          /> */}

          <View style={styles.location}>
            <Image
              source={require('../assets/location.png')} // Replace with your profile icon
              style={styles.profileIcon2}
            />
            <Text style={styles.locationText}>Lahore</Text>
          </View>
        </TouchableOpacity>
        {/* <Image
          source={require('../assets/Tibit.png')} // Replace with your logo image
          style={styles.logo}
        /> */}
        <View style={styles.profileContainer}>
          <Text style={styles.adminText}>John Smith</Text>
          {/* <View style={styles.iconContainer}>
            <Image
              source={require('../assets/profile.png')} // Replace with your profile icon
              style={styles.profileIcon}
            />
          </View> */}
        </View>
      </View>

      {/* Welcome Text */}
      <Text style={styles.welcomeText}>
        Healthcare Services at your door step
      </Text>

      {/* Service Cards */}
      <TouchableOpacity style={styles.card}>
        <Image
          source={require('../assets/appointment.png')} // Replace with your image
          style={styles.cardImage}
        />
        <View style={styles.cardOverlay}>
          <Text style={styles.cardText}>BOOK APPOINTMENT</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card}>
        <Image
          source={require('../assets/appointment.png')} // Replace with your image
          style={styles.cardImage}
        />
        <View style={styles.cardOverlay}>
          <Text style={styles.cardText}>MEDICAL HISTORY</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card}>
        <Image
          source={require('../assets/appointment.png')} // Replace with your image
          style={styles.cardImage}
        />
        <View style={styles.cardOverlay}>
          <Text style={styles.cardText}>LAB REPORTS</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 15,
    backgroundColor: '#f5f5f5',
  },

  header2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 22,
    paddingVertical: 15,
    backgroundColor: '#f5f5f5',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 5,
  },
  locationText: {
    fontSize: 16,
    color: '#333',
  },
  logo: {
    width: 100,
    height: 60,
    resizeMode: 'contain',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  adminText: {
    fontSize: 16,
    marginRight: 5,
    color: '#333',
  },
  profileIcon: {
    width: 20,
    height: 20,
    borderRadius: 16,
    alignSelf: 'center',
    marginTop: 6,
  },
  profileIcon2: {
    width: 30,
    height: 30,
    // borderRadius: 16,
    // alignSelf: 'center',
    // marginTop: 6,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#B13E4A',
  },
  card: {
    width: width * 0.9,
    height: 150,
    marginVertical: 10,
    alignSelf: 'center',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    resizeMode: 'cover',
  },
  cardOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  cardText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: width * 0.09,
    height: 35,
    // marginVertical: ,
    alignSelf: 'center',
    borderRadius: 30,
    overflow: 'hidden',
    elevation: 3,
    backgroundColor: appColors.jazzred,
  },

  scrollContainer: {
    flexGrow: 1, // Allows ScrollView to grow
    justifyContent: 'center', // Center content vertically
  },
});

export default HomeScreen;
