// import React from 'react';
// import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
// import appColors from '../components/appcolors';
// import { useNavigation } from '@react-navigation/native';

// const { width } = Dimensions.get('window');

// const HomeScreen = ({drawer}) => {
//   const navigation = useNavigation();

//   const handleSubmit = () => {
//     navigation.navigate("MedicalHistoryScreen");

    

//   };

//   const handleSubmitReport = () => {
//     navigation.navigate("ReportScreen");
//   };
//   const handleSubmitAppointment = () => {
//     navigation.navigate("AppointmentScreen");
//   };
  

//   return (
//     <View style={styles.container}>
//       {/* Header with Location, Logo, and Profile */}
//       <View style={styles.header}>
//       <TouchableOpacity style={styles.locationContainer} onPress={() => drawer.current.openDrawer()}>
//       {/* onPress={() => drawer.current.closeDrawer()} */}

//           <Image
//             source={require('../assets/bars.png')} // Replace with your location icon
//             style={styles.icon}
            
//           />
//           {/* <Text style={styles.locationText}>Lahore</Text> */}
//         </TouchableOpacity>
//         <Image
//           source={require('../assets/logo.png')} // Replace with your logo image
//           style={styles.logo}
//         />
//         <View style={styles.profileContainer}>
//           <Text style={styles.adminText}>Admin</Text>
//           <View style={styles.iconContainer}>
//             <Image
//               source={require('../assets/Vector.png')} // Replace with your profile icon
//               style={styles.profileIcon}
//             />
//           </View>
//         </View>
//       </View>

//       <View style={styles.header2}>
//         <TouchableOpacity style={styles.locationContainer}>
//           {/* <Image
//             source={require('../assets/bars.png')} // Replace with your location icon
//             style={styles.icon}
//           /> */}

//           <View style={styles.location}>
//             <Image
//               source={require('../assets/location.png')} // Replace with your profile icon
//               style={styles.profileIcon2}
//             />
//             <Text style={styles.locationText}>Lahore</Text>
//           </View>
//         </TouchableOpacity>
//         {/* <Image
//           source={require('../assets/Tibit.png')} // Replace with your logo image
//           style={styles.logo}
//         /> */}
//         <View style={styles.profileContainer}>
//           <Text style={styles.adminText}>John Smith</Text>
//           {/* <View style={styles.iconContainer}>
//             <Image
//               source={require('../assets/profile.png')} // Replace with your profile icon
//               style={styles.profileIcon}
//             />
//           </View> */}
//         </View>
//       </View>

//       {/* Welcome Text */}
//       <Text style={styles.welcomeText}>
//         Healthcare Services at your door step
//       </Text>

//       {/* Service Cards */}

      
//       <TouchableOpacity style={styles.card}
//       onPress={handleSubmitAppointment}>
//   <Image
//     source={require('../assets/appointment.png')} // Replace with your image
//     style={styles.cardImage}
//   />
//   <View style={styles.cardOverlay}>
//     <View style={styles.cardTextWrapper}>
//       <Text style={styles.cardText}>BOOK APPOINTMENT</Text>
//     </View>
//   </View>
// </TouchableOpacity>

// <TouchableOpacity style={styles.card}
// onPress={handleSubmit}>
//   <Image
//     source={require('../assets/appointment.png')} // Replace with your image
//     style={styles.cardImage}
//   />
//   <View style={styles.cardOverlay}>
//     <View style={styles.cardTextWrapper}>
//       <Text style={styles.cardText}>MEDICAL HISTORY</Text>
//     </View>
//   </View>
// </TouchableOpacity>

// <TouchableOpacity style={styles.card}onPress={handleSubmitReport}>
//   <Image
//     source={require('../assets/appointment.png')} // Replace with your image
//     style={styles.cardImage}
//   />
//   <View style={styles.cardOverlay}>
//     <View style={styles.cardTextWrapper}>
//       <Text style={styles.cardText}>LAB REPORTS</Text>
//     </View>
//   </View>
// </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 25,
//     paddingVertical: 15,
//     backgroundColor: '#f5f5f5',
//   },

