import React, {useRef, useState} from 'react';
import {
  Image,
  Text,
  View,
  Button,
  DrawerLayoutAndroid,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import HomeIcon from '../assets/Vector.png'; // Ensure correct icons
import SendIcon from '../assets/Vector.png';
import SettingsIcon from '../assets/Vector.png';
import appColors from '../components/appcolors';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';

const Tab = createBottomTabNavigator();

export function Tabs() {
  const drawer = useRef(null);
  const [drawerPosition, setDrawerPosition] = useState('left');

  const navigationView = () => (
    <View style={styles.drawerContainer}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image
          source={require('../assets/Vector.png')} // Replace with your avatar image
          style={styles.profileImage}
        />
        <View>
          <Text style={styles.profileName}>John Smith</Text>
          <Text style={styles.profileDetails}>MR #: 12345678</Text>
          <Text style={styles.profileDetails}>ID #: 012345678</Text>
        </View>
        <TouchableOpacity onPress={() => drawer.current.closeDrawer()} style={styles.closeIcon}>
          <Text style={styles.closeText}>X</Text>
        </TouchableOpacity>
      </View>

      {/* Drawer Items */}
      <View style={styles.drawerItems}>
        <DrawerItem label="My Account" icon={HomeIcon} />
        <DrawerItem label="Bookings" icon={SendIcon} />
        <DrawerItem label="Members" icon={SettingsIcon} />
        <DrawerItem label="Notifications" icon={SettingsIcon} />
        <DrawerItem label="Profile" icon={SettingsIcon} />
      </View>

      {/* About Us, Contact Us, Logout */}
      <View style={styles.drawerBottomItems}>
        <DrawerItem label="About Us" icon={SettingsIcon} />
        <DrawerItem label="Contact Us" icon={SettingsIcon} />
        <DrawerItem label="Logout" icon={SettingsIcon} style={styles.logoutItem} />
      </View>
    </View>
  );

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      drawerPosition={drawerPosition}
      renderNavigationView={navigationView}>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: styles.tabBar,
          headerShown: false,
        }}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <TabBarIcon icon={HomeIcon} label="Home" focused={focused} />
            ),
          }}
        />
        <Tab.Screen
          name="Send"
          component={LoginScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <TabBarIcon icon={SendIcon} label="Send" focused={focused} />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={LoginScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <TabBarIcon icon={SettingsIcon} label="Settings" focused={focused} />
            ),
          }}
        />
      </Tab.Navigator>
    </DrawerLayoutAndroid>
  );
}

// Drawer item component
const DrawerItem = ({label, icon, style}) => (
  <TouchableOpacity style={[styles.drawerItem, style]}>
    <Image source={icon} style={styles.drawerIcon} />
    <Text style={styles.drawerLabel}>{label}</Text>
  </TouchableOpacity>
);

// TabBar icon component
const TabBarIcon = ({icon, label, focused}) => (
  <View style={styles.imgcontainer}>
    <Image
      source={icon}
      style={{
        tintColor: focused ? appColors.white : appColors.txtgrey,
      }}
    />
    <Text
      style={{
        color: focused ? appColors.white : appColors.txtgrey,
        fontFamily: focused ? 'InterExtraBold' : 'InterRegular',
      }}>
      {label}
    </Text>
    {focused && <View style={styles.tabBarLine} />}
  </View>
);

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ccc', // Adjust background as needed
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  profileName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  profileDetails: {
    fontSize: 14,
    color: '#666',
  },
  closeIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  closeText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  drawerItems: {
    marginTop: 20,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  drawerIcon: {
    width: 24,
    height: 24,
    marginRight: 20,
    tintColor: '#B13E4A', // Match the icon color to your design
  },
  drawerLabel: {
    fontSize: 16,
    color: '#333',
  },
  drawerBottomItems: {
    marginTop: 'auto', // Pushes the items to the bottom
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  logoutItem: {
    paddingTop: 10,
  },
  tabBar: {
    height: hp('9%'),
    elevation: 0,
    borderRadius: 24,
    position: 'absolute',
    bottom: hp('2%'),
    left: wp('5%'),
    right: wp('5%'),
    backgroundColor: appColors.Btnblack,
    alignItems: 'center',
    shadowColor: appColors.txtgrey,
    shadowOffset: {
      width: 0,
      height: hp('1%'),
    },
  },
  imgcontainer: {
    alignItems: 'center',
  },
  tabBarLine: {
    height: hp('0.5%'),
    width: wp('10%'),
    backgroundColor: appColors.white,
    marginTop: 4,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});

export default Tabs;
