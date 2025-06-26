import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import StepIndicator from './stepIndicator';
import appColors from '../components/appcolors';
import { Picker } from '@react-native-picker/picker';
import { useDepartment, useDoctors, useHospital, useHospital1 } from '../hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { clearhospitals } from '../store/slices/hospitalsSlice';
import { cleardoctors } from '../store/slices/doctorsSlice';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import RNPickerSelect from 'react-native-picker-select';

const SelectDoctorScreen = ({ route, navigation }) => {
  const { selectedDate } = route.params;

  const [selectedHospital, setSelectedHospital] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');

  const { mutate: fetchDoctors } = useDoctors();
  const doctors = useSelector((state) => state.doctors.list);
  const { data: hospitals } = useHospital1();
  const { data: department } = useDepartment();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(cleardoctors());

    if (selectedHospital && selectedDepartment) {
      fetchDoctors(selectedDepartment);
    }
  }, [selectedHospital, selectedDepartment]);

  // Log hospital picker updates for debugging
  useEffect(() => {
    console.log('Selected Hospital:', selectedHospital);
    console.log('Available Hospitals:', hospitals);
  }, [selectedHospital, hospitals]);

  const handleNext = () => {
    if (selectedHospital && selectedDepartment && selectedDoctor) {
      navigation.navigate('DoctorAvailability', {
        selectedHospital,
        selectedDepartment,
        selectedDoctor,
        selectedDate,
      });
    } else {
      Alert.alert('Incomplete Selection', 'Please select all fields before proceeding.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SafeAreaView style={styles.safeAreaHeader}>
        <View style={styles.header2}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.icon}>
            <Image source={require('../assets/arrow-back.png')} style={styles.icon} />
          </TouchableOpacity>
          <Text style={styles.header}>Appointment Booking</Text>
        </View>
      </SafeAreaView>

      <StepIndicator step={2} />
      <Text style={styles.title}>Select Doctor</Text>

      {/* Hospital Picker */}
      <Text style={styles.cardLabel}>Hospital</Text>
      <View style={styles.card}>
      {hospitals?.data && hospitals?.data.length > 0 ? (
        <RNPickerSelect
          onValueChange={(value) => setSelectedHospital(value)}
          items={hospitals.data.map((hospital) => ({
            label: hospital.hospital_Name,
            value: hospital.hospital_ID,
          }))}
          placeholder={{
            label: 'Select Hospital',
            value: null,
            color: '#888',
          }}
          style={{
            inputIOS: styles.pickerIOS,
            inputAndroid: styles.picker,
            placeholder: { color: '#888' },
          }}
          value={selectedHospital}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text>No Hospitals available</Text>
        </View>
      )}
    </View>
  
      {/* Department Picker */}
      <Text style={styles.cardLabel}>Department</Text>
      <View style={styles.card}>
  {department?.data && department?.data.length > 0 && selectedHospital ? (
    <RNPickerSelect
      onValueChange={(value) => setSelectedDepartment(value)}
      items={department.data.map((dept) => ({
        label: dept.department_Name || "Unknown Department", // Handle missing department names
        value: dept.department_Id,
      }))}
      placeholder={{
        label: 'Select Department',
        value: null,
        color: '#888',
      }}
      style={{
        inputIOS: styles.pickerIOS,
        inputAndroid: styles.picker,
        placeholder: { color: '#888' },
      }}
      value={selectedDepartment}
    />
  ) : (
    <View style={styles.emptyContainer}>
      <Text>No departments available</Text>
    </View>
  )}
</View>


      {/* Doctor Picker */}
      <Text style={styles.cardLabel}>Doctor</Text>
      <View style={styles.card}>
  {doctors?.length > 0 && selectedDepartment ? (
    <RNPickerSelect
      onValueChange={(value) => setSelectedDoctor(value)}
      items={doctors.map((doctor) => ({
        label: doctor.emp_Name || "Unknown Doctor", // Handle missing doctor names
        value: doctor.emp_ID,
      }))}
      placeholder={{
        label: 'Select Doctor',
        value: null,
        color: '#888',
      }}
      style={{
        inputIOS: styles.pickerIOS,
        inputAndroid: styles.picker,
        placeholder: { color: '#888' },
      }}
      value={selectedDoctor}
    />
  ) : (
    <View style={styles.emptyContainer}>
      <Text>No doctors available</Text>
    </View>
  )}
</View>


      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', flexDirection: 'column' },
  header: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: 10,
    marginHorizontal: 30,
    color: appColors.jazzred,
  },
  title: { fontWeight: 'bold', fontSize: 26, textAlign: 'center', marginVertical: 20, color: '#333' },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginHorizontal: 20,
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
    marginTop: 10,
    marginHorizontal: 25,
  },
  picker: {
    height: 50,
    color: '#333',
  },
  icon: { height: 40, color: appColors.Btnblack },
  header2: { flexDirection: 'row', alignItems: 'center', paddingVertical: 20, marginHorizontal: 20 },
  nextButton: { backgroundColor: appColors?.jazzred, padding: 15, marginHorizontal: 25, marginBottom: 10, alignItems: 'center', borderRadius: 8, marginTop: 'auto' },
  nextButtonText: { color: '#fff', fontSize: 16 },
});

export default SelectDoctorScreen;
