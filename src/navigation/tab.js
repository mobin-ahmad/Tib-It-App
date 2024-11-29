// import React, { useRef, useState } from 'react';
// import {
//   Image,
//   Text,
//   View,
//   DrawerLayoutAndroid,
//   StyleSheet,
//   TouchableOpacity,
// } from 'react-native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';

// import HomeIcon from '../assets/account.png';
// import NotificationIcon from '../assets/notifications.png';
// import BookingIcon from '../assets/bookingdrawer.png';

// import ProfileIcon from '../assets/Vector.png';
// import LogoutIcon from '../assets/logout.png';
// import ContactUs from '../assets/contactus.png';
// import AboutUs from '../assets/aboutus.png';
// import Patients from '../assets/patients.png';



// import appColors from '../components/appcolors';
// import HomeScreen from '../screens/HomeScreen';
// import NotificationScreen from '../screens/NotificationScreen';
// import BookingScreen from '../screens/BookingScreen';
// import ProfileScreen from '../screens/ProfileScreen';
// import { useSelector } from 'react-redux';

// const Tab = createBottomTabNavigator();

// export function Tabs() {
//   const drawer = useRef(null);
//   const [drawerPosition, setDrawerPosition] = useState('left');
//   const selectedPatient = useSelector((state) => state.patients.selectedPatient);

//   const navigationView = () => (
//     <View style={styles.drawerContainer}>
//       {/* Profile Section */}
//       <View style={styles.profileSection}>
//       <View style={styles.profileIcon}>

// <Image source={require('../assets/Vector.png')} style={styles.icon} />


// </View>
//         <View>
//           <Text style={styles.profileName}>
//           {selectedPatient ? selectedPatient.patient_Name : 'John Smith'}
//           </Text>
//           {/* <Text style={styles.profileDetails}>MR #: 12345678</Text>
//           <Text style={styles.profileDetails}>ID #: 012345678</Text> */}
//         </View>
//         <TouchableOpacity onPress={() => drawer.current.closeDrawer()} style={styles.closeIcon}>
//           <Text style={styles.closeText}>X</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Drawer Items */}
//       <View style={styles.drawerItems}>
//         <DrawerItem label="My Account" icon={HomeIcon} />
//         <DrawerItem label="My Dependents" icon={Patients} />

//         <DrawerItem label="Bookings" icon={BookingIcon} />
      
//       </View>

//       {/* About Us, Contact Us, Logout */}
//       <View style={styles.drawerBottomItems}>
//         <DrawerItem label="About Us" icon={AboutUs} />
//         <DrawerItem label="Contact Us" icon={ContactUs} />
//         <DrawerItem label="Logout" icon={LogoutIcon} style={styles.logoutItem} />
//       </View>
//     </View>
//   );

//   return (
//     <DrawerLayoutAndroid
//       ref={drawer}
//       drawerWidth={300}
//       drawerPosition={drawerPosition}
//       renderNavigationView={navigationView}
//       >
//       <Tab.Navigator
//         screenOptions={{
//           tabBarShowLabel: false,
//           tabBarStyle: styles.tabBar,
//           headerShown: false,
//         }}>
//         <Tab.Screen
//           name="Home"
//           children={({ navigation }) => <HomeScreen navigation={navigation} drawer={drawer} />}
//           options={{
//             tabBarIcon: ({ focused }) => (
//               <TabBarIcon icon={HomeIcon} label="Home" focused={focused} />
//             ),
//           }}
//         />

//         <Tab.Screen
//           name="Appointments"
//           component={BookingScreen}
//           options={{
//             tabBarIcon: ({ focused }) => (
//               <TabBarIcon icon={BookingIcon} label="Appointments" focused={focused} />
//             ),
//           }}
//         />

//         <Tab.Screen
//           name="Notifications"
//           component={NotificationScreen}
//           options={{
//             tabBarIcon: ({ focused }) => (
//               <TabBarIcon icon={NotificationIcon} label="Notifications" focused={focused} />
//             ),
//           }}
//         />

//         <Tab.Screen
//           name="Profile"
//           children={({ navigation }) => <ProfileScreen navigation={navigation} drawer={drawer} />}
//           options={{
//             tabBarIcon: ({ focused }) => (
//               <TabBarIcon icon={ProfileIcon} label="Profile" focused={focused} />
//             ),
//           }}
//         />
//       </Tab.Navigator>
//     </DrawerLayoutAndroid>
//   );
// }

