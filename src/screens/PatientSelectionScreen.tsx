import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import appColors from "../components/appcolors";
import { setSelectedPatient } from "../store/slices/patientsSlice";
import { usePatient, usePatients } from "../hooks/useAuth";
import DateTimePicker from "@react-native-community/datetimepicker";
import RNPickerSelect from 'react-native-picker-select';

const { width } = Dimensions.get("window");

const AllPatientsScreen = ({ route }) => {
  const { phoneNumber } = route.params;

  const navigation = useNavigation();
  const patients = useSelector((state) => state.patients.list);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [dependentName, setDependentName] = useState("");
  const [dependentDetails, setDependentDetails] = useState("");


  const { mutate: addPatient, isLoading } = usePatient();



  const dispatch = useDispatch();
  const { mutate: fetchPatients } = usePatients();

  useEffect(() => {
    setLoading(true);
    fetchPatients(phoneNumber, {
      onSuccess: (data) => {
        setLoading(false);
      },
      onError: (error) => {
        console.error("Failed to fetch patients:", error);
        Alert.alert("Error", "Failed to fetch patients. Please try again.");
        setLoading(false);
      },
    });
  }, []);

  const handleSelectPatient = (patient) => {
    dispatch(setSelectedPatient(patient));
    setSelectedPatientId(patient.patient_Id);
  };

  const handleAddDependent = () => {
    if (!dependentName || !dob || !gender || !relation) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }


    const payload = {
      name: dependentName,
      mobileNumber: phoneNumber, // Replace this with a dynamic value if needed
      dob: dob.toISOString(), // Convert Date object to ISO string
      gender: gender,
      relation: relation,
    };
    console.log("Payload for Patient:", payload);
  
    // Call the bookAppointment function
    // confirmAppointment(payload);
    addPatient(payload, {
      onSuccess: () => {
        fetchPatients(phoneNumber);
        Alert.alert("Success", `Dependent ${dependentName} added successfully!`);
        setModalVisible(false);
        setDependentName("");
        setDob(null); // Reset DOB
        setGender("");
        setRelation("");
      },
      onError: (error) => {
        console.error("Add Dependent Error:", error);
        Alert.alert("Error", "Failed to add dependent. Please try again.");
      },
    });
  };
  const handleNext = () => {
    if (!selectedPatientId) {
      Alert.alert("Error", "Please select a patient.");
      return;
    }
    navigation.navigate("tabs");
  };

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [gender, setGender] = useState();
  const [dob, setDob] = useState(new Date());
  const [relation, setRelation] = useState("");

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDob(selectedDate);
    }
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
              source={require("../assets/Vector.png")}
              style={styles.profileIcon}
            />
          </View>
          <View style={styles.patientInfo}>
            <Text style={styles.patientName}>{item.patient_Name}</Text>
            <Text style={styles.patientDetails}>{item.mR_Number}</Text>
            <Text style={styles.patientDetails}>
              {item.gender === "M" ? "Male" : "Female"}
            </Text>
          </View>
          <View style={styles.radioButtonContainer}>
            <View
              style={[
                styles.radioButton,
                isSelected && styles.radioSelected,
              ]}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeAreaHeader}>
        <Text style={styles.headerTitle}>All Patients</Text>
        <Text style={styles.subHeader}>
          Kindly choose a patient from the list below.
        </Text>
      </SafeAreaView>
      <FlatList
        data={patients}
        renderItem={renderPatientCard}
        keyExtractor={(item) => item.patient_Id.toString()}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addDependentText}>Add Dependent</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>

      {/* Modal for adding dependents */}
      <Modal
        visible={isModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Dependent</Text>
            <TextInput
              style={styles.input}
              placeholder="Dependent Name"
              value={dependentName}
              onChangeText={setDependentName}
            />
            {/* <TextInput
              style={styles.input}
              placeholder="Dependent Details"
              value={dependentDetails}
              onChangeText={setDependentDetails}
            /> */}

<TouchableOpacity
            style={[styles.input, styles.datePicker]}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.dateText}>
              {dob ? dob.toLocaleDateString() : "DOB: (dd/mm/yyyy)"}
            </Text>
            {/* <Ionicons name="calendar" size={20} color="#999" /> */}
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={dob}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}

          <View style={styles.pickerContainer}>
