// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   FlatList,
//   Image,
//   ActivityIndicator,
//   Alert,
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import appColors from '../components/appcolors';
// import { useAppointments } from '../hooks/useAuth';
// import { useSelector } from 'react-redux';

// const BookingScreen = () => {
//   const [appointments, setAppointments] = useState([]); // State to store appointments
//   const [loading, setLoading] = useState(false); // State for loading indicator
//   const navigation = useNavigation();
//   const { mutate: fetchAppointments } = useAppointments(); // Use your custom hook
//   const selectedPatient = useSelector((state) => state.patients.selectedPatient);

//   // Fetch appointments when the screen loads
//   useEffect(() => {
//     setLoading(true);
//     fetchAppointments(
//       selectedPatient.patient_Id, // Replace with the actual patientId
//       {
//         onSuccess: (data) => {
//           setAppointments(data.data); // Update state with fetched appointments
//           setLoading(false);
//         },
//         onError: (error) => {
//           console.error('Failed to fetch appointments:', error);
//           Alert.alert('Error', 'Failed to fetch appointments. Please try again.');
//           setLoading(false);
//         },
//       }
//     );
//   }, []);

//   // Render item for FlatList
//   const renderAppointmentItem = ({ item }) => (
//     <View style={styles.appointmentItem}>
//             <Text style={styles.appointmentText}>Time: {item.appointment_Time}</Text>
//       <Text style={styles.appointmentText}>Time: {item.appointment_Time}</Text>

//       <Text style={styles.appointmentText}>Doctor: {item.consultant_Name}</Text>
//       <Text style={styles.appointmentText}>Date: {item.appointment_Date}</Text>
//       <Text style={styles.appointmentText}>Time: {item.appointment_Time}</Text>

//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       {/* <SafeAreaView style={styles.safeAreaHeader}> */}
//         <View style={styles.header}>
//           <TouchableOpacity style={styles.locationContainer} onPress={() => navigation.goBack()}>
//             <Image
//               source={require('../assets/backarrow.png')} // Replace with your back arrow icon
//               style={styles.icon}
//             />
//           </TouchableOpacity>
//           <Text style={styles.headerTitle}>Bookings</Text>
//           <Image
//             source={require('../assets/Vector.png')} // Replace with your profile icon
//             style={styles.icon2}
//           />
//         </View>
//       {/* </SafeAreaView> */}

//       {loading ? (
//         <ActivityIndicator size="large" color={appColors.jazzred} style={styles.loader} />
//       ) : appointments.length > 0 ? (
//         <FlatList
//           data={appointments}
//           renderItem={renderAppointmentItem}
//           keyExtractor={(item, index) => index.toString()} // Use unique IDs if available
//           contentContainerStyle={styles.listContainer}
//         />
//       ) : (
//         <View style={styles.emptyContainer}>
//           <Image
//             source={require('../assets/bookingscreen.png')} // Add your main logo here
//             style={styles.logo}
//           />
//           <Text style={styles.title}>No Bookings Yet</Text>
//           <Text style={styles.description}>
//             “Schedule your appointment quickly and easily. Choose your preferred service, date, and time for a seamless experience.”
//           </Text>
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
    
//     flex: 1,
//     // padding: 20,
//     backgroundColor: '#FFFFFF',
    

//   },

//   locationContainer: {
//     // marginRight:10,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     paddingVertical: 30,
//     backgroundColor: appColors.jazzred,
//   },
//   // header: {
//   //   flexDirection: 'row',
//   //   alignItems: 'center',
//   //   marginBottom: 30,
//   //   backgroundColor: '#A33E39',
//   //   paddingVertical: 25,
//   // },
//   headerTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#FFFFFF',
//   },

//   logo: {
//     marginTop:90,
//     // marginLeft:60, 
//     paddingHorizontal:190,
//     alignItems: 'center',
//     width: 200, // Adjust the size of the logo as needed
//     height: 200,

//     resizeMode: 'contain',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     color: '#A33E39',
//     marginBottom: 10,
//     marginTop:30,
//   },
//   description: {
//     paddingHorizontal: 20,

//     fontSize: 16,
//     textAlign: 'center',
//     color: '#000',
//     marginBottom: 30,
//   },
//   phoneNumber: {
//     fontWeight: 'bold',
//     color: '#A33E39',
//   },
//   otpContainer: {
//     paddingHorizontal: 20,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//   },
//   otpBox: {
//     width: 50,
//     height: 50,
//     borderWidth: 1,
//     borderColor: '#D9D9D9',
//     textAlign: 'center',
//     fontSize: 20,
//     borderRadius: 10,
//     color: '#A33E39',
//   },

//   backArrow: {
//     fontSize: 24,
//     color: '#FFFFFF', // White color for back arrow
//   },
//   resendContainer: {
//     alignItems: 'center',
//     marginBottom: 30,
//   },

//   icon: {
//     width: 0,
//     height: 0,
//     marginRight: 5,
//   },

//   icon2: {
//     width: 0,
//     height: 0,
//     marginRight: 5,
//   },
//   resendText: {
//     fontSize: 16,
//     color: '#000',
//   },
//   timer: {
//     color: '#A33E39',
//   },
//   resendLink: {
//     color: '#A33E39',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   verifyButton: {
//     marginHorizontal:20,
//     padding:20,
//     backgroundColor: appColors.jazzred,
//     paddingVertical: 15,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   verifyButtonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   loader: {
//     marginTop: 20,
//   },
//   listContainer: {
//     padding: 20,
//   },

//   appointmentItem: {
//     padding: 15,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 8,
//     marginBottom: 10,
//     backgroundColor: '#f9f9f9',
//   },
//   appointmentText: {
//     fontSize: 16,
//     color: '#333',
//   },
// });

// export default BookingScreen;




import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  Dimensions,
  Image,
  BackHandler,
  Alert,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { setSelectedPatient } from '../store/slices/patientsSlice';
import appColors from '../components/appcolors';
import { useAppointments } from '../hooks/useAuth';

const { width } = Dimensions.get('window');

