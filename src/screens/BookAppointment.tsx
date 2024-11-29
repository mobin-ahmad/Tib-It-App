import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  FlatList,Image
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import DocumentPicker from 'react-native-document-picker';
import MapView from 'react-native-maps';
import { RadioButton } from 'react-native-paper';
import appColors from '../components/appcolors';
import { useNavigation } from '@react-navigation/native';

const hospitals = [
  { id: '1', label: 'Hospital A' },
  { id: '2', label: 'Hospital B' },
];
const doctors = [
  { id: '1', label: 'Doctor X' },
  { id: '2', label: 'Doctor Y' },
];

// Custom Dropdown Component
const CustomDropdown = ({ label, data, onSelect }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSelect = (item) => {
    setSelectedItem(item);
    onSelect(item);
    setModalVisible(false);
  };

  return (
    <View style={styles.dropdownContainer}>
      <Text style={styles.dropdownLabel}>{label}</Text>
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.dropdownButtonText}>
          {selectedItem ? selectedItem.label : 'Select an option'}
        </Text>
      </TouchableOpacity>

      {/* Modal for dropdown items */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <FlatList
              data={data}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => handleSelect(item)}>
                  <Text style={styles.modalItemText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const AppointmentScreen = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [hospital, setHospital] = useState('');
  const [doctor, setDoctor] = useState('');
  const [patientName, setPatientName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [mrNumber, setMRNumber] = useState('');
  const [cnic, setCnic] = useState('');
  const [dob, setDob] = useState('');
  const [cnicOf, setCnicOf] = useState('self');
  const [gender, setGender] = useState('Male');
  const navigation = useNavigation();

  const [location, setLocation] = useState({
    latitude: 31.5497,
    longitude: 74.3436,
  });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [document, setDocument] = useState(null);

  // Function to handle document picker
  const handleDocumentUpload = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      setDocument(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User canceled the upload');
      } else {
        console.error('Unknown error: ', err);
      }
    }
  };

  const handleConfirmAppointment = () => {
    if (
      !hospital ||
      !doctor ||
      !patientName ||
      !phoneNumber ||
      !cnic ||
      !dob ||
      !termsAccepted
    ) {
      alert('Please fill in all required fields');
      return;
    }
    // API Call to confirm appointment
    alert('Appointment Confirmed!');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}


<View style={styles.header}>
        <TouchableOpacity style={styles.locationContainer}
                onPress={() => navigation.goBack()}

        >

          <Image
            source={require('../assets/backarrow.png')} // Replace with your location icon
            style={styles.icon}
            
          />
          {/* <Text style={styles.locationText}>Lahore</Text> */}
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Appointment</Text>

        {/* <View style={styles.profileContainer}> */}
          {/* <Text style={styles.adminText}>Admin</Text> */}
          {/* <View style={styles.iconContainer}> */}
            <Image
              source={require('../assets/Vector.png')} // Replace with your profile icon
              style={styles.icon2}
            />
          {/* </View> */}
        {/* </View> */}
      </View>
      {/* Calendar */}

      <View style={styles.container2}>

      <Text style={styles.sectionTitle}>Please select date</Text>
      <Calendar
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: appColors.jazzred, },
        }}
        theme={{
          todayTextColor: '#B50000',
          arrowColor: '#B50000',
        }}
      />

      {/* Custom Dropdowns for Hospital and Doctor */}
      <CustomDropdown
        label="Select Hospital *"
        data={hospitals}
        onSelect={(item) => setHospital(item.label)}
      />
      <CustomDropdown
        label="Select Doctor *"
        data={doctors}
        onSelect={(item) => setDoctor(item.label)}
      />

      {/* Patient Details */}
      <Text style={styles.subSectionTitle}>
        Please provide the patient&apos;s details.
      </Text>
      <TextInput
      placeholderTextColor="#888"
        style={styles.input}
        placeholder="Enter Patient Name *"
        value={patientName}
        onChangeText={setPatientName}
      />
      <TextInput
      placeholderTextColor="#888"
        style={styles.input}
        placeholder="Enter Phone Number *"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
      />
      <TextInput
      placeholderTextColor="#888"
        style={styles.input}
        placeholder="Enter MR # (optional)"
        value={mrNumber}
        onChangeText={setMRNumber}
      />
      <TextInput
      placeholderTextColor="#888"
        style={styles.input}
        placeholder="CNIC/B-form *"
        value={cnic}
        onChangeText={setCnic}
      />
      <TextInput
      placeholderTextColor="#888"
        style={styles.input}
        placeholder="Date of Birth *"
        value={dob}
        onChangeText={setDob}
      />

      {/* CNIC of Radio Buttons */}
      <Text style={styles.sectionTitle}>CNIC of:</Text>
      <RadioButton.Group onValueChange={setCnicOf} value={cnicOf}>
  <View style={styles.radioRow}>
    <RadioButton 
      value="self" 
      color={cnicOf === "self" ? "red" : undefined} 
    />
    <Text>Self</Text>
    <RadioButton 
      value="father" 
      color={cnicOf === "father" ? "red" : undefined} 
    />
    <Text>Father</Text>
    <RadioButton 
      value="mother" 
      color={cnicOf === "mother" ? "red" : undefined} 
    />
    <Text>Mother</Text>
    <RadioButton 
      value="guardian" 
      color={cnicOf === "guardian" ? "red" : undefined} 
    />
    <Text>Guardian</Text>
  </View>