// // Drawer item component
// const DrawerItem = ({ label, icon, style }) => (
//   <TouchableOpacity style={[styles.drawerItem, style]}>
//     <Image source={icon} style={styles.drawerIcon} />
//     <Text style={styles.drawerLabel}>{label}</Text>
//   </TouchableOpacity>
// );

// // TabBar icon component
// const TabBarIcon = ({ icon, label, focused }) => (
//   <View style={styles.iconContainer}>
//     {/* Spotlight effect */}
//     {focused && <View style={styles.spotlight} />}
//     <Image
//       source={icon}
//       style={[styles.icon, { tintColor: focused ? appColors.jazzred : '#888' }]}
//     />
//     <Text style={[styles.iconLabel, focused && styles.focusedLabel]}>
//       {label}
//     </Text>
//   </View>
// );

// const styles = StyleSheet.create({
//   drawerContainer: {
//     flex: 1,
//     backgroundColor: '#fff',
//     // paddingTop: 20,
//   },
//   profileSection: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 20,
    
//     // background: #484B4D;

//     // backgroundColor: '#484B4D',
//   },
//   profileImage: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     marginRight: 10,
//   },
//   profileName: {
//     fontSize: 20,
//     marginLeft:10,
//     color:appColors.jazzred,
//     fontWeight: 'bold',
//   },
//   profileDetails: {
//     fontSize: 14,
//     color: '#666',
//   },
//   closeIcon: {
//     position: 'absolute',
//     right: 10,
//     // color:appColors.manclrwhite,
//     top: 10,
//   },
//   closeText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   drawerItems: {
//     marginTop: 'auto',
//     marginHorizontal:20,
//     borderTopWidth: 2,
//     borderTopColor: appColors.jazzred,
//         marginTop: 0,
//   },
//   drawerItem: {
    
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 15,
//     // paddingHorizontal: 20,
//   },


//   profileIcon: { backgroundColor: '#B71C1C', padding: 30, borderRadius: 50, marginBottom: 0 },

//   drawerIcon: {
//     width: 20,
//     height: 20,
//     marginRight: 20,
//     // tintColor: '#B13E4A',
//     resizeMode: 'contain',

//   },
//   drawerLabel: {
//     fontSize: 16,
//     color: '#333',
//   },
//   drawerBottomItems: {
//     marginTop: 'auto',
//     borderTopWidth: 2,
//     borderTopColor: '#eee',
//     marginHorizontal:20,

//   },
//   logoutItem: {
//     paddingTop: 10,
//   },
//   tabBar: {
//     height: hp('9%'),
//     backgroundColor: appColors.Btnblack,
//     // borderTopLeftRadius: 24,
//     // borderTopRightRadius: 24,
//     position: 'absolute',
//     // bottom: hp('2%'),
//     // left: wp('5%'),
//     // right: wp('5%'),
//   },
//   iconContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   spotlight: {
//     position: 'absolute',
//     top: -10,
//     width: 60,
//     height: 60,
//     backgroundColor: 'rgba(163, 62, 57, 0.2)', // Red spotlight color with transparency
//     borderRadius: 30,
//   },
//   icon: {
//     width: 20,
//     height: 20,
//     resizeMode: 'contain',

//   },
//   iconLabel: {
//     fontSize: 12,
//     color: '#888', // Grey color for unfocused icons
//     marginTop: 2,
//   },
//   focusedLabel: {
//     color: appColors.jazzred, // Red color for focused icon text
//     fontWeight: 'bold',
//   },
// });

// export default Tabs;




