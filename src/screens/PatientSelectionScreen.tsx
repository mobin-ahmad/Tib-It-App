import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import appColors from '../components/appcolors';
import { useDispatch } from 'react-redux';
import { setSelectedPatient } from '../store/slices/patientsSlice';

const { width } = Dimensions.get('window');

const AllPatientsScreen = () => {
  const navigation = useNavigation();
  const patients = useSelector((state) => state.patients.list); // Access patients from Redux
  const [selectedPatientId, setSelectedPatientId] = useState<number | null>(null);
  const dispatch = useDispatch();

  // const handleSelectPatient = (id) => {
  //   setSelectedPatientId(id);
  // };

  const handleSelectPatient = (patient) => {
    dispatch(setSelectedPatient(patient)); // Update Redux state
    setSelectedPatientId(patient.patient_Id); // Update local state
  };

  const handleVerify = () => {
    navigation.navigate("tabs");
    // Handle OTP verification here
  
  };

  const renderPatientCard = ({ item }) => {
    const isSelected = selectedPatientId === item.patient_Id;
    return (
      <TouchableOpacity
        style={[styles.card, isSelected && styles.selectedCard]}
        onPress={() => handleSelectPatient(item)}
      >
        <View style={styles.cardContent}>
          <View style={styles.iconContainer}>
            <Image
              source={require('../assets/Vector.png')}
              style={styles.profileIcon}
            />
          </View>
          <View style={styles.patientInfo}>
            <Text style={styles.patientName}>{item.patient_Name}</Text>
            <Text style={styles.patientDetails}>{item.mR_Number}</Text>
            <Text style={styles.patientDetails}>{item.gender === 'M' ? 'Male' : 'Female'}</Text>
          </View>
          <View style={styles.radioButtonContainer}>
            <View style={[styles.radioButton, isSelected && styles.radioSelected]} />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>All Patients</Text>
      <Text style={styles.subHeader}>Kindly choose a patient from the list below.</Text>
      <FlatList
        data={patients}
        renderItem={renderPatientCard}
        keyExtractor={(item) => item.patient_Id.toString()}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />

<TouchableOpacity
        style={styles.nextButton}
        onPress={handleVerify}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

// Include styles...
// export default AllPatientsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    marginTop:30,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#A33E39',
    marginBottom: 10,
  },


  profileIcon: {
    width: 15,
    height: 15,
    borderRadius: 15,
    alignSelf: 'center',
    marginTop: 10,
  },

  iconContainer: {
    width: width * 0.09,
    height: 35,
    marginHorizontal:12,
    // marginVertical: ,
    alignSelf: 'center',
    borderRadius: 30,
    overflow: 'hidden',
    elevation: 3,
    backgroundColor: appColors.jazzred,
  },
  subHeader: {
    fontSize: 14,
    textAlign: 'center',
    color: '#000',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#F1F1F1',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedCard: {
    borderColor: '#A33E39',
    borderWidth: 2,
  },
  cardContent: {
    
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  patientIconContainer: {
    marginRight: 15,
  },
  patientInfo: {
    flex: 1,
  },
  patientName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  patientDetails: {
    fontSize: 14,
    color: '#555',
  },
  radioButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButton: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#A33E39',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    backgroundColor: '#A33E39',
    height: 10,
    width: 10,
    borderRadius: 5,
  },
  separator: {
    height: 10,
  },
  nextButton: {
    backgroundColor:  appColors.jazzred,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },



  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
});

export default AllPatientsScreen;
