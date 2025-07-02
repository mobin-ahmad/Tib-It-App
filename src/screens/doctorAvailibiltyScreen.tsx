// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// export default function DoctorAvailabilityScreen({ navigation }) {
//   const [selectedTime, setSelectedTime] = useState(null);

//   const times = ['09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM'];

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Doctor Availability</Text>
//       <View style={styles.timesContainer}>
//         {times.map((time, index) => (
//           <TouchableOpacity
//             key={index}
//             style={[styles.timeSlot, selectedTime === time && styles.selectedTimeSlot]}
//             onPress={() => setSelectedTime(time)}
//           >
//             <Text style={styles.timeSlotText}>{time}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>
//       <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('AppointmentDetail')}>
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
//   timesContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-around',
//   },
//   timeSlot: {
//     padding: 10,
//     margin: 10,
//     backgroundColor: '#f0f0f0',
//     borderRadius: 8,
//   },
//   selectedTimeSlot: {
//     backgroundColor: '#8B1A1A',
//   },
//   timeSlotText: {
//     color: '#000',
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


// screens/DoctorAvailabilityScreen.js
// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import StepIndicator from './stepIndicator';

// const DoctorAvailabilityScreen = ({ route, navigation }) => {
//   const { selectedDoctor } = route.params;
//   const timeSlots = ['09:00 AM', '10:30 AM', '01:00 PM'];

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Appointment Booking</Text>
//       <StepIndicator step={3} />
//       <Text style={styles.selectedDoctor}>Selected Doctor: {selectedDoctor}</Text>
      
//       <Text style={styles.label}>Available Time Slots</Text>
//       {timeSlots.map((slot, index) => (
//         <TouchableOpacity key={index} style={styles.timeSlot}>
//           <Text style={styles.timeText}>{slot}</Text>
//         </TouchableOpacity>
//       ))}

//       <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('PatientDetails', { selectedDoctor })}>
//         <Text style={styles.nextButtonText}>Next</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#fff', padding: 20 },
//   header: { fontSize: 20, textAlign: 'center', fontWeight: 'bold', marginVertical: 10 },
//   selectedDoctor: { fontSize: 16, textAlign: 'center', marginVertical: 10, color: '#666' },
//   label: { fontSize: 18, color: '#333', marginVertical: 20 },
//   timeSlot: { padding: 15, backgroundColor: '#f0f0f0', borderRadius: 5, marginVertical: 5, alignItems: 'center' },
//   timeText: { fontSize: 16, color: '#333' },
//   nextButton: { backgroundColor: '#B71C1C', padding: 15, alignItems: 'center', borderRadius: 8, marginTop: 30 },
//   nextButtonText: { color: '#fff', fontSize: 16 },
// });

// export default DoctorAvailabilityScreen;


// screens/DoctorAvailabilityScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image,ScrollView, } from 'react-native';
import StepIndicator from './stepIndicator';
import appColors from '../components/appcolors';
import { useSelector } from 'react-redux';
import { useTimeSlots } from '../hooks/useAuth';
import dayjs from 'dayjs';
import { SafeAreaView } from 'react-native-safe-area-context';

