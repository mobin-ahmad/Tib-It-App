// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
// import DocumentPicker from 'react-native-document-picker';

// export default function AppointmentDetailScreen() {
//   const [file, setFile] = useState(null);

//   const selectFile = async () => {
//     try {
//       const res = await DocumentPicker.pick({
//         type: [DocumentPicker.types.allFiles],
//       });
//       setFile(res);
//     } catch (err) {
//       if (DocumentPicker.isCancel(err)) {
//         console.log('User cancelled the picker');
//       } else {
//         throw err;
//       }
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Please provide the patient's details</Text>
//       <TextInput placeholder="Enter Phone Number" style={styles.input} />
//       <TextInput placeholder="Enter MR #" style={styles.input} />
//       <Text style={styles.label}>Add Prescription</Text>
//       <TouchableOpacity style={styles.uploadButton} onPress={selectFile}>
//         <Text style={styles.uploadButtonText}>Upload Document</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.confirmButton}>
//         <Text style={styles.confirmButtonText}>Confirm Appointment</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     padding: 20,
//   },
//   header: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   input: {
//     backgroundColor: '#f0f0f0',
//     marginBottom: 10,
//     padding: 10,
//     borderRadius: 8,
//   },
//   label: {
//     fontWeight: 'bold',
//     marginVertical: 10,
//   },
//   uploadButton: {
//     backgroundColor: '#8B1A1A',
//     padding: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   uploadButtonText: {
//     color: 'white',
//   },
//   confirmButton: {
//     backgroundColor: '#8B1A1A',
//     padding: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   confirmButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });


// screens/AppointmentDetailScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, FlatList, Image ,Modal,} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import StepIndicator from './stepIndicator';
import CheckBox from '@react-native-community/checkbox';
import DocumentPicker from 'react-native-document-picker';
import appColors from '../components/appcolors';
import { Picker } from '@react-native-picker/picker';
import RadioForm from 'react-native-simple-radio-button'; // Install via npm
import Svg, { Path } from 'react-native-svg';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { clearpatients, setSelectedPatient } from '../store/slices/patientsSlice';
import { persistor } from '../store/store';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAppointment } from '../hooks/useAuth';
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


