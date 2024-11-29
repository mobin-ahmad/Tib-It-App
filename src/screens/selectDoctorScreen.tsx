// import React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import { Picker } from '@react-native-picker/picker';

// export default function SelectDoctorScreen({ navigation }) {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Select Doctor</Text>
//       <Picker style={styles.picker}>
//         <Picker.Item label="Hospital Name" value="" />
//       </Picker>
//       <Picker style={styles.picker}>
//         <Picker.Item label="Department Name" value="" />
//       </Picker>
//       <Picker style={styles.picker}>
//         <Picker.Item label="Doctor Name" value="" />
//       </Picker>
//       <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('DoctorAvailability')}>
//         <Text style={styles.nextButtonText}>Next</Text>
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
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   picker: {
//     backgroundColor: '#f0f0f0',
//     marginBottom: 20,
//   },
//   nextButton: {
//     backgroundColor: '#8B1A1A',
//     padding: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   nextButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });


// screens/SelectDoctorScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import StepIndicator from './stepIndicator';
import appColors from '../components/appcolors';
import { Picker } from '@react-native-picker/picker';
import { useDepartment, useDoctors, useHospital, useHospital1 } from '../hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { clearhospitals } from '../store/slices/hospitalsSlice';
import { cleardoctors } from '../store/slices/doctorsSlice';

const SelectDoctorScreen = ({ route, navigation }) => {
  const { selectedDate } = route.params;

  // States for selected values
  const [selectedHospital, setSelectedHospital] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');

  const { mutate: fetchDoctors } = useDoctors();
  const doctors = useSelector((state) => state.doctors.list);
  // const { mutate: fetchHospitals } = useHospital();
  const {data:hospitals,} = useHospital1();
  // const Hospitals = useSelector((state) => state.hospitals.list);
  // const { mutate: fetchDepartments } = useDepartment();
  // const departments = useSelector((state) => state.departments.list);
  const {data:department} = useDepartment();



  const dispatch = useDispatch();


// console.log(hospitals?.data, "data ashkdcbas");



  // useEffect(() => {

    // Fetch hospitals and departments on component mount
    // fetchHospitals();
    // fetchDepartments();
  // }, []);

  useEffect(() => {
    // Clear doctors and fetch them only if a valid department is selected
    dispatch(cleardoctors());

    if (selectedHospital && selectedDepartment) {
      fetchDoctors(selectedDepartment);
    }
  }, [selectedHospital, selectedDepartment]);

  const handleNext = () => {
    if (selectedHospital && selectedDepartment && selectedDoctor) {
      navigation.navigate('DoctorAvailability', { 
        selectedHospital, 
        selectedDepartment, 
        selectedDoctor, 
        selectedDate 
      });
    } else {
      Alert.alert('Incomplete Selection', 'Please select all fields before proceeding.');
    }
  };

  

  return (
    <View style={styles.container}>
      <View style={styles.header2}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.icon}>
          <Image
            source={require('../assets/arrow-back.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
        <Text style={styles.header}>Appointment Booking</Text>
      </View>

      <StepIndicator step={2} />
      <Text style={styles.title}>Select Doctor</Text>

      {/* Hospital Picker */}
      <Text style={styles.cardLabel}>Hospital</Text>
      <View style={styles.card}>
      {hospitals?.data && hospitals?.data.length > 0 ? (
        <Picker
          selectedValue={selectedHospital}
          onValueChange={(itemValue) => setSelectedHospital(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select Hospital" value="" color="#888" />
          {hospitals?.data && hospitals?.data.map((hospital) => (
            <Picker.Item
              key={hospital.hospital_ID}
              label={hospital.hospital_Name}
              value={hospital.hospital_ID}
            />
          ))}
        </Picker>
          ) : (
            <View style={styles.emptyContainer}>
              <Text>No Hospitals available</Text>
            </View>
               )}
      </View>

      {/* Department Picker */}
      <Text style={styles.cardLabel}>Department</Text>
      <View style={styles.card}>
         {department?.data && department?.data.length > 0 ? (
        <Picker
          selectedValue={selectedDepartment}
          onValueChange={(itemValue) => setSelectedDepartment(itemValue)}
          style={styles.picker}
          enabled={!!selectedHospital} // Enable only if a hospital is selected
        >
          <Picker.Item label="Select Department" value="" color="#888" />
          {department?.data && department?.data.map((department) => (
            <Picker.Item
              key={department.department_Id}
              label={department.department_Name}
              value={department.department_Id}
            />
          ))}
        </Picker>
          ) : (
            <View style={styles.emptyContainer}>
              <Text>No departments available</Text>
            </View>
               )}
      </View>







      {/* Doctor Picker */}
      <Text style={styles.cardLabel}>Doctor</Text>
      <View style={styles.card}>
      {doctors && doctors.length > 0 ? (
        <Picker
          selectedValue={selectedDoctor}
          onValueChange={(itemValue) => setSelectedDoctor(itemValue)}
          style={styles.picker}
          enabled={!!selectedDepartment} // Enable only if a department is selected
        >
          <Picker.Item label="Select Doctor" value="" color="#888" />
          {doctors && doctors.map((doctor) => (
            <Picker.Item
              key={doctor.emp_ID}
              label={doctor.emp_Name}
              value={doctor.emp_ID}
            />
          ))}
        </Picker>
         ) : (
          <View style={styles.emptyContainer}>
            <Text>No doctors available</Text>
          </View>
             )}
      </View>

      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', flexDirection: 'column' },
  header: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: 10,
    marginHorizontal:30,
    color: appColors.jazzred,
  },  selectedDate: { fontSize: 16, textAlign: 'center', marginVertical: 10, color: '#666' },
  title: { fontWeight: 'bold', fontSize: 26, textAlign: 'center', marginVertical: 20, color: '#333' },
  
  // Card style for Picker
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
    // marginBottom: 5,
    marginTop:10,
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
  icon: { height: 40, color: appColors.Btnblack },
  header2: { flexDirection: 'row', alignItems: 'center', paddingVertical: 20, marginHorizontal: 20 },
  nextButton: { backgroundColor: '#B71C1C', padding: 15, marginHorizontal: 25, marginBottom: 10, alignItems: 'center', borderRadius: 8, marginTop: 'auto' },
  nextButtonText: { color: '#fff', fontSize: 16 },
});

export default SelectDoctorScreen;