const DoctorAvailabilityScreen = ({ route, navigation }) => {
  const { selectedHospital } = route.params;
  const { selectedDepartment } = route.params;
  const { selectedDoctor } = route.params;
  const { selectedDate } = route.params;


//   const [selectedTime, setSelectedTime] = useState(null);
//   const [selectedDates, setSelectedDate] = useState('Nov 01');
//   const [timeOfDay, setTimeOfDay] = useState('Morning');


//   const { mutate: fetchTimeSlots } = useTimeSlots();
//   const timeslots = useSelector((state) => state.timeslots.list);

// console.log("timeslots",timeslots);


//   const morningSlots = ['09:00 AM', '09:15 AM', '09:30 AM', '10:00 AM', '10:15 AM', '10:30 AM', '11:00 AM', '11:30 AM'];
//   const afternoonSlots = ['01:00 PM', '01:15 PM', '01:30 PM', '02:00 PM', '02:15 PM', '02:30 PM', '03:00 PM', '03:30 PM'];
//   const timeSlots = timeOfDay === 'Morning' ? morningSlots : afternoonSlots;

//   // Define available dates
  // const availableDates = ['Nov 01', 'Nov 02', 'Nov 03', ];
  const [availableDates, setAvailableDates] = useState<string[]>([]);


  const generateDateRange = (selectedDate: string) => {
    const dates = [];
    const base = new Date(selectedDate);
  
    // Start from the selected date and generate the next 3 days
    for (let i = 1; i <= 3; i++) {
      const date = new Date(base);
      date.setDate(base.getDate() + i);  // Adding i days to the base date
      dates.push(date.toISOString().split('T')[0]); // Format as YYYY-MM-DD
    }
  
    return dates;
  };
  useEffect(() => {
    // Generate available dates based on selected date (next 3 days)
    setAvailableDates(generateDateRange(selectedDate));
  }, [selectedDate]);


const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDates, setSelectedDate] = useState('Nov 01');
  const [timeOfDay, setTimeOfDay] = useState('Morning');
  const [filteredTimeSlots, setFilteredTimeSlots] = useState([]);

  // const { mutate: fetchTimeSlots } = useTimeSlots();
  // const timeslots = useSelector((state) => state.timeslots.list);

console.log("selectedDoctor",selectedDoctor);
console.log("selectedDate",selectedDate);

