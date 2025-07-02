import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, Dimensions, Image, BackHandler } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Svg, { Path } from 'react-native-svg'; // Example of custom icon
import appColors from '../components/appcolors';
import { setSelectedPatient } from '../store/slices/patientsSlice';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { useLabReports } from '../hooks/useAuth';
import { SafeAreaView } from 'react-native-safe-area-context'; // Import SafeAreaView
import { Linking } from 'react-native';

const { width } = Dimensions.get('window');

// Custom Dropdown Component
const CustomDropdown = ({ data, onSelect, selectedValue, handleContinue }) => {
  const [isModalVisible, setModalVisible] = React.useState(false);

  const handleSelect = (item) => {
    onSelect(item); // Updates Redux State
    setModalVisible(false);
    handleContinue(); // Trigger API call
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

const ReportScreen = ({ navigation }) => {
  // const navigation = useNavigation();
  const dispatch = useDispatch();

  const patients = useSelector((state) => state.patients.list);
  const selectedPatient = useSelector((state) => state.patients.selectedPatient);
  const { mutate: fetchLabReports, data: labData, isLoading, isError } = useLabReports();
  const [selectedTest, setSelectedTest] = useState(null);



  useEffect(() => {
    const backAction = () => {
 
      return true; // Prevent default back button behavior
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    // Cleanup listener on unmount
    return () => backHandler.remove();
  }, []);





  const handleVerify = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'tabs' }],
    });
  
  };



  // Fetch Medical History API call
  const handleContinue = () => {
    if (!selectedPatient) return;

    console.log(
      `Fetching Lab reports for ID: ${selectedPatient.patient_Id}`
    );

    fetchLabReports(selectedPatient.patient_Id, {
      onSuccess: () => {
        console.log('Reports fetched successfully!');
      },
      onError: (error) => {
        if (error.response?.status === 404) {
          console.log("gggggggg",error.response?.status );

          // Alert.alert('No medical history records found for this patient.');
        } else {
          console.log("gggggggg",error.response?.status );
          
          // Alert.alert('Error', 'Failed to fetch medical history. Please try again.');
        }
      },
    });
  };

  // Fetch data when selectedPatient changes
  useEffect(() => {
    handleContinue();
  }, [selectedPatient]);

  // Filter data based on selected patient
  // const LabReports = useSelector(
  //   (state) => state.labreport?.Reports || []
  // );

  console.log("LabReports",labData?.data);
  
  const filteredData =
  selectedPatient?.patient_Id !== 'all'
    ? labData?.data.labTestData.filter((item) =>
        labData?.data.patientDetails?.fullName === selectedPatient.patient_Name
      )
    :
     labData?.data.labTestData;



  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => setSelectedTest(item.testDetails)}>

  

    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text>
          <Text style={styles.labelText}>Patient Number: </Text>
          <Text style={styles.valueText}>{item.patientDetails?.fullName}</Text>
        </Text>
        <Text>
          <Text style={styles.labelText}>Lab Test Id: </Text>
          <Text style={styles.valueText}>{item.labTestID}</Text>
        </Text>
        <Text>
          <Text style={styles.labelText}>Date: </Text>
          <Text style={styles.valueText}>{item.createdTime}</Text>
        </Text>
      </View>
      <TouchableOpacity
        style={styles.downloadBtn}
        onPress={() => {
          // Open the download link in the browser
          Linking.openURL(labData?.data.downloadLink)
            .catch(err => console.error('Failed to open URL:', err));
        }}      >
        <Svg height={24} width={24} viewBox="0 0 24 24" fill="none">
          <Path
            d="M12 16V4M8 12l4 4 4-4"
            stroke="#AF3530"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M4 20h16"
            stroke="#AF3530"
            strokeWidth={2}
            strokeLinecap="round"
          />
        </Svg>
      </TouchableOpacity>
    </View>
    </TouchableOpacity>

  );




  // Render Test Details Modal
  const renderTestDetailsModal = () => (
    <Modal visible={selectedTest !== null} transparent animationType="fade">
      <TouchableOpacity
        style={styles.modalOverlay}
        onPress={() => setSelectedTest(null)} // Close modal when overlay is clicked
      >
        <View style={styles.modalContainer}>
          {selectedTest?.map((test, index) => (
            <View key={index} style={styles.modalContent}>
              <Text style={styles.testName}>{test.testName}</Text>
              <Text style={styles.testDate}>Date: {test.testDate}</Text>
            </View>
          ))}
        </View>
      </TouchableOpacity>
    </Modal>
  );



  return (
    <View style={styles.container}>

<SafeAreaView style={styles.safeAreaHeader}>

<View style={styles.header}>
        <TouchableOpacity style={styles.locationContainer}onPress={handleVerify}>
        {/* onPress={() => drawer.current.closeDrawer()} */}

          <Image
            source={require('../assets/backarrow.png')} // Replace with your location icon
            style={styles.icon}
            
          />
          {/* <Text style={styles.locationText}>Lahore</Text> */}
        </TouchableOpacity>
        <Text style={styles.headerTitle}>LAB Reports</Text>

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

      </SafeAreaView>
      <View style={styles.container2}>


      <Text style={styles.title}>LAB Reports</Text>
      <Text style={styles.subtitle}>All cases with reports of selected patient</Text>

      {/* Custom Dropdown */}
      {/* <CustomDropdown
        data={patients}
        onSelect={(item) => setSelectedPatient(item.label === 'All Patients' ? 'all' : item.label)}
        selectedValue={selectedPatient === 'all' ? 'All Patients' : selectedPatient}
      /> */}

<CustomDropdown
          data={patients}
          onSelect={(item) => dispatch(setSelectedPatient(item))}
          selectedValue={selectedPatient?.patient_Name || 'Select a patient'}
          handleContinue={handleContinue}
        />


      {/* List of reports */}
      {filteredData?.length > 0 ? (
  <FlatList
    data={filteredData}
    renderItem={renderItem}
    // keyExtractor={(item) => item.patient_ID.toString()} // Use patient_ID as key
    style={{ marginTop: 20 }}
  />
) : (
  <Text>No Lab Reports available.</Text> // Provide fallback text when no records are available
)}
      {/* <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={{ marginTop: 20 }}
      /> */}
    </View>
    {renderTestDetailsModal()}

    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // padding: 16,
  },
  container2: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: appColors.jazzred,
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
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

  icon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },

  labelText: {
    fontSize: 14,
    color: appColors.jazzred, // Red color for labels
    fontWeight: 'bold',
  },
  valueText: {
    fontSize: 14,
    color: 'black', // Black color for values
  },
  icon2: {
    width: 0,
    height: 0,
    marginRight: 10,
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
    // maxHeight: 300,
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
    padding: 12,
    marginBottom: 10,
    alignItems: 'center',
    elevation: 3,
  },
  cardContent: {
    flex: 1,
  },
  infoText: {
    fontSize: 14,
    marginBottom: 4,
  },
  downloadBtn: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 4,
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
    color: appColors?.Btnblack,
  },
  
  modalContent: {
    marginBottom: 15,
  },
  testName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  testDate: {
    fontSize: 14,
    color: 'gray',
  },
 
});

export default ReportScreen;