import React, { useRef, createContext, useContext, useState } from 'react';
import {
  Image,
  Text,
  View,
  DrawerLayoutAndroid,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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
  const Tab = createBottomTabNavigator();

  // Create a context for managing the drawer reference
  const DrawerContext = createContext();

  export function Tabs() {

 



    const drawer = useRef(null);
    const [isDrawerOpen, setDrawerOpen] = useState(false);

    const selectedPatient = useSelector((state) => state.patients.selectedPatient);
    const toggleDrawer = () => {
      if (isDrawerOpen) {
        drawer.current.closeDrawer();
      } else {
        drawer.current.openDrawer();
      }
      setDrawerOpen(!isDrawerOpen);
    };

    const navigationView = () => (
      <View style={styles.drawerContainer}>
        <View style={styles.profileSection}>
          <View style={styles.profileIcon}>
            <Image source={require('../assets/Vector.png')} style={styles.icon} />
          </View>
          <Text style={styles.profileName}>
            {selectedPatient ? selectedPatient.patient_Name : 'John Smith'}
          </Text>
          <TouchableOpacity
            onPress={() => drawer.current.closeDrawer()}
            style={styles.closeIcon}
          >
            <Text style={styles.closeText}>X</Text>
          </TouchableOpacity>
        </View>
        {/* Drawer Items */}
        <View style={styles.drawerItems}>
        <DrawerItem
        label="My Account"
        icon={require('../assets/account.png')}
        navigateTo="Profile" // Navigates to the Profile screen
      />
      <DrawerItem
        label="My Dependents"
        icon={require('../assets/patients.png')}
        navigateTo="Profile" // Navigates to the Profile screen
      />
      <DrawerItem
        label="Bookings"
        icon={require('../assets/bookingdrawer.png')}
        navigateTo="Appointments" // Navigates to the Appointments screen
      />
        </View>
        <View style={styles.drawerBottomItems}>
          <DrawerItem label="About Us" icon={require('../assets/aboutus.png')}
          navigateTo="aboutus"
          />
          <DrawerItem label="Contact Us" icon={require('../assets/contactus.png')}
          navigateTo="contactus"
          />
          <DrawerItem
            label="Logout"
            icon={require('../assets/logout.png')}
            style={styles.logoutItem}
            navigateTo="logout"
            // onLogout={handleLogout} // Pass handleLogout here
          />
        </View>
      </View>
    );

    return (
      <DrawerContext.Provider value={{ toggleDrawer }}>
        <DrawerLayoutAndroid
          ref={drawer}
          drawerWidth={300}
          drawerPosition="left"
          renderNavigationView={navigationView}
          onDrawerOpen={() => setDrawerOpen(true)} // Sync state when drawer opens
          onDrawerClose={() => setDrawerOpen(false)}
                >
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
                tabBarIcon: ({ focused }) => (
                  <TabBarIcon
                    icon={require('../assets/account.png')}
                    label="Home"
                    focused={focused}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="Appointments"
              component={BookingScreen}
              options={{
                tabBarIcon: ({ focused }) => (
                  <TabBarIcon
                    icon={require('../assets/bookingdrawer.png')}
                    label="Appointments"
                    focused={focused}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="Notifications"
              component={NotificationScreen}
              options={{
                tabBarIcon: ({ focused }) => (
                  <TabBarIcon
                    icon={require('../assets/notifications.png')}
                    label="Notifications"
                    focused={focused}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="Profile"
              component={ProfileScreen}
              options={{
                tabBarIcon: ({ focused }) => (
                  <TabBarIcon
                    icon={require('../assets/Vector.png')}
                    label="Profile"
                    focused={focused}
                  />
                ),
              }}
            />
          </Tab.Navigator>
        </DrawerLayoutAndroid>
      </DrawerContext.Provider>
    );
  }

  // DrawerItem Component
  // const DrawerItem = ({ label, icon, style }) => (
  //   <TouchableOpacity style={[styles.drawerItem, style]}>
  //     <Image source={icon} style={styles.drawerIcon} />
  //     <Text style={styles.drawerLabel}>{label}</Text>
  //   </TouchableOpacity>
  // );

  const DrawerItem = ({ label, icon, style, navigateTo, }) => {
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
  if (navigateTo === "aboutus") {
    // Handle "aboutus" navigation logic here
    console.log("Navigating to About Us");
  } else if (navigateTo === "contactus") {
    // Handle "contactus" navigation logic here
    console.log("Navigating to Contact Us");
  } else if (navigateTo === "logout") {
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


  // TabBarIcon Component
  const TabBarIcon = ({ icon, label, focused }) => (
    <View style={styles.iconContainer}>
      {focused && <View style={styles.spotlight} />}
      <Image
        source={icon}
        style={[styles.icon, { tintColor: focused ? '#B71C1C' : '#888' }]}
      />
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


  profileIcon: { backgroundColor: '#B71C1C', padding: 30, borderRadius: 50, marginBottom: 0 },

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
    height: hp('9%'),
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
    backgroundColor: 'rgba(163, 62, 57, 0.2)', // Red spotlight color with transparency
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