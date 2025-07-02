      // import React, { useEffect, useState } from 'react';
      // import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, Dimensions, Image, Alert } from 'react-native';
      // import Svg, { Path } from 'react-native-svg'; // Example of custom icon
      // import appColors from '../components/appcolors';
      // import { useNavigation } from '@react-navigation/native';
      // import { serverRoutes } from '../routes/serverRoutes';
      // import { api, authApi } from '../config/axiosConfig';
      // import { useDispatch, useSelector } from 'react-redux';
      // import { useMedicalHistory } from '../hooks/useAuth';
      // import { setSelectedPatient } from '../store/slices/patientsSlice';

      // const { width } = Dimensions.get('window');

      // // Custom Dropdown Component
      // const CustomDropdown = ({ data, onSelect, selectedValue }) => {
      //   const { mutate: MedicalHistory, isLoading } = useMedicalHistory();

      //   const [isModalVisible, setModalVisible] = useState(false);
      //   const selectedPatient = useSelector((state) => state.patients.selectedPatient);
      //   const dispatch = useDispatch();

      //   const handleContinue = () => {
        
      //     console.log(`Fetching medical history for ID: ${selectedPatient.patient_Id}`);
      // // console.log(`API URL: ${serverRoutes.MedicalHistory}/${selectedPatient.patient_Id}`);


      //     // Call API to verify OTP
      //     MedicalHistory(selectedPatient.patient_Id, {
      //       onSuccess: () => {
      //         // Alert.alert('Success', 'OTP Verified Successfully');
      //       },
      //       onError: (error) => {
              
      //         // Alert.alert('Error', 'Failed. Please try again.');
      //         if (error.response && error.response.status === 404) {
      //           Alert.alert('No medical history records found for this patient.');
      //         }
      //       },
      //     });
      //   };
      //   const handleSelect = async (item) => {
      //    await dispatch(setSelectedPatient(item)); // Update Redux state
      //     onSelect(item);
      //     setModalVisible(false);
      //     setModalVisible(false);
      //     handleContinue();


      //   };

      
      //   useEffect(() => {
        
      //     handleContinue();
      //   }, []);




      //   return (
      //     <View>
      //       <TouchableOpacity
      //         style={styles.dropdownButton}
      //         onPress={() => setModalVisible(true)}
      //       >
      //         <Text style={styles.dropdownButtonText}>{
      //                     selectedPatient ? selectedPatient.patient_Name : 'Select a patient'

      //         // selectedValue || 'Select a patient'
      //         }</Text>
      //         <Svg height={20} width={20} viewBox="0 0 24 24" fill="none">
      //           <Path d="M7 10l5 5 5-5H7z" fill="#000" />
      //         </Svg>
      //       </TouchableOpacity>

      //       <Modal visible={isModalVisible} transparent animationType="fade">
      //         <TouchableOpacity
      //           style={styles.modalOverlay}
      //           onPress={() => setModalVisible(false)}
      //         >
      //           <View style={styles.modalContainer}>
      //             <FlatList
      //               data={data}
      //               keyExtractor={(item) => item.patient_Name}
      //               renderItem={({ item }) => (
      //                 <TouchableOpacity
      //                   style={styles.dropdownItem}
      //                   onPress={() => handleSelect(item)}
      //                 >
      //                   <Text style={styles.dropdownItemText}>{item.patient_Name}</Text>
      //                 </TouchableOpacity>
      //               )}
      //             />
      //           </View>
      //         </TouchableOpacity>
      //       </Modal>
      //     </View>
      //   );
      // };

      // const MedicalHistoryScreen = () => {
      //   // const [selectedPatient, setSelectedPatient] = useState(null);
      //   const navigation = useNavigation();
      //   const patients = useSelector((state) => state.patients.list);

      //   const selectedPatient = useSelector((state) => state.patients.selectedPatient);
      //   // const { mutate: MedicalHistory, isLoading } = useMedicalHistory();

      // //   const handleContinue = () => {
      // //     // if (otpCode.length < 4) {
      // //     //   Alert.alert('Error', 'Please enter the complete OTP.');
      // //     //   return;
      // //     // }
      // //     console.log(`Fetching medical history for ID: ${selectedPatient.patient_Id}`);
      // // console.log(`API URL: ${serverRoutes.MedicalHistory}/${selectedPatient.patient_Id}`);


      // //     // Call API to verify OTP
      // //     MedicalHistory(selectedPatient.patient_Id, {
      // //       onSuccess: () => {
      // //         // Alert.alert('Success', 'OTP Verified Successfully');
      // //       },
      // //       onError: (error) => {
              
      // //         // Alert.alert('Error', 'Failed. Please try again.');
      // //         if (error.response && error.response.status === 404) {
      // //           Alert.alert('No medical history records found for this patient.');
      // //         }
      // //       },
      // //     });
      // //   };







      //   // useEffect(() => {
        
      //   //   handleContinue();
      //   // }, []);



      //   // Adding an "All" option to show all patients
      //   // const patients = [
      //   //   { label: 'All Patients', value: 'all' },
      //   //   { label: 'John Smith', value: 'john_smith' },
      //   //   { label: 'Jane Doe', value: 'jane_doe' },
      //   //   { label: 'Robert Brown', value: 'robert_brown' },
      //   // ];

      //   const medicalHistoryData = useSelector(
      //     (state) => state.medicalhistory?.History || []
      //   );

      //   console.log("medicalHistoryData",medicalHistoryData);
        

      //   const filteredData =
      //   selectedPatient?.patient_Id !== 'all'
      //     ? medicalHistoryData.filter(
      //         (item) => item.patient_ID === selectedPatient.patient_Id // Match correct key (patient_ID)
      //       )
      //     : medicalHistoryData;
      //   const renderItem = ({ item }) => (
      //     <View style={styles.card}>
      //       <View style={styles.iconWrapper}>
      //         <Image
      //           source={require('../assets/Vector.png')} // Replace with your profile icon
      //           style={styles.profileIcon}
      //         />
      //       </View>
      //       <View style={styles.cardContent}>
      //         <View style={styles.infoRow}>
      //           <Text style={styles.labelText}>Patient Name: </Text>
      //           <Text style={styles.valueText}>{item.patient_Name}</Text>
      //         </View>
      //         <View style={styles.infoRow}>
      //           <Text style={styles.labelText}>Visit Date: </Text>
      //           <Text style={styles.valueText}>{item.created_Time}</Text>
      //         </View>
      //         <View style={styles.infoRow}>
      //           <Text style={styles.labelText}>Gender: </Text>
      //           <Text style={styles.valueText}>{item.gender}</Text>
      //         </View>
      //         <View style={styles.infoRow}>
      //           <Text style={styles.labelText}>Consultant Name: </Text>
      //           <Text style={styles.valueText}>{item.consultant}</Text>
      //         </View>
      //       </View>
      //       <TouchableOpacity style={styles.viewDetailsBtn}>
      //         <Text style={styles.viewDetailsText}>View Details</Text>
      //       </TouchableOpacity>
      //     </View>
      //   );

      //   return (
      //     <View style={styles.container}>
      //       <View style={styles.header}>
      //         <TouchableOpacity style={styles.locationContainer} onPress={() => navigation.goBack()}>
      //           <Image
      //             source={require('../assets/backarrow.png')} // Replace with your location icon
      //             style={styles.icon}
      //           />
      //         </TouchableOpacity>
      //         <Text style={styles.headerTitle}>Medical History</Text>
      //         <Image
      //           source={require('../assets/Vector.png')} // Replace with your profile icon
      //           style={styles.icon2}
      //         />
      //       </View>

      //       <View style={styles.container2}>
      //         <Text style={styles.title}>Patient History</Text>
      //         <Text style={styles.subtitle}>A Complete Overview of Your Health Records for Personalized Care.</Text>

      //         {/* Custom Dropdown */}
      //         <CustomDropdown
      //           data={patients}
      //           onSelect={(item) => setSelectedPatient(item.label === 'All Patients' ? 'all' : item.label)}
      //           selectedValue={selectedPatient === 'all' ? 'All Patients' : selectedPatient}
      //         />

      //         {/* FlatList for history items */}
      //         <FlatList
      //           data={filteredData}
      //           renderItem={renderItem}
      //           keyExtractor={(item) => item.id}
      //           style={{ marginTop: 20 }}
      //         />
      //       </View>
      //     </View>
      //   );
      // };

      // const styles = StyleSheet.create({
      //   container: {
      //     flex: 1,
      //     backgroundColor: '#fff',
      //   },
      //   container2: {
      //     flex: 1,
      //     backgroundColor: '#fff',
      //     padding: 20,
      //   },
      //   title: {
      //     fontSize: 22,
      //     fontWeight: 'bold',
      //     color: '#B13E2A',
      //     textAlign: 'center',
      //     marginBottom: 10,
      //   },
      //   subtitle: {
      //     fontSize: 14,
      //     textAlign: 'center',
      //     marginBottom: 20,
      //   },
      //   icon: {
      //     width: 20,
      //     height: 20,
      //     marginRight: 5,
      //   },
      //   icon2: {
      //     width: 0,
      //     height: 0,
      //     marginRight: 10,
      //   },
      //   locationContainer: {
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
      //   headerTitle: {
      //     fontSize: 18,
      //     fontWeight: 'bold',
      //     color: '#FFFFFF',
      //   },
      //   dropdownButton: {
      //     flexDirection: 'row',
      //     justifyContent: 'space-between',
      //     alignItems: 'center',
      //     backgroundColor: '#f4f4f4',
      //     padding: 12,
      //     borderRadius: 8,
      //     borderWidth: 1,
      //     borderColor: '#ccc',
      //   },
      //   dropdownButtonText: {
      //     fontSize: 16,
      //     color: '#333',
      //   },
      //   modalOverlay: {
      //     flex: 1,
      //     justifyContent: 'center',
      //     alignItems: 'center',
      //     backgroundColor: 'rgba(0,0,0,0.5)',
      //   },
      //   modalContainer: {
      //     width: width * 0.8,
      //     backgroundColor: '#fff',
      //     borderRadius: 8,
      //     padding: 10,
      //     maxHeight: 300,
      //   },
      //   dropdownItem: {
      //     padding: 10,
      //     borderBottomWidth: 1,
      //     borderBottomColor: '#ccc',
      //   },
      //   dropdownItemText: {
      //     fontSize: 16,
      //     color: '#333',
      //   },
      //   card: {
      //     flexDirection: 'row',
      //     backgroundColor: '#f4f4f4',
      //     borderRadius: 8,
      //     padding: 12,
      //     marginBottom: 10,
      //     alignItems: 'center',
      //     elevation: 3,
      //   },
      //   iconWrapper: {
      //     backgroundColor: '#B13E2A',
      //     padding: 10,
      //     borderRadius: 8,
      //     marginRight: 10,
      //   },
      //   cardContent: {
      //     flex: 1,
      //   },
      //   infoRow: {
      //     flexDirection: 'row',
      //     marginBottom: 4,
      //   },
      //   labelText: {
      //     fontSize: 14,
      //     color: appColors.jazzred, // Red color for labels
      //     fontWeight: 'bold',
      //   },
      //   valueText: {
      //     fontSize: 14,
      //     color: '#000', // Black color for values
      //   },
      //   viewDetailsBtn: {
      //     backgroundColor: '#B13E2A',
      //     paddingVertical: 6,
      //     paddingHorizontal: 12,
      //     borderRadius: 4,
      //   },
      //   viewDetailsText: {
      //     color: '#fff',
      //     fontSize: 14,
      //     fontWeight: 'bold',
      //   },
      // });

      // export default MedicalHistoryScreen;



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
        Alert,
        BackHandler
      } from 'react-native';
      import { Linking } from 'react-native';

      import Svg, { Path } from 'react-native-svg';
      import appColors from '../components/appcolors';
      import { useNavigation, useRoute } from '@react-navigation/native';
      import { useDispatch, useSelector } from 'react-redux';
      import { useMedicalHistory } from '../hooks/useAuth';
      import { setSelectedPatient } from '../store/slices/patientsSlice';
      import { SafeAreaView } from 'react-native-safe-area-context'; // Import SafeAreaView

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

      const MedicalHistoryScreen = () => {

     
        const navigation = useNavigation();
        const dispatch = useDispatch();

        const patients = useSelector((state) => state.patients.list);
        const selectedPatient = useSelector((state) => state.patients.selectedPatient);
        // const { mutate: fetchMedicalHistory, isLoading } = useMedicalHistory();
        const { mutate: fetchMedicalHistory, data: labData, isLoading, isError } = useMedicalHistory();




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


        const formatDate = (isoString) => {
          const date = new Date(isoString);
        
          // Extract date and time components
          const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true, // For AM/PM format
          };
        
          return date.toLocaleString('en-US', options);
        };


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
            `Fetching medical history for ID: ${selectedPatient.patient_Id}`
          );

          fetchMedicalHistory(selectedPatient.patient_Id, {
            onSuccess: () => {
              console.log('Medical history fetched successfully!');
            },
            onError: (error) => {
              if (error.response?.status === 404) {
                // Alert.alert('No medical history records found for this patient.');
              } else {
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
        const medicalHistoryData = useSelector(
          (state) => state.medicalhistory?.History || []
        );

        // console.log("medicalHistoryData",medicalHistoryData);
        
        console.log("Lab Data:", labData);

        const patientDetails = labData?.data?.patientDetails
        ? Array.isArray(labData.data.patientDetails)
          ? labData.data.patientDetails
          : [labData.data.patientDetails]
        : []; // Default to an empty array
      
      const filteredData =
        selectedPatient?.patient_Id !== 'all'
          ? patientDetails.filter(
              (item) => item.patient_Name === selectedPatient.patient_Name
            )
          : patientDetails;
      
      
      
      
      
      


        // const filteredData =
        // // selectedPatient?.patient_Id !== 'all'
        //   // ? medicalHistoryData.filter(
        //   //     (item) => item.patient_Name === selectedPatient.patient_Name // Match correct key (patient_ID)
        //   //   )
        //   // : 
        //   medicalHistoryDatapatientDetails; // Show all if no specific patient is selected

          const renderItem = ({ item }) => (
              <View style={styles.card}>
                <View style={styles.iconWrapper}>
                  <Image
                    source={require('../assets/Vector.png')} // Replace with your profile icon
                    style={styles.profileIcon}
                  />
                </View>
                <View style={styles.cardContent}>
                  <View style={styles.infoRow}>
                    <Text style={styles.labelText}>Patient Name: </Text>
                    <Text style={styles.valueText}>{item.patient_Name}</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.labelText}>Visit Date: </Text>
                    <Text style={styles.valueText}>{formatDate(item.created_Time)}</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.labelText}>Gender: </Text>
                    <Text style={styles.valueText}>{item.gender}</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.labelText}>Consultant Name: </Text>
                    <Text style={styles.valueText}>{item.doctorName}</Text>
                  </View>
                  <TouchableOpacity style={styles.viewDetailsBtn}   onPress={() => {
          // Open the download link in the browser
          Linking.openURL(labData?.data.downloadLink)
            .catch(err => console.error('Failed to open URL:', err));
        }}      >
          
                  <Text style={styles.viewDetailsText}>View Details</Text>
                </TouchableOpacity>
                </View>
              
              </View>
            );

        return (
          <View style={styles.container}>
                  <SafeAreaView style={styles.safeAreaHeader}>

            <View style={styles.header}>
              <TouchableOpacity
                style={styles.locationContainer}
                onPress= {
                  handleVerify
                  // navigation.goBack()
                  // navigation.navigate("tabs");
                }
              >
                <Image
                  source={require('../assets/backarrow.png')}
                  style={styles.icon}
                />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Medical History</Text>
              <Image
                source={require('../assets/Vector.png')}
                style={styles.icon2}
              />
            </View>
            </SafeAreaView>

            <View style={styles.container2}>
              <Text style={styles.title}>Patient History</Text>
              <Text style={styles.subtitle}>
                A Complete Overview of Your Health Records for Personalized Care.
              </Text>

              <CustomDropdown
                data={patients}
                onSelect={(item) => dispatch(setSelectedPatient(item))}
                selectedValue={selectedPatient?.patient_Name || 'Select a patient'}
                handleContinue={handleContinue}
              />

{filteredData?.length > 0 ? (
  <FlatList
    data={filteredData}
    renderItem={renderItem}
    keyExtractor={(item, index) => index.toString()} // Provide a unique key
  />
) : (
  <Text>No medical history available.</Text>
)}


            </View>
          </View>
        );
      };

      // Add your styles here
      // ...

      // export default MedicalHistoryScreen;


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
          color: appColors.jazzred,
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
          color:appColors?.Btnblack,
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
          backgroundColor: appColors.jazzred,
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
          backgroundColor: appColors.jazzred,
          paddingVertical: 6,
          paddingHorizontal: 12,
          alignItems: 'center',

          borderRadius: 4,
        },
        viewDetailsText: {
          color: '#fff',
          fontSize: 14,
          fontWeight: 'bold',
        },
      });

      export default MedicalHistoryScreen;