//   header2: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 22,
//     paddingVertical: 15,
//     backgroundColor: '#f5f5f5',
//   },
//   locationContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   icon: {
//     width: 24,
//     height: 24,
//     marginRight: 5,
//   },
//   locationText: {
//     fontSize: 16,
//     color: '#333',
//   },
//   logo: {
//     width: 100,
//     height: 60,
//     resizeMode: 'contain',
//   },
//   profileContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   adminText: {
//     fontSize: 16,
//     marginRight: 5,
//     color: '#333',
//   },
//   profileIcon: {
//     width: 15,
//     height: 15,
//     borderRadius: 15,
//     alignSelf: 'center',
//     marginTop: 10,
//   },
//   profileIcon2: {
//     width: 30,
//     height: 30,
//     // borderRadius: 16,
//     // alignSelf: 'center',
//     // marginTop: 6,
//   },
//   welcomeText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginVertical: 20,
//     color: '#B13E4A',
//   },
//   card: {
//     width: '90%', // Use percentage width for responsiveness
//     height: 150,  // Adjust height for larger cards
//     marginVertical: 5,
//     alignSelf: 'center',
//     borderRadius: 15,
//     overflow: 'hidden',
//     elevation: 5,
//   },
//   cardImage: {
//     width: '100%',
//     height: '100%',
//     position: 'absolute',
//     resizeMode: 'cover',
//   },
//   cardOverlay: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.4)', // Darker overlay
//   },
//   cardTextWrapper: {
//     borderWidth: 2, // Add border around text
//     borderColor: appColors.clryellow, // Yellow border
//     paddingVertical: 5,
//     paddingHorizontal: 15,
//   },
//   cardText: {
//     fontSize: 18, // Adjust font size
//     fontWeight: 'bold',
//     color: '#FFFFFF',
//     textAlign: 'center',
//   },
//   location: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   iconContainer: {
//     width: width * 0.09,
//     height: 35,
//     // marginVertical: ,
//     alignSelf: 'center',
//     borderRadius: 35,
//     overflow: 'hidden',
//     elevation: 3,
//     backgroundColor: appColors.jazzred,
//   },

//   scrollContainer: {
//     flexGrow: 1, // Allows ScrollView to grow
//     justifyContent: 'center', // Center content vertically
//   },
// });

// export default HomeScreen;






import React, { useEffect } from 'react';
// import { View, Text, Image, TouchableOpacity, StyleSheet,  } from 'react-native';

import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import appColors from '../components/appcolors';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { useDrawer } from '../navigation/tab';

const { width, height } = Dimensions.get('window');


const iconMapping: Record<string, any> = {
  ICON_Cardiologist: require('../assets/ICON_Cardiologist.png'),
  ICON_GeneralPhysician: require('../assets/ICON_GeneralPhysician.png'),
  ICON_Gynecologist: require('../assets/ICON_Gynecologist.png'),
  ICON_ENT: require('../assets/ICON_ENT.png'),
};

const HomeScreen = () => {
  
  const { toggleDrawer } = useDrawer();

  // const { drawer } = route.params;
  // useEffect(() => {
  //   if (route.params?.drawer?.current) {
  //     console.log("Drawer reference exists. Attempting to open drawer.");
  //     try {
  //       route.params?.drawer.current.openDrawer();  // Try to open the drawer
  //       console.log("Drawer opened successfully.");
  //     } catch (error) {
  //       console.error("Failed to open drawer:", error);  // Catch any errors
  //     }
  //   }
  // }, [route.params?.drawer]);
  // const drawer = useDrawer();
  // const drawer = useDrawer();

  const navigation = useNavigation();
  const selectedPatient = useSelector((state) => state.patients.selectedPatient);
  // const handleOpenDrawer = () => {
  //   if (drawer.current) {
  //     drawer.current.openDrawer(); // Open the drawer when button is pressed
  //   }
  // };


  const categories = [
    { name: 'Cardiologist', icon: 'ICON_Cardiologist' },
    { name: 'General Physician', icon: 'ICON_GeneralPhysician' },
    { name: 'Gynecologist', icon: 'ICON_Gynecologist' },
    { name: 'ENT Specialist', icon: 'ICON_ENT' },
  ];

  const handleSubmit = () => {
    if (selectedPatient) {
      // Pass the parameter 'openDrawer' to indicate the drawer should open
      navigation.navigate("MedicalHistoryScreen");
    }
  };
    
      const handleSubmitReport = () => {
        selectedPatient?
        navigation.navigate("ReportScreen"):"";
      };


      const handleBookAppointment = () => {
        selectedPatient?
        navigation.navigate('SelectDateScreen'):"";
      };


  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        



<View style={styles.appbar}>
     
<TouchableOpacity style={styles.locationContainer}  onPress={toggleDrawer}>
<Image
            source={require('../assets/menu.png')} // Replace with your location icon
            style={styles.iconmenu}
            
          />
 
        </TouchableOpacity>

        <View style={styles.appbar2}>

<Text style={styles.locationText}>Location</Text>

<View style={styles.locationContainer}>

<Image
      source={require('../assets/location_on.png')} // Replace with your profile icon
      style={styles.logolocation}
    />
<Text style={styles.locationText2}>Johar Town, Lahore</Text>

</View>


</View>

       

       
</View>

        
        <View style={styles.headerRight}>
          {/* <Ionicons name="location-outline" size={16} color="white" style={styles.locationIcon} /> */}

          <Text style={styles.greeting}>
            
          Hello {selectedPatient ? selectedPatient.patient_Name : 'John'}</Text>
          
          {/* Search Bar */}
          <View style={styles.searchBar}>
          <Image
      source={require('../assets/search.png')} // Replace with your profile icon
      style={styles.logo}
    />
                <TextInput
              style={styles.searchInput}
              placeholder="Search Doctors, Disease"
              placeholderTextColor="#FFFFFF"
            />
          </View>

          {/* Quick Access Cards */}
          <View style={styles.quickAccessContainer}>
            <TouchableOpacity style={styles.quickAccessCard}onPress={handleSubmit}
            >

            <Image
      source={require('../assets/medicalHistoryIcon.png')} // Replace with your profile icon
      style={styles.logoreports}
    />
                  <Text style={styles.quickAccessText}>Medical History</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickAccessCard}onPress={handleSubmitReport}>
            <Image
      source={require('../assets/labReportsIcon.png')} // Replace with your profile icon
      style={styles.logoreports}
    />
                  <Text style={styles.quickAccessText}>Lab Reports</Text>
            </TouchableOpacity>
          </View>


        </View>
      </View>

      {/* Main Content */}
      <View style={styles.contentContainer}>
        <ScrollView contentContainerStyle={styles.content}>
        
          {/* Categories Section */}
          <View style={styles.categoriesHeader}>
            <Text style={styles.categoriesTitle}>Categories</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.categoriesContainer}>
          {categories.map((category, index) => (
        <TouchableOpacity key={index} style={styles.categoryCard}>
          <Image source={iconMapping[category.icon]} style={styles.icon} />
          <Text style={styles.categoryText}>{category.name}</Text>
        </TouchableOpacity>
      ))}
          </View>
        </ScrollView>
      </View>