// Custom Dropdown Component
const CustomDropdown = ({ data, onSelect, selectedValue }) => {
  const [isModalVisible, setModalVisible] = React.useState(false);

  const handleSelect = (item) => {
    onSelect(item); // Updates Redux State
    setModalVisible(false);
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.dropdownButtonText}>
          {selectedValue || 'Select a patient'}
        </Text>
        <Svg height={20} width={20} viewBox="0 0 24 24" fill="none">
          <Path d="M7 10l5 5 5-5H7z" fill="#000" />
        </Svg>
      </TouchableOpacity>

      <Modal visible={isModalVisible} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <FlatList
              data={data}
              keyExtractor={(item) => item.patient_Id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => handleSelect(item)}
                >
                  <Text style={styles.dropdownItemText}>
                    {item.patient_Name}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const BookingScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [appointments, setAppointments] = useState([]); // State to store appointments
  const [loading, setLoading] = useState(false); // State for loading indicator

  const patients = useSelector((state) => state.patients.list);
  const selectedPatient = useSelector((state) => state.patients.selectedPatient);
//   const appointmentsData = useSelector((state) => state.appointments?.list || []);
const { mutate: fetchAppointments } = useAppointments(); // Use your custom hook

  useEffect(() => {
    const backAction = () => {
      return true; // Prevent back button
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const handleMenuPress = () => {
    navigation.openDrawer(); // Open the drawer
  };

  useEffect(() => {
    setLoading(true);
    console.log("wjdsandasjda", selectedPatient?.patient_Id)
    selectedPatient?.patient_Id===undefined?"":
    fetchAppointments(
      selectedPatient?.patient_Id, // Replace with the actual patientId
      {
        onSuccess: (data) => {
          setAppointments(data.data); // Update state with fetched appointments
          setLoading(false);
        },
        onError: (error) => {
          console.error('Failed to fetch appointments:', error);
          Alert.alert('Error', 'Failed to fetch appointments. Please try again.');
          setLoading(false);
        },
      }
    );
  }, []);


  // Filter appointments based on selected patient
  const filteredAppointments =
    selectedPatient?.patient_Id !== 'all'
      ? appointments.filter(
          (item) => item.patient_Name === selectedPatient.patient_Name
        )
      : 
      appointments;

  const renderAppointment = ({ item }) => (
    <View style={styles.card}>
      {/* <View style={styles.iconWrapper}> */}
        {/* <Image
          source={require('../assets/appointment.png')} // Replace with your icon
          style={styles.profileIcon}
        /> */}
      {/* </View> */}
      <View style={styles.cardContent}>
        {/* <View style={styles.infoRow}>
          <Text style={styles.labelText}>Patient Name: </Text>
          <Text style={styles.valueText}>{item.patient_Name}</Text>
        </View> */}
        <View style={styles.infoRow}>
          <Text style={styles.labelText}>Appointment Date: </Text>
          <Text style={styles.valueText}>{ new Date(item.appointment_Date).toISOString().split('T')[0]}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.labelText}>Appointment Time: </Text>
          <Text style={styles.valueText}>{item.appointment_Time}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.labelText}>Doctor: </Text>
          <Text style={styles.valueText}>{item.consultant_Name}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.labelText}>Status: </Text>
          <Text style={styles.valueText}>{item.status}</Text>
        </View>
      </View>
      {/* <TouchableOpacity style={styles.viewDetailsBtn}>
        <Text style={styles.viewDetailsText}>View Details</Text>
      </TouchableOpacity> */}
    </View>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeAreaHeader}>
        <View style={styles.header}>
        <TouchableOpacity style={styles.locationContainer} onPress={handleMenuPress}>
<Image
            source={require('../assets/menu.png')} // Replace with your location icon
            style={styles.iconmenu}
            
          />
 
        </TouchableOpacity>
          <Text style={styles.headerTitle}>Appointments</Text>
          <Image
            source={require('../assets/Vector.png')}
            style={styles.icon2}
          />
        </View>
      </SafeAreaView>

      <View style={styles.container2}>
        <Text style={styles.title}>Appointment History</Text>
        <Text style={styles.subtitle}>
          A Detailed View of Your Scheduled and Past Appointments.
        </Text>

        <CustomDropdown
          data={patients}
          onSelect={(item) => dispatch(setSelectedPatient(item))}
          selectedValue={selectedPatient?.patient_Name || 'Select a patient'}
        />

        {filteredAppointments.length > 0 ? (
          <FlatList
            data={filteredAppointments}
            renderItem={renderAppointment}
            keyExtractor={(item) => item.appointment_ID.toString()}
          />
        ) : (
          <Text>No appointments available.</Text>
        )}
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container2: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#B13E2A',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  icon2: {
    width: 0,
    height: 0,
    marginRight: 10,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  dropdownButtonText: {
    fontSize: 16,
    color: '#333',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },

  
  modalContainer: {
    width: width * 0.8,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    maxHeight: 300,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#333',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#f4f4f4',
    borderRadius: 8,
    marginTop:12,
    padding: 12,
    marginBottom: 10,
    alignItems: 'center',
    elevation: 3,
  },
  iconWrapper: {
    backgroundColor: '#B13E2A',
    padding: 10,
    borderRadius: 8,
    marginRight: 10,
  },
  cardContent: {
    flex: 1,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  labelText: {
    fontSize: 14,
    color: appColors.jazzred, // Red color for labels
    fontWeight: 'bold',
  },
  valueText: {
    fontSize: 14,
    color: '#000', // Black color for values
  },
  viewDetailsBtn: {
    backgroundColor: '#B13E2A',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  viewDetailsText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },

});

export default BookingScreen;

