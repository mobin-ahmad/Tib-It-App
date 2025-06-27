import React, { useRef, createContext, useContext, useState } from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer'; // Import Drawer Navigator
import { useDispatch, useSelector } from 'react-redux';
import appColors from '../components/appcolors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import HomeScreen from '../screens/HomeScreen';
import BookingScreen from '../screens/BookingScreen';
import NotificationScreen from '../screens/NotificationScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { useNavigation } from '@react-navigation/native';
import { logout } from '../store/slices/auth';
import { persistor } from '../store/store';
import { clearpatients } from '../store/slices/patientsSlice';
import { cleardoctors } from '../store/slices/doctorsSlice';
import { cleardepartments } from '../store/slices/departmentsSlice';
import { clearhospitals } from '../store/slices/hospitalsSlice';
import { SafeAreaView } from 'react-native-safe-area-context'; // Import SafeAreaView

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator(); // Initialize Drawer Navigator

// Create a context for managing the drawer reference
const DrawerContext = createContext();

export function Tabs() {
  const selectedPatient = useSelector((state) => state.patients.selectedPatient);


  const drawerRef = useRef(null); // Reference for drawer

  // Function to toggle the drawer
  const toggleDrawer = () => {
    if (drawerRef.current) {
      drawerRef.current.toggleDrawer();
    }
  };




  const navigationView = () => (

    <View style={styles.drawerContainer}>
      <SafeAreaView style={styles.safeAreaHeader}>

      <View style={styles.profileSection}>
        <View style={styles.profileIcon}>
          <Image source={require('../assets/Vector.png')} style={styles.icon} />
        </View>
        <Text style={styles.profileName}>
          {selectedPatient ? selectedPatient.patient_Name : 'John Smith'}
        </Text>
      
      </View>
      </SafeAreaView>
      {/* Drawer Items */}
      <View style={styles.drawerItems}>
        <DrawerItem label="My Account" icon={require('../assets/account.png')} navigateTo="Profile" />
        <DrawerItem label="My Dependents" icon={require('../assets/patients.png')} navigateTo="Profile" />
        <DrawerItem label="Bookings" icon={require('../assets/bookingdrawer.png')} navigateTo="Appointments" />
      </View>
      <View style={styles.drawerBottomItems}>
        <DrawerItem label="About Us" icon={require('../assets/aboutus.png')} navigateTo="aboutus" />
        <DrawerItem label="Contact Us" icon={require('../assets/contactus.png')} navigateTo="contactus" />
        <DrawerItem label="Logout" icon={require('../assets/logout.png')} style={styles.logoutItem} navigateTo="logout" />
      </View>
    </View>
  );

 
  return (
    <DrawerContext.Provider value={{ toggleDrawer }}>
      <Drawer.Navigator
        screenOptions={{
          drawerPosition: 'left',
          headerShown: false,
        }}
        drawerContent={navigationView}
        // ref={drawerRef} // Pass the drawerRef here

      >
        <Drawer.Screen name="Tabs" component={TabsScreen} />
      </Drawer.Navigator>
    </DrawerContext.Provider>
  );
}