const formattedDate = dayjs(selectedDate).format('YYYY-MM-DD');

  const {data:timeslots} = useTimeSlots(selectedDoctor,formattedDate);



  // useEffect(() => {
  //   // Fetch time slots when the component mounts
  //   fetchTimeSlots(selectedDoctor, selectedDate);
  // }, [fetchTimeSlots, selectedDoctor, selectedDate]);
  
  useEffect(() => {
    // Generate time slots based on selected time of day (morning or afternoon)
    if (timeslots?.data.length > 0) {
      const generatedSlots = timeslots?.data.flatMap((slot) => {
        const startHour = parseInt(slot.timeIn.split(':')[0], 10);
        const startMinute = parseInt(slot.timeIn.split(':')[1], 10);
        const endHour = parseInt(slot.timeOut.split(':')[0], 10);
        const endMinute = parseInt(slot.timeOut.split(':')[1], 10);
  
        const slots = [];
        let currentHour = startHour;
        let currentMinute = startMinute;
  
        while (currentHour < endHour || (currentHour === endHour && currentMinute < endMinute)) {
          const nextHour = currentHour + 1;
          slots.push({
            timeIn: `${String(currentHour).padStart(2, '0')}:${String(currentMinute).padStart(2, '0')}`,
            timeOut: `${String(nextHour).padStart(2, '0')}:${String(currentMinute).padStart(2, '0')}`,
          });
          currentHour = nextHour;
        }
  
        return slots;
      });
  
      // Filter slots based on timeOfDay selection (morning or afternoon)
      const filtered = generatedSlots.filter((slot) => {
        const hour = parseInt(slot.timeIn.split(':')[0], 10);
        if (timeOfDay === 'Morning') {
          return hour >= 6 && hour < 12;  // Morning hours from 6 AM to 12 PM
        } else if (timeOfDay === 'Afternoon') {
          return hour >= 12 && hour < 18;  // Afternoon hours from 12 PM to 6 PM
        }
        return false;
      });
  
      setFilteredTimeSlots(filtered);  // Update the filtered slots
    }
  }, [timeslots, timeOfDay]);
  
  const handleNextPress = () => {
    if (selectedTime) {
      navigation.navigate('AppointmentDetailScreen', {
        selectedDoctor,
        selectedTime,
        formattedDate,
        selectedHospital,
      });
    } else {
      alert('Please select a time slot.');
    }
  };

  

  return (
    <View style={styles.container}>
      {/* Header with Back Button */}
      <SafeAreaView style={styles.safeAreaHeader}>

      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../assets/arrow-back.png')} style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.header}>Doctor Availability</Text>
      </View>
      </SafeAreaView>
      <StepIndicator step={3} />

      {/* Doctor Info */}
      

      <ScrollView style={styles.doctorInfoContainer2}>





      <View style={styles.doctorInfoContainer}>
        <View style={styles.profileIcon}>

        <Image source={require('../assets/Vector.png')} style={styles.icon} />


        </View>
        <Text style={styles.doctorName}>Doctor {selectedDoctor}</Text>
        <Text style={styles.fee}>Fee: Rs. 2000</Text>
      </View>

      {/* Date Selection */}
      <View style={styles.dateSelectorContainer}>
        {availableDates.map((date, index) => (
          <TouchableOpacity key={index} onPress={() => setSelectedDate(date)}>
            <Text style={[styles.date, selectedDates === date && styles.selectedDate]}>{date}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Time of Day Selector */}
      <View style={styles.timeOfDayContainer}>
  <TouchableOpacity onPress={() => setTimeOfDay('Morning')}>
    <Text
      style={[styles.timeOfDay, timeOfDay === 'Morning' && styles.activeTimeOfDay]}
    >
      Morning
    </Text>
  </TouchableOpacity>
  <TouchableOpacity onPress={() => setTimeOfDay('Afternoon')}>
    <Text
      style={[styles.timeOfDay, timeOfDay === 'Afternoon' && styles.activeTimeOfDay]}
    >
      Afternoon
    </Text>
  </TouchableOpacity>
</View>

        {/* Time Slots */}
        <View style={styles.timesContainer}>
  {filteredTimeSlots.map((slot, index) => (
    <TouchableOpacity
      key={index}
      style={[
        styles.timeSlot,
        selectedTime === slot.timeIn && styles.selectedTimeSlot,
      ]}
      onPress={() => setSelectedTime(slot.timeIn)}
    >
      <Text
        style={selectedTime === slot.timeIn ? styles.selectedTimeText : styles.timeText}
      >
        {slot.timeIn} - {slot.timeOut}
      </Text>
    </TouchableOpacity>
  ))}
</View>


      </ScrollView>


    <TouchableOpacity style={styles.nextButton} onPress={handleNextPress}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>

  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  headerContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  header: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: 10,
    marginHorizontal: 30,
    color: appColors.jazzred,
  },
  doctorInfoContainer: { alignItems: 'center', padding: 15, backgroundColor: '#F5F5F5', borderRadius: 10, marginBottom: 15 },
  profileIcon: { backgroundColor: appColors?.jazzred, padding: 30, borderRadius: 100, marginBottom: 10 },
  doctorName: { fontSize: 18, fontWeight: 'bold' },
  fee: { fontSize: 16, color: '#666' ,fontWeight: 'bold'},
//   background: #82828233;

  dateSelectorContainer: {flexDirection: 'row',  alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  date: {   marginHorizontal: 12 ,borderRadius: 5,padding:5 ,backgroundColor: '#82828233',fontWeight: 'bold',},
  selectedDate: { backgroundColor: appColors?.jazzred , fontWeight: 'bold', color:appColors.manclrwhite,borderRadius: 5,padding:5 },

  timeOfDayContainer: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10, borderBottomWidth: 1, borderColor: '#DDD', paddingBottom: 5 },
  timeOfDay: { fontSize: 16, color: '#666',fontWeight: 'bold' },
  activeTimeOfDay: { color: appColors?.jazzred, fontWeight: 'bold', borderBottomWidth: 2, borderColor: appColors?.jazzred },

  timesContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginVertical: 10 },
  timeSlot: { padding: 15, backgroundColor: '#82828233', borderRadius: 5, margin: 5, width: '40%', alignItems: 'center', },
  selectedTimeSlot: { backgroundColor: appColors?.jazzred },
  timeText: { fontSize: 16, color: '#333',fontWeight: 'bold' },
  selectedTimeText: { fontSize: 16, color: '#FFF',fontWeight: 'bold' },
  icon: {
    // height: 20,
    // width:20,
    // color: appColors.Btnblack,
  },

  doctorInfoContainer2: { backgroundColor: '#F5F5F5',  },


  nextButton: { backgroundColor: appColors?.jazzred, padding: 15, alignItems: 'center', borderRadius: 8, marginTop: 30 },
  nextButtonText: { color: appColors.Btnblack, fontSize: 16, fontWeight: 'bold' },
});

export default DoctorAvailabilityScreen;
