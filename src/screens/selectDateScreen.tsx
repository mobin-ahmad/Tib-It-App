// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import DatePicker from 'react-native-date-picker';

// export default function SelectDateScreen({ navigation }) {
//   const [date, setDate] = useState(new Date());

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Select a Date</Text>
//       <DatePicker date={date} onDateChange={setDate} mode="date" />
//       <TouchableOpacity
//         style={styles.nextButton}
//         onPress={() => {
//           console.log('Navigating to SelectDoctor');
//           navigation.navigate('SelectDoctor');
//         }}
//       >
//         <Text style={styles.nextButtonText}>Next</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: '100%',
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   nextButton: {
//     marginTop: 20,
//     backgroundColor: '#8B1A1A',
//     padding: 12,
//     borderRadius: 8,
//   },
//   nextButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });



// screens/SelectDateScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, BackHandler } from 'react-native';
import StepIndicator from './stepIndicator';
import DatePicker from 'react-native-date-picker';
import appColors from '../components/appcolors';
import { SafeAreaView } from 'react-native-safe-area-context'; // Import SafeAreaView

const SelectDateScreen = ({ navigation }) => {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);



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



  
  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(false);
    setDate(currentDate);
  };

  return (
    <View style={styles.container}>
            <SafeAreaView style={styles.safeAreaHeader}>

      <View style={styles.header2}>
        <TouchableOpacity onPress={handleVerify} style={styles.icon}>
          <Image
            source={require('../assets/arrow-back.png')} // Replace with your location icon
            style={styles.icon}
          />
        </TouchableOpacity>
        <Text style={styles.header}>Appointment Booking</Text>
      </View>
      </SafeAreaView>

      <StepIndicator step={1} />


      <View style={styles.containerContent2}>

      <Image
          source={require('../assets/bookingred.png')} // Replace with your profile icon
          style={styles.icon2}
        />
      </View>

      <View style={styles.containerContent}>
        

        <Text style={styles.title}>Select a Date</Text>

        <View style={styles.datePickerContainer}>
  <DatePicker
    date={date}
    onDateChange={setDate}
    mode="date"
  />
  {/* Overlay to add a red tint effect on the selected date */}
  <View style={styles.redOverlay} />
</View>

        {/* <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.dateButton}>
          <Text style={styles.dateText}>{date.toDateString()}</Text>
        </TouchableOpacity> */}
      </View>

      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => navigation.navigate('SelectDoctor', { selectedDate: date })}
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#fff',
    // padding: 10,
    flexDirection: 'column', // Ensure vertical layout
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: 10,
    marginHorizontal:30,
    color: appColors.jazzred,
  },
  title: {
    fontWeight: 'bold',

    fontSize: 26,
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  dateButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
  nextButton: {
    backgroundColor: appColors.jazzred,
    padding: 15,
    marginHorizontal:25,
    marginBottom:10,
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 'auto', // Push button to the bottom
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  icon: {
    height: 40,
    color: appColors.Btnblack,
  },
  icon2: {
    width: 40,
    height: 40,
    alignItems: 'center',
    color: appColors.Btnblack,
  },
  header2: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    marginHorizontal:20,
  },
  containerContent: {
    flexGrow: 1, // This ensures content takes up available space and pushes the button to the bottom
    // alignItems: 'center',
    // paddingVertical: 30,
  },


  containerContent2: {
    // flexGrow: 1, // This ensures content takes up available space and pushes the button to the bottom
    alignItems: 'center',
    // paddingVertical: 30,
    marginTop:40,
  },

  datePickerContainer: {
    alignItems: 'center',
    
    paddingVertical: 10,
  },

  redOverlay: {
    position: 'absolute',
    top: '44.5%', // Adjust to align with the selected date line
    left: 0,
    right: 0,
    height: 40, // Adjust the height to match the selected date area
    backgroundColor: appColors.jazzred,
    zIndex: -1, // Ensure it doesn’t cover the picker
  },

});

export default SelectDateScreen;