</RadioButton.Group>

      {/* Document Upload */}
      <Text style={styles.sectionTitle}>Attachment</Text>
      <TouchableOpacity style={styles.button} onPress={handleDocumentUpload}>
        <Text style={styles.buttonText}>Upload Document</Text>
      </TouchableOpacity>
      {document && <Text>Document uploaded: {document[0].name}</Text>}

      {/* Gender Radio Buttons */}
      <Text style={styles.sectionTitle}>Gender</Text>
      <RadioButton.Group onValueChange={setGender} value={gender}>
        <View style={styles.radioRow}>
          <RadioButton value="Male" 
           color={gender === "Male" ? "red" : undefined} 
          />
          <Text>Male</Text>
          
          <RadioButton value="Female" 
           color={gender === "Female" ? "red" : undefined} 
          />
          <Text>Female</Text>
        </View>
      </RadioButton.Group>

      {/* Location Section */}
      <Text style={styles.sectionTitle}>Location</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Change Location</Text>
      </TouchableOpacity>

      {/* Terms & Conditions */}
      <TouchableOpacity
        style={styles.checkboxRow}
        onPress={() => setTermsAccepted(!termsAccepted)}>
        <Text style={styles.checkboxText}>
          {termsAccepted ? '[✔]' : '[    ]'}   I accept the Terms & Conditions
        </Text>
      </TouchableOpacity>

      {/* Confirm Appointment Button */}
      <TouchableOpacity
        style={styles.confirmButton}
        onPress={handleConfirmAppointment}>
        <Text style={styles.confirmButtonText}>Confirm Appointment</Text>
      </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    // padding: 20,
    backgroundColor: '#fff',
    
  },

  container2: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: appColors.jazzred,
  },
  sectionTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    color:appColors.jazzred,
    marginVertical: 10,
  },
  subSectionTitle: {
        textAlign: 'center',
        fontWeight: 'bold',
    fontSize: 16,
    color: appColors.jazzred,
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: appColors.jazzred,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  confirmButton: {
    backgroundColor: appColors.jazzred,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 20,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  radioRow: {
    // color:appColors.jazzred,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  map: {
    height: 200,
    marginVertical: 10,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  checkboxText: {
    fontSize: 16,
  },
  dropdownContainer: {
    marginVertical: 10,
  },
  dropdownLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  dropdownButton: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#fff',
  },
  dropdownButtonText: {
    fontSize: 16,
    color: '#000',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
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
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  modalItemText: {
    fontSize: 16,
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
    // marginRight:10,
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

});

export default AppointmentScreen;