const AppointmentDetailScreen = ({ route, navigation }) => {
  const { formattedDate, selectedDoctor, selectedTime,selectedHospital } = route.params;
  // const [selectedHospital, setSelectedHospital] = useState('');
  const [gender, setGender] = useState(null);

  const [phoneNumber, setPhoneNumber] = useState('');
  const [mrNumber, setMrNumber] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [files, setFiles] = useState([]);

  const selectedPatient = useSelector((state) => state.patients.selectedPatient);
  const patients = useSelector((state) => state.patients.list);
  const dispatch = useDispatch();


  const { mutate: confirmAppointment, isLoading } = useAppointment();





  const radio_props = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
  ];
  const selectFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
        allowMultiSelection: true,
      });
      setFiles([...files, ...res]);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the picker');
      } else {
        throw err;
      }
    }
  };

  const removeFile = (uri) => {
    setFiles(files.filter((file) => file.uri !== uri));
  };

  // const handleConfirmAppointment = () => {
  //   if (!termsAccepted) {
  //     Alert.alert("Please accept the Terms & Conditions");
  //     return;
  //   }

  //   const payload = {
  //     appointmentDto: {
  //     formattedDate, // Ensure this is a valid "YYYY-MM-DD" string
  //     selectedDoctor,
  //     phoneNumber: selectedPatient.mobile_Number,
  //     patientId: selectedPatient.patient_Id,
  //     patientName: selectedPatient.patient_Name,
  //     dob: selectedPatient.dob, // Ensure this is an ISO date string
  //     selectedHospital,
  //     selectedTime
  //   }
  //   };
  
  //   console.log("Payload for Booking:", payload);
  
  //   confirmAppointment(payload);
  // };


  const handleConfirmAppointment = () => {
    if (!termsAccepted) {
      Alert.alert("Please accept the Terms & Conditions");
      return;
    }
  

    const formattedTime = `${selectedTime}:00`;


    // Check if all required fields are defined
    console.log("selectedDoctor:", selectedDoctor);
    console.log("selectedDate:", formattedDate);
    console.log("selectedPatientdob:", selectedPatient.dob);
    console.log("selectedHospital:", selectedHospital);
    console.log("selectedTime:", formattedTime);
    console.log("selectedPatient.patient_Id,", selectedPatient.patient_Id);
    console.log("selectedPatient.patient_Name", selectedPatient.patient_Name);
    console.log("selectedPatient.mobile_Number", selectedPatient.mobile_Number);
    
    
    
  
    // Create the booking data correctly
    const payload = {
      patient_Name: selectedPatient.patient_Name,
      phoneNumber: selectedPatient.mobile_Number,
      dob: selectedPatient.dob, // Ensure this is in ISO format
      patientId: selectedPatient.patient_Id,

      consultant_ID: selectedDoctor.toString(), // Convert to string if necessary
      app_Date: formattedDate, // Ensure this is in "YYYY-MM-DD" format
      time: formattedTime, // Ensure this is in "HH:mm:ss" format
      hospital_ID: selectedHospital,
    };
  
    // Check the final payload being sent
    console.log("Payload for Booking:", payload);
  
    // Call the bookAppointment function
    confirmAppointment(payload);
  
    // Alert.alert("Appointment Confirmed!");
    // navigation.navigate("Home");
  };
  


  return (
    <View style={styles.container}>
            <SafeAreaView style={styles.safeAreaHeader}>

      <View style={styles.header2}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.icon}>
          <Image
            source={require('../assets/arrow-back.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
        <Text style={styles.header}>Appointment Booking</Text>
      </View>
      </SafeAreaView>
      <StepIndicator step={4} />

      <View style={styles.containerContent}>
        <Text style={styles.subHeader}>Patient's details.</Text>

        <View style={styles.card}>
          {/* <Text style={styles.label}>Choose Patient</Text> */}
          <CustomDropdown
          data={patients}
          onSelect={(item) => setSelectedPatient(item)}
        />
        </View>

 <View style={styles.card}>
        <Text style={styles.NameText}>
      {selectedPatient ? selectedPatient.mobile_Number : '+123 456 789'}

      </Text>
       </View>

        {/* <TextInput
          style={styles.input}
          placeholder="Enter Phone Number *"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        /> */}

        {/* <TextInput
          style={[styles.input, styles.optionalInput]}
          placeholder="Enter MR # (optional)"
          value={mrNumber}
          onChangeText={setMrNumber}
        /> */}


{/* <Text style={styles.subHeader}>Gender *</Text>
        <RadioForm
          radio_props={radio_props}
          initial={-1}
          formHorizontal={true}
          labelHorizontal={true}
          buttonColor={'#B13E2A'}
          selectedButtonColor={'#B13E2A'}
          onPress={(value) => setGender(value)}
          labelStyle={styles.radioLabel}
          buttonSize={10}
        /> */}

        <Text style={styles.prescriptionLabel}>Add Prescription.</Text>

        <TouchableOpacity style={styles.uploadButton} onPress={selectFile}>
          <Text style={styles.uploadButtonText}>Upload Document(s)</Text>
        </TouchableOpacity>

        {files.length > 0 && (
          <FlatList
            data={files}
            keyExtractor={(item) => item.uri}
            renderItem={({ item }) => (
              <View style={styles.fileItem}>
                <Text style={styles.fileName}>{item.name}</Text>
                <TouchableOpacity onPress={() => removeFile(item.uri)}>
                  <Icon name="close" size={20} color="#B71C1C" />
                </TouchableOpacity>
              </View>
            )}
          />
        )}
      </View>

      {/* Checkbox and Confirm Button at the bottom */}
      <View style={styles.bottomContainer}>
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={termsAccepted}
            onValueChange={setTermsAccepted}
            tintColors={{ true: '#B13E2A', false: '#333' }}
          />
          <Text style={styles.checkboxText}>I have accepted the <Text style={styles.termsText}>Terms & Conditions</Text></Text>
        </View>

        <TouchableOpacity
          style={styles.nextButton}
          onPress={handleConfirmAppointment}
        >
          <Text style={styles.confirmButtonText}>Confirm Appointment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({


    
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: 10,
    marginHorizontal: 30,
    color: appColors.jazzred,
  },
  subHeader: { fontSize: 18, color: appColors.jazzred, marginBottom: 10, fontWeight: 'bold',marginTop:10,},
  inputContainer: {
    
    marginVertical: 0 },
  label: { fontSize: 16, color: '#333', fontWeight: 'bold' },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },

  dropdownContainer: {
    marginHorizontal: 15,
    marginVertical: 10,
  },
  dropdownButton: {
    backgroundColor: '#fff',
    // padding: 15,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownButtonText: {
        // marginHorizontal: 15,

    fontSize: 14,
    color: '#333',
    fontWeight:'bold',
    // flex: 1,
  },


  NameText: {
    marginVertical: 10,
    // marginHorizontal: 15,

fontSize: 14,
color: '#333',
fontWeight:'bold',
// flex: 1,
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
  sectionTitle: {
    fontSize: 16,
    marginLeft: 15,
    marginTop: 15,
    color: '#b71c1c',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 10,
    // marginHorizontal: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
    marginHorizontal: 25,
  },
  picker: {
    height: 50,
    color: '#333',
  },
  pickerItem: {
    fontSize: 16,
    color: '#666',
    fontWeight: 'bold',
  },

  header2: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    marginHorizontal: 20,
  },
  containerContent: {
    marginHorizontal: 20,
    flexGrow: 1,
  },



  genderLabel: {
    alignSelf: 'flex-start',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#B13E2A',
  },
  radioLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    marginRight: 40,
    color: '#333',
    
  },
  dropdownText: { fontSize: 16, color: '#333' },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginVertical: 10,
    fontSize: 16,
  },
  optionalInput: {  },
  prescriptionLabel: { fontSize: 16, color: '#B71C1C', marginVertical: 20, fontWeight: 'bold' },
  uploadButton: {
    backgroundColor: '#B71C1C',
    padding: 10,
    alignItems: 'center',
    borderRadius: 8,
    marginVertical: 10,
  },
  uploadButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  fileItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  fileName: { fontSize: 14, color: '#333' },
  bottomContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  checkboxText: { fontSize: 14, color: '#333',marginHorizontal:12, },
  termsText: { color: '#B71C1C', fontWeight: 'bold' },
  nextButton: {
    backgroundColor: '#B71C1C',
    padding: 15,
    marginHorizontal: 5,
    alignItems: 'center',
    borderRadius: 8,
  },
  confirmButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default AppointmentDetailScreen;