// DrawerItem Component
const DrawerItem = ({ label, icon, style, navigateTo }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch(); // Get the dispatch function

  const handleLogout = () => {
    Alert.alert('Error', 'Logout successfully.');

    dispatch(logout()); // Clears user data
    dispatch(clearpatients());
    dispatch(cleardoctors());
    dispatch(cleardepartments());
    dispatch(clearhospitals());

    navigation.reset({
      index: 0,
      routes: [{ name: 'Welcome' }], // Redirect to the login screen
    });
  };

  const handlePress = () => {
    if (navigateTo === 'aboutus') {
      // Handle "aboutus" navigation logic here
      console.log('Navigating to About Us');
    } else if (navigateTo === 'contactus') {
      // Handle "contactus" navigation logic here
      console.log('Navigating to Contact Us');
    } else if (navigateTo === 'logout') {
      handleLogout(); // Invoke handleLogout function
    } else {
      navigation.navigate(navigateTo); // Navigate to other screens
    }
  };

  return (
    <TouchableOpacity style={[styles.drawerItem, style]} onPress={handlePress}>
      <Image source={icon} style={styles.drawerIcon} />
      <Text style={styles.drawerLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

// TabNavigator Component
const TabsScreen = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarShowLabel: false,
      tabBarStyle: styles.tabBar,
      headerShown: false,
    }}
  >
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarIcon: ({ focused }) => <TabBarIcon icon={require('../assets/account.png')} label="Home" focused={focused} />,
      }}
    />
    <Tab.Screen
      name="Appointments"
      component={BookingScreen}
      options={{
        tabBarIcon: ({ focused }) => <TabBarIcon icon={require('../assets/bookingdrawer.png')} label="Appointments" focused={focused} />,
      }}
    />
    <Tab.Screen
      name="Notifications"
      component={NotificationScreen}
      options={{
        tabBarIcon: ({ focused }) => <TabBarIcon icon={require('../assets/notifications.png')} label="Notifications" focused={focused} />,
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarIcon: ({ focused }) => <TabBarIcon icon={require('../assets/Vector.png')} label="Profile" focused={focused} />,
      }}
    />
  </Tab.Navigator>
);

// TabBarIcon Component
const TabBarIcon = ({ icon, label, focused }) => (
  <View style={styles.iconContainer}>
    {focused && <View style={styles.spotlight} />}
    <Image source={icon} style={[styles.icon, { tintColor: focused ? appColors?.jazzred : '#888' }]} />
    <Text style={[styles.iconLabel, focused && styles.focusedLabel]}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: '#fff',
    // paddingTop: 20,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    
    // background: #484B4D;

    // backgroundColor: '#484B4D',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  profileName: {
    fontSize: 20,
    marginLeft:10,
    color:appColors.jazzred,
    fontWeight: 'bold',
    marginHorizontal:10,
  },
  profileDetails: {
    fontSize: 14,
    color: '#666',
  },
  closeIcon: {
    position: 'absolute',
    right: 10,
    // color:appColors.manclrwhite,
    top: 10,
  },
  closeText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  drawerItems: {
    marginTop: 'auto',
    marginHorizontal:20,
    borderTopWidth: 2,
    borderTopColor: appColors.jazzred,
        marginTop: 0,
  },
  drawerItem: {
    
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    // paddingHorizontal: 20,
  },


  profileIcon: { backgroundColor: appColors.jazzred, padding: 30, borderRadius: 50, marginBottom: 0 },

  drawerIcon: {
    width: 20,
    height: 20,
    marginRight: 20,
    // tintColor: '#B13E4A',
    resizeMode: 'contain',

  },
  drawerLabel: {
    fontSize: 16,
    color: '#333',
  },
  drawerBottomItems: {
    marginTop: 'auto',
    borderTopWidth: 2,
    borderTopColor: '#eee',
    marginHorizontal:20,

  },
  logoutItem: {
    paddingTop: 10,
  },
  tabBar: {
    height: hp('10%'),
    backgroundColor: appColors.Btnblack,
    // borderTopLeftRadius: 24,
    // borderTopRightRadius: 24,
    position: 'absolute',
    // bottom: hp('2%'),
    // left: wp('5%'),
    // right: wp('5%'),
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  spotlight: {
    position: 'absolute',
    top: -10,
    width: 60,
    height: 60,
    backgroundColor: appColors.headerColor, // Red spotlight color with transparency
    borderRadius: 30,
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',

  },
  iconLabel: {
    fontSize: 12,
    color: '#888', // Grey color for unfocused icons
    marginTop: 2,
  },
  focusedLabel: {
    color: appColors.jazzred, // Red color for focused icon text
    fontWeight: 'bold',
  },
});

export const useDrawer = () => useContext(DrawerContext);

export default Tabs;
