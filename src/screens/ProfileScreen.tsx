import React, { useState } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  FlatList,
  Alert,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Svg, { Path } from 'react-native-svg';
import appColors from '../components/appcolors';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { clearpatients, setSelectedPatient } from '../store/slices/patientsSlice';
import { logout } from '../store/slices/auth';
import { persistor } from '../store/store';
import { cleardoctors } from '../store/slices/doctorsSlice';
import { cleardepartments } from '../store/slices/departmentsSlice';
import { clearhospitals } from '../store/slices/hospitalsSlice';
import { useDrawer } from '../navigation/tab';
import { SafeAreaView } from 'react-native-safe-area-context'; // Import SafeAreaView

// Custom Dropdown Component
const CustomDropdown = ({ label, data, onSelect }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const dispatch = useDispatch();
  const selectedPatient = useSelector((state) => state.patients.selectedPatient);

  const handleSelect = (item) => {
    dispatch(setSelectedPatient(item)); // Update Redux state

    setSelectedItem(item);
    onSelect(item);
    setModalVisible(false);
  };



  return (
    <View style={styles.dropdownContainer}>
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.dropdownButtonText}>
          {selectedPatient ? selectedPatient.patient_Name : 'Select a patient'}
        </Text>
        <Svg height={20} width={20} viewBox="0 0 24 24" fill="none">
          <Path d="M7 10l5 5 5-5H7z" fill="#000" />
        </Svg>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <FlatList
              data={data}
              keyExtractor={(item) => item.patient_Id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => handleSelect(item)}>
                  <Text style={styles.modalItemText}>{item.patient_Name}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const ProfileScreen = ({ navigation, }) => {
  // const [selectedPatient, setSelectedPatient] = useState(null);
  const selectedPatient = useSelector((state) => state.patients.selectedPatient);
  const patients = useSelector((state) => state.patients.list);
  const dispatch = useDispatch();
  // const { toggleDrawer } = useDrawer();
  const handleMenuPress = () => {
    navigation.openDrawer(); // Open the drawer
  };
  

  const handleLogout = () => {
    dispatch(logout()); // Clears user data
    dispatch(clearpatients());
   

    // dispatch(clearPatients()); // Clears patient data
    persistor.purge(); // Clears persisted data from storage
    navigation.navigate("Welcome"); // Redirect to the login screen
  };


  const menuItems = [
    { id: 'dependents', label: 'My Dependents', icon: require('../assets/patients.png') },
    { id: 'privacy_policy', label: 'Privacy Policy', icon: require('../assets/privacyPolicy.png') },
    { id: 'delete_account', label: 'Delete Account', icon: require('../assets/deleteAccount.png') },
    { id: 'logout', label: 'Logout', icon: require('../assets/logout.png') },
  ];


  const handlePress = (itemId) => {
    switch (itemId) {
      case 'dependents':
        // Navigate or perform action for 'My Dependents'
        console.log("Navigating to My Dependents");
        Alert.alert('Coming Soon', 'This screen is currently under development.');

        // navigation.navigate('DependentsScreen'); // Example if using React Navigation
        break;
      case 'privacy_policy':
        // Navigate or perform action for 'Privacy Policy'
        console.log("Opening Privacy Policy");
        Alert.alert('Coming Soon', 'This screen is currently under development.');

        // navigation.navigate('PrivacyPolicyScreen');
        break;
      case 'delete_account':
        // Handle delete account logic
        console.log("Delete account triggered");
        Alert.alert('Coming Soon', 'This screen is currently under development.');
        break;
      case 'logout':
        handleLogout();
        break;
      default:
        console.log("Unknown button pressed");
    }
  };


  return (
    <View style={styles.container}>
      {/* Header */}
      <SafeAreaView style={styles.safeAreaHeader}>

      
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={handleMenuPress}>
          <Image source={require('../assets/menu.png')} style={styles.iconMenu} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <Image source={require('../assets/Vector.png')} style={styles.iconHidden} />
      </View>
      </SafeAreaView>


      {/* Content */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Profile Card */}
      <View style={styles.profileCard}>
  {/* Profile Image and Details */}
  <View style={styles.profileTopSection}>


  {/* <View style={styles.profileTopSection2}> */}

  <View style={styles.profileIcon}>

<Image source={require('../assets/Vector.png')} style={styles.icon} />


{/* </View> */}


  </View>

  
            <View style={styles.profileDetails}>
            <Text style={styles.name}>
                {selectedPatient ? selectedPatient.patient_Name : 'John Smith'}
              </Text>
            {/* <TouchableOpacity> */}
<Text style={styles.editProfile}>Edit Profile</Text>
{/* </TouchableOpacity> */}
    </View>
  </View>

  {/* Divider Line */}
  <View style={styles.divider} />

  {/* Additional Info Row */}
  <View style={styles.profileInfoRow}>
    <View style={styles.infoItem}>
      <Image source={require('../assets/profilered.png')} style={styles.infoIcon} />
      <Text style={styles.infoText}>
      {selectedPatient ? selectedPatient.gender : 'Male'}
      
        </Text>
    </View>
    <View style={styles.infoItem}>
      <Image source={require('../assets/phone2.png')} style={styles.infoIcon} />
      <Text style={styles.infoText}>
      {selectedPatient ? selectedPatient.mobile_Number : '+123 456 789'}

      </Text>
    </View>
    <View style={styles.infoItem}>
      <Image source={require('../assets/bookingred.png')} style={styles.infoIcon} />
      <Text style={styles.infoText}>
  {selectedPatient ? new Date(selectedPatient.dob).toISOString().split('T')[0] : '1990-01-01'}
</Text>
    </View>
  </View>
</View>


        {/* Change Patient */}
        <Text style={styles.sectionTitle}>Change Patient:</Text>
        <CustomDropdown
          data={patients}
          onSelect={(item) => setSelectedPatient(item)} label={undefined}        />

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
         <TouchableOpacity
         key={item.id}
         style={styles.menuItem}
         onPress={() => handlePress(item.id)} // Handle all button presses

        //  onPress={item.id === 'logout' ? handleLogout : null} // Only 'logout' is clickable
        //  disabled={item.id !== 'logout'} // Disable all other buttons
       >
         <Image source={item.icon} style={styles.menuIcon} />
         <Text style={styles.menuText}>{item.label}</Text>
       </TouchableOpacity>
        
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: appColors.jazzred,
  },
  headerTitle: {
    fontSize: 20,
    marginRight:20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  iconHidden: {
    width: 0,
    height: 0,
  },
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconMenu: {
    width: 24,
    height: 24,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  // profileCard: {
  //   backgroundColor: 'white',
  //   padding: 20,
  //   margin: 15,
  //   borderRadius: 10,
  //   elevation: 5,
  // },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrapper: {
    backgroundColor: '#B13E2A',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileTopSection2: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Push elements to opposite sides
    alignItems: 'center', // Center elements vertically
    marginBottom: 15,
  },

  profileIcon: {
    backgroundColor: '#B71C1C',
    padding: 30,
    borderRadius: 100,
    marginBottom: 10,
    alignSelf: 'center', // Center the profile icon horizontally
  },    icon: {
      // height: 20,
      // width:20,
      // color: appColors.Btnblack,
    },
  // profileDetails: {
  //   marginLeft: 15,
  //   flex: 1,
  // },
  name: {
    fontSize: 18,
    
    color: appColors.jazzred,

    fontWeight: 'bold',
  },
  mrNumber: {
    color: 'gray',
    marginTop: 5,
  },
  // editProfile: {
  //   color: '#b71c1c',
  //   marginTop: 5,
  //   fontSize: 14,
  // },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  infoBox: {
    alignItems: 'center',
    flex: 1,
  },
  // infoText: {
  //   marginTop: 5,
  //   color: '#333',
  //   fontSize: 14,
  // },
  sectionTitle: {
    fontSize: 16,
    marginLeft: 15,
    marginTop: 15,
    color: '#b71c1c',
    fontWeight: 'bold',
  },
  dropdownContainer: {
    marginHorizontal: 15,
    marginVertical: 10,
  },
  dropdownButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownButtonText: {
    fontSize: 14,
    color: '#333',
    fontWeight:'bold',
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  modalItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  modalItemText: {
    fontSize: 16,
    color: '#333',
  },
  closeButton: {
    marginTop: 15,
    backgroundColor: '#B71C1C',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  menuContainer: {
    marginHorizontal: 15,
    marginTop: 5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 2,
    borderRadius: 5,
    elevation: 3,
  },
  menuIcon: {
    width: 20,
    resizeMode: 'contain',

    height: 20,
    marginRight: 15,
  },
  menuText: {
    fontSize: 14,
    fontWeight:'bold',
    color: appColors.jazzred,
  },
  







  profileCard: {
    backgroundColor: '#8282821A',
    marginHorizontal: 15,
    marginTop:10,
    borderRadius: 20,
    padding: 20,
    elevation: 5,
    shadowColor: '#8282821A',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  profileTopSection: {
    // flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
  },
 
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: '#B71C1C',
    marginRight: 15,
  },
  profileDetails: {
    alignItems: 'center',

    // marginHorizontal:22,
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: appColors.jazzred,
    marginBottom: 5,
  },
  profileMrNumber: {
    fontSize: 14,
    color: '#777',
    marginBottom: 5,
  },
  editProfile: {
    fontSize: 14,
    color: '#B71C1C',
    textDecorationLine: 'underline',
  },
  divider: {
    height: 1,
    backgroundColor: appColors.txtgrey,
    marginVertical: 15,
  },
  profileInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoItem: {
    alignItems: 'center',
    flex: 1,
  },
  infoIcon: {
    width: 20,
    height: 20,
    marginBottom: 5,
  },
  infoText: {
    fontSize: 12,
    fontWeight:'bold',
    color: '#333',
  },




});

export default ProfileScreen;
function alert(arg0: string) {
  throw new Error('Function not implemented.');
}