<RNPickerSelect 
    onValueChange={(value) => setRelation(value)}
    items={[
      { label: "Father", value: "Father" },
      { label: "Mother", value: "Mother" },
      { label: "Sibling", value: "Sibling" },
      { label: "Spouse", value: "Spouse" },
    ]}
    placeholder={{
      label: "Relation *",
      value: "",
      color: "#9EA0A4", // Optional: Placeholder text color
    }}
    value={relation}
    style={{
      inputIOS: styles.picker, // Style for iOS
      inputAndroid: styles.picker, // Style for Android
      placeholder: { color: "#9EA0A4" }, // Style for placeholder
    }}
  />
            </View>


<Text style={styles.input2}>Gender: </Text>

<View style={styles.genderContainer}>
            {["Male", "Female", "Other"].map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.genderOption}
                onPress={() => setGender(option)}
              >
                <View
                  style={[
                    styles.radioButton,
                    gender === option && styles.radioButtonSelected,
                  ]}
                />
                <Text style={styles.genderText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>



            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButtonCancel}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButtonAdd}
                onPress={handleAddDependent}
              >
                <Text style={styles.modalButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFFFFF",
  },
  headerTitle: {
    marginTop: 30,
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: appColors?.jazzred,
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 14,
    textAlign: "center",
    color: "#000",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#F1F1F1",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  selectedCard: {
    borderColor: appColors?.jazzred,
    borderWidth: 2,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    width: width * 0.09,
    height: 35,
    marginHorizontal: 12,
    borderRadius: 30,
    overflow: "hidden",
    elevation: 3,
    backgroundColor: appColors.jazzred,
  },
  profileIcon: {
    width: 15,
    height: 15,
    borderRadius: 15,
    alignSelf: "center",
    marginTop: 10,
  },
  patientInfo: {
    flex: 1,
  },
  patientName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  patientDetails: {
    fontSize: 14,
    color: "#555",
  },
  radioButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  // radioButton: {
  //   height: 20,
  //   width: 20,
  //   borderRadius: 10,
  //   borderWidth: 2,
  //   borderColor: "#A33E39",
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  radioSelected: {
    backgroundColor: appColors.jazzred,
    height: 10,
    width: 10,
    borderRadius: 5,
  },
  separator: {
    height: 10,
  },
  addButton: {
    backgroundColor: "#AF35301A",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  addDependentText: {
    color: appColors.jazzred,
    fontSize: 16,
    fontWeight: "bold",
  },
  nextButton: {
    backgroundColor: appColors.jazzred,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  nextButtonText: {
    color: appColors?.Btnblack,
    fontSize: 16,
    fontWeight: "bold",
  },


  genderContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    marginBottom: 10,
  },
  genderOption: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: appColors.jazzred,
    marginRight: 5,
  },


  pickerContainer: {
    width: "100%",
    borderColor: "#DDD",
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  picker: {
    width: "100%",
    height: 50,
  },
  radioButtonSelected: {
    backgroundColor: appColors.jazzred,
  },
  genderText: {
    alignItems: "flex-start",
    color: "#000",
  },


  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 10,
    width: "90%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },

  input2: {
    width: "100%",
    // borderWidth: 1,
    // borderColor: "#CCC",
    // borderRadius: 10,
    padding: 10,
    // marginBottom: 10,
  },

  modalButtons: {
    flexDirection: "row",
    marginTop: 10,
  },
  modalButtonCancel: {
    backgroundColor: "#CCC",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginRight: 10,
  },
  modalButtonAdd: {
    backgroundColor: appColors.jazzred,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  modalButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AllPatientsScreen;
