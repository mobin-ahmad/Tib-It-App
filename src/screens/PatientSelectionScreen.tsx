import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // for radio button and icons

interface Patient {
  id: number;
  name: string;
  mrn: string;
  gender: string;
}

const AllPatientsScreen = () => {
  // Sample data for patients
  const patients: Patient[] = [
    { id: 1, name: 'John Smith', mrn: 'MR123456', gender: 'Male' },
    { id: 2, name: 'Sophia', mrn: 'MR654321', gender: 'Female' },
    { id: 3, name: 'John Smith', mrn: 'MR123456', gender: 'Male' },
    { id: 4, name: 'Sophia', mrn: 'MR654321', gender: 'Female' },
  ];

  const [selectedPatientId, setSelectedPatientId] = useState<number | null>(null);

  // Function to handle patient selection
  const handleSelectPatient = (id: number) => {
    setSelectedPatientId(id);
  };

  // Render individual patient card
  const renderPatientCard = ({ item }: { item: Patient }) => {
    const isSelected = selectedPatientId === item.id;
    return (
      <TouchableOpacity
        style={[styles.card, isSelected && styles.selectedCard]}
        onPress={() => handleSelectPatient(item.id)}>
        <View style={styles.cardContent}>
          <View style={styles.patientIconContainer}>
            <Icon name="user-circle" size={40} color="#A33E39" />
          </View>
          <View style={styles.patientInfo}>
            <Text style={styles.patientName}>{item.name}</Text>
            <Text style={styles.patientDetails}>{item.mrn}</Text>
            <Text style={styles.patientDetails}>{item.gender}</Text>
          </View>
          <View style={styles.radioButtonContainer}>
            <View
              style={[styles.radioButton, isSelected && styles.radioSelected]}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.headerTitle}>All Patients</Text>
      <Text style={styles.subHeader}>
        "Kindly choose a patient from the list above."
      </Text>

      {/* FlatList to display all patients */}
      <FlatList
        data={patients}
        renderItem={renderPatientCard}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />

      {/* Next Button */}
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => console.log('Proceed with patient:', selectedPatientId)}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#A33E39',
    marginBottom: 10,
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
    backgroundColor: '#555555',
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
});

export default AllPatientsScreen;
