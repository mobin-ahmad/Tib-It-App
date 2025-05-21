import React, { useEffect } from 'react';
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


  useEffect(() => {
    setLoading(true);
    fetchAppointments(
      selectedPatient.patient_Id, // Replace with the actual patientId
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
      ? appointmentsData.filter(
          (item) => item.patient_Name === selectedPatient.patient_Name
        )
      : appointmentsData;

  const renderAppointment = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.iconWrapper}>
        <Image
          source={require('../assets/appointment.png')} // Replace with your icon
          style={styles.profileIcon}
        />
      </View>
      <View style={styles.cardContent}>
        <View style={styles.infoRow}>
          <Text style={styles.labelText}>Patient Name: </Text>
          <Text style={styles.valueText}>{item.patient_Name}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.labelText}>Appointment Date: </Text>
          <Text style={styles.valueText}>{item.appointment_Date}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.labelText}>Doctor: </Text>
          <Text style={styles.valueText}>{item.doctor_Name}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.viewDetailsBtn}>
        <Text style={styles.viewDetailsText}>View Details</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeAreaHeader}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.locationContainer}
            onPress={() => navigation.goBack()}
          >
            <Image
              source={require('../assets/backarrow.png')}
              style={styles.icon}
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