<View style={styles.bookAppointment}>

<TouchableOpacity 
  style={styles.bookButton}
  onPress={handleBookAppointment}
>
<Image
      source={require('../assets/bookingIcon.png')} // Replace with your profile icon
      style={styles.logobtn}
    />
      <Text style={styles.bookButtonText}>Book Appointment</Text>
</TouchableOpacity>
</View>
   
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'flex-start',
    backgroundColor: appColors.jazzred,
  },


  
  header: {
        // justifyContent: 'flex-start',

    paddingTop: 10,
    paddingHorizontal: 10,
    backgroundColor: appColors.jazzred,
  },
  timeText: {
    color: 'white',
    fontSize: 14,
  },
  headerRight: {
    //  alignItems: 'flex-start',
    // justifyContent: 'flex-start',
    // flexDirection: 'row',
    // alignItems: 'center',
    paddingHorizontal: 12,
    marginTop: 5,
  },
  locationIcon: {
    marginRight: 5,
  },
  locationText: {
    color: 'white',
    fontSize: 10,
  },
  locationText2: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',

  },
  iconSpacing: {
    marginLeft: 10,
  },

  logolocation: {
    width: 12,
    height: 12,
    resizeMode: 'contain',
    marginHorizontal:6,
  },



  logoreports: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginHorizontal:12,
  },

  logobtn: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
    // marginHorizontal:5,
  },

  logo: {
        width: 15,
        height: 15,
        resizeMode: 'contain',
        marginHorizontal:12,
      },
  contentContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
  },
  locationContainer: {
    // backgroundColor: 'white',

        flexDirection: 'row',
        alignItems: 'center',
      },

  content: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  greeting: {
   
    fontSize: 24,
      fontWeight: 'bold',
    color: appColors.manclrwhite,
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: appColors.manclrwhite, // Set border color to white
    borderWidth: 1, // Add this line to make the border visible
    padding: 2,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    color: appColors.manclrwhite,
  },
  quickAccessContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  quickAccessCard: {
    width: width * 0.42,
    height: height * 0.12,
    backgroundColor: '#F1F1F1',
    borderRadius: 15,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  quickAccessText: {
    marginTop: 10,
    marginHorizontal:12,
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
  },
  categoriesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,

    marginHorizontal:10,
  },
  categoriesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAllText: {
    fontWeight: 'bold',

    color: appColors.jazzred,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    flexDirection: 'row',

    width: width * 0.42,
    height: height * 0.06,
    backgroundColor: '#F1F1F1',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  categoryText: {
    fontWeight: 'bold',

    // marginTop: 10,
    fontSize: 12,
    color: '#333',
  },
  bookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: appColors.jazzred,
    marginHorizontal:20,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    position: 'absolute',
    bottom: 100,
    alignSelf: 'flex-end',
  },
  bookButtonText: {
    color: 'white',
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  icon: {
        width: 20,
        height: 20,
        marginRight: 8,
        marginHorizontal:8,
        color: appColors.manclrwhite,
      },

      iconmenu: {
        width: 30,
        height: 30,
        marginRight: 5,
        // marginHorizontal:8,
        // color: appColors.manclrwhite,
      },

    appbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginLeft:5,
  },
  appbar2: {
    // flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 10,
    paddingVertical: 15,
  },

bookAppointment:{
  marginHorizontal: 15,

}

});

export default HomeScreen;
// 