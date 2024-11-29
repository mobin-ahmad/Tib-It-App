import { useMutation, useQuery, useQueryClient } from "react-query";
// import { api, authApi } from "../config/axiosConfig";
// import { serverRoutes } from "../routes/serverRoutes";
// import { adminBrowserRoutes, browserRoutes } from "../routes/browserRoutes";
// import toast from "react-hot-toast";
import { useNavigation } from '@react-navigation/native';

import { useDispatch } from "react-redux";
import {
  
  logout,
  setToken,
  setUser,
} from "../store/slices/auth";
import { persistor, store } from "../store/store";
import { serverRoutes } from "../routes/serverRoutes";
import { api, authApi } from "../config/axiosConfig";
import { Alert } from "react-native";
import { clearpatients, setPatients } from "../store/slices/patientsSlice";
import { setMedicalHistory } from "../store/slices/medicalHistorySlice";
import { cleardoctors, setdoctors } from "../store/slices/doctorsSlice";
import { clearhospitals, sethospitals } from "../store/slices/hospitalsSlice";
import { cleardepartments, setdepartments } from "../store/slices/departmentsSlice";
import { settimeslots } from "../store/slices/timeSlotsSlice";
import { setLabReport } from "../store/slices/labRecords";
// import { setPatients } from './patientsSlice';


const register = (data:any) => {

  return authApi.post(serverRoutes.SIGN_UP, data);
};

export const useRegister = () => {
    const navigation = useNavigation();

//   const navigate = useNavigate();
  return useMutation(register, {
    onSuccess: (data) => {
    //   toast.success(data.data.msg);
      navigation.navigate("Login");
    },
    onError: (error) => {
      console.log("error", error);
    //   toast.error(error?.response?.data?.errors[0]?.message);
    },
  });
};



const verifyOTP = (OTP) => {
  return api.post(`${serverRoutes.VERIFY_OTP}?OTP=${OTP}`);
};


export const useVerifyOTP = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return useMutation(verifyOTP, {
    onSuccess: (data) => {
      if (data && data.data && Array.isArray(data.data.patients)) {
        dispatch(setPatients(data.data.patients)); // Dispatch correctly formatted data
      } else {
        console.error('Invalid patients data', data);
      }
      navigation.navigate('AllPatientsScreen');
    },
    onError: (error) => {
       if(error.response?.status === 401){

        Alert.alert('Error', 'Token Expired Login Again.');

       

        dispatch(logout()); // Clears user data
        dispatch(clearpatients());
        dispatch(cleardoctors());
        dispatch(cleardepartments());
        dispatch(clearhospitals());
      
        // dispatch(clearPatients()); // Clears patient data
        persistor.purge(); // Clears persisted data from storage
        navigation.navigate("LoginScreen"); // Red
      }
      console.error(error);
      Alert.alert('Error', 'Failed to verify OTP. Please try again.');
    },
  });
};





const bookAppointment = ({
  patient_Name,
  phoneNumber,
  dob,
  patientId,
  consultant_ID,
  app_Date,
  time,
  hospital_ID,
}) => {
  const payload = {
    patient_Name,
    phoneNumber,
    dob,
    consultant_ID,
    app_Date,
    time,
    hospital_ID,
  };

  console.log("Booking Payload:", JSON.stringify(payload, null, 2));

  // Replace the API URL with the appropriate one
  return api.post(
    `${serverRoutes.Booking}?patientId=${patientId}`,
    payload
  );
};






export const useAppointment = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return useMutation(bookAppointment, {
    onSuccess: (data) => {
      console.log('Booking successful:', data);
      Alert.alert("Success", "Your appointment has been booked!");
      navigation.reset({
        index: 0,
        routes: [{ name: 'tabs' }],
      });
    },
    onError: (error) => {
      if (error.response?.status === 400) {
        Alert.alert('Error', 'Invalid request. Please check the inputs.');
      } else if (error.response?.status === 401) {
        Alert.alert('Error', 'Token Expired. Please login again.');
        dispatch(logout());
        dispatch(clearPatients());
        persistor.purge();
        navigation.navigate("LoginScreen");
      } else {
        console.error(error);
        Alert.alert('Error', 'Failed to book appointment. Please try again.');
      }
    },
  });
};











const fetchDoctors = (departmentId) => {
  return api.get(`${serverRoutes.Doctors}?departmentId=${departmentId}` );
};




export const useDoctors = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return useMutation(fetchDoctors, {
    onSuccess: (data) => {
      // Check if data is valid and an array
      if (data && Array.isArray(data.data)) {
        console.log("sdhjasdbas", data.data);
        
        dispatch(setdoctors(data.data)); // Dispatch the fetched doctor data
      } else {
        console.error('Invalid doctors data', data);
      }
    },
    onError: (error) => {
      if (error.response?.status === 404) {
        Alert.alert('Error', 'No Doctors history records found for this Department.');
      }

      else if(error.response?.status === 401){

        Alert.alert('Error', 'Token Expired Login Again.');

       

        dispatch(logout()); // Clears user data
        dispatch(clearpatients());
       
      
        // dispatch(clearPatients()); // Clears patient data
        persistor.purge(); // Clears persisted data from storage
        navigation.navigate("LoginScreen"); // Red
      }
      else
        console.error(error);
        // Alert.alert('Error', 'Failed to fetch. Please try again.');
      },
  });
};





const fetchTimeSlots = (selectedDoctor, selectedDate) => {
  if (!selectedDoctor || !selectedDate) {
    throw new Error("Missing required parameters: selectedDoctor or selectedDate");
  }

  console.log("Fetching timeslots with:", selectedDoctor, selectedDate);
  return api.get(`${serverRoutes.TimeSlots}?doctorId=${selectedDoctor}&date=${selectedDate}`);
};

export const useTimeSlots = (selectedDoctor, selectedDate) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  return useQuery(
    ["fetchTimeSlots", selectedDoctor, selectedDate],
    () => fetchTimeSlots(selectedDoctor, selectedDate),
    {
      enabled: !!selectedDoctor && !!selectedDate, // Only fetch when valid
      onSuccess: (data) => {
        console.log("Fetched timeslots:", data);
      },
      onError: (error) => {
        console.error("Error Response:", error.response?.data);
        if (error.response?.status === 404) {
          Alert.alert('Error', 'No timeslots found for this Doctor and Date.');
        } else if (error.response?.status === 400) {
          Alert.alert('Error', 'Invalid request. Please check the inputs.');
        } 
       else if(error.response?.status === 401){

          Alert.alert('Error', 'Token Expired Login Again.');
  
         
  
          dispatch(logout()); // Clears user data
          dispatch(clearpatients());
         
        
          // dispatch(clearPatients()); // Clears patient data
          persistor.purge(); // Clears persisted data from storage
          navigation.navigate("LoginScreen"); // Red
        }
        else {
          Alert.alert('Error', 'Failed to fetch. Please try again.');
        }
      },
    }
  );
};



// export const useTimeSlots = () => {
//   const navigation = useNavigation();
//   const dispatch = useDispatch();
  
//   return useMutation(fetchTimeSlots, {
//     onSuccess: (data) => {
//       // Check if data is valid and an array
//       if (data && Array.isArray(data.data)) {
//         console.log("123444", data.data);
        
//         dispatch(settimeslots(data.data)); // Dispatch the fetched doctor data
//       } else {
//         console.error('Invalid TimeSlots data', data);
//       }
//     },
//     onError: (error) => {
      
//         console.error(error);
//         Alert.alert('Error', 'Failed to fetch. Please try again.');
//       },
//   });
// };






const fetchHospital= () => {
  return api.get(`${serverRoutes.Hospitals}`);
};


export const useHospital1 = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  return useQuery(
    ["fetchHospital"],
    () => fetchHospital(),
    {
      // enabled: !!month,
      onSuccess: (data) => {},
      onError: (error) => {
        if(error.response?.status === 401){

          Alert.alert('Error', 'Token Expired Login Again.');
  
         
  
          dispatch(logout()); // Clears user data
          dispatch(clearpatients());
         
        
          // dispatch(clearPatients()); // Clears patient data
          persistor.purge(); // Clears persisted data from storage
          navigation.navigate("LoginScreen"); // Red
        }
        console.log("Wallets error", error);
      },
    }
  );
};


// export const useHospital = () => {
//   const navigation = useNavigation();
//   const dispatch = useDispatch();

//   return useMutation(fetchHospital, {
//     onSuccess: (data) => {
//       // Check if data is valid and an array
//       if (data && Array.isArray(data.data)) {
//         console.log("sdhjasdbas", data.data);
        
//         dispatch(sethospitals(data.data)); // Dispatch the fetched doctor data
//       } else {
//         console.error('Invalid Hospitals data', data);
//       }
//     },
//     onError: (error) => {
//        if(error.response?.status === 401){

//         Alert.alert('Error', 'Token Expired Login Again.');

       

//         dispatch(logout()); // Clears user data
//         dispatch(clearpatients());
//         dispatch(cleardoctors());
//         dispatch(cleardepartments());
//         dispatch(clearhospitals());
      
//         // dispatch(clearPatients()); // Clears patient data
//         persistor.purge(); // Clears persisted data from storage
//         navigation.navigate("LoginScreen"); // Red
//       }
//         console.error(error);
//         Alert.alert('Error', 'Failed to fetch. Please try again.');
//       },
//   });
// };




const fetchDepartment= () => {
  return api.get(`${serverRoutes.Departments}`);
};


export const useDepartment = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();


  return useQuery(
    ["fetchDepartment"],
    () => fetchDepartment(),
    {
     
      onSuccess: (data) => {},
      onError: (error) => {
        if(error.response?.status === 401){

          Alert.alert('Error', 'Token Expired Login Again.');
  
         
  
          dispatch(logout()); // Clears user data
          dispatch(clearpatients());
         
        
          // dispatch(clearPatients()); // Clears patient data
          persistor.purge(); // Clears persisted data from storage
          navigation.navigate("LoginScreen"); // Red
        }
        console.log("error", error);
      },
    }
  );
};

// export const useDepartment = () => {
//   const navigation = useNavigation();
//   const dispatch = useDispatch();

//   return useMutation(fetchDepartment, {
//     onSuccess: (data) => {
//       // Check if data is valid and an array
//       if (data && Array.isArray(data.data)) {
//         console.log("sdhjasdbas", data.data);
        
//         dispatch(setdepartments(data.data)); // Dispatch the fetched doctor data
//       } else {
//         console.error('Invalid Deaprtments data', data);
//       }
//     },
//     onError: (error) => {
//         console.error(error);
//         Alert.alert('Error', 'Failed to fetch. Please try again.');
//       },
//   });
// };


// const dispatch = useDispatch();

// const handleLogout = () => {
//   const navigation = useNavigation();
//   dispatch(logout()); // Clears user data
//   dispatch(clearpatients());
//   dispatch(cleardoctors());
//   dispatch(cleardepartments());
//   dispatch(clearhospitals());

//   // dispatch(clearPatients()); // Clears patient data
//   persistor.purge(); // Clears persisted data from storage
//   navigation.navigate("Welcome"); // Redirect to the login screen
// };




const MedicalHistory = (Id) => {
  return api.get(`${serverRoutes.MedicalHistory}/${Id}`);
};


export const useMedicalHistory = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return useMutation(MedicalHistory, {
    onSuccess: (data) => {
      console.log("Fetched Medical History:", data.data.medicalRecords);
      if (data && data.data && Array.isArray(data.data.medicalRecords)) {
        dispatch(setMedicalHistory(data.data.medicalRecords)); // Dispatch the correct data
      } else {
        console.error('Invalid medical records data', data);
      }
    },
    
    onError: (error) => {
      if (error.response?.status === 404) {
        // Alert.alert('Error', 'No medical history records found for this patient.');
      }
      else if(error.response?.status === 401){

        Alert.alert('Error', 'Token Expired Login Again.');

       

        dispatch(logout()); // Clears user data
        // dispatch(clearpatients());
        // dispatch(cleardoctors());
        // dispatch(cleardepartments());
        // dispatch(clearhospitals());
      
        // dispatch(clearPatients()); // Clears patient data
        persistor.purge(); // Clears persisted data from storage
        navigation.navigate("LoginScreen"); // Red
      }

       else {
        Alert.alert('Error', 'Something went wrong. Please try again later.');
      }

      console.error('Error fetching medical history:', error);
    },
  });
};





const LabReposrts = (Id) => {
  return api.get(`${serverRoutes.LabReports}/${Id}`);
};


export const useLabReports = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return useMutation(LabReposrts, {
    onSuccess: (data) => {
      console.log("Fetched Lab History:", data.data.labHistory);
      if (data && data.data && Array.isArray(data.data.labHistory)) {
        dispatch(setLabReport(data.data.labHistory)); // Dispatch the correct data
      } else {
        console.error('Invalid lab records data', data);
      }
    },
    
    onError: (error) => {
      if (error.response?.status === 404) {
        // Alert.alert('Error', 'No medical history records found for this patient.');
      } 
      
      else if(error.response?.status === 401){

        Alert.alert('Error', 'Token Expired Login Again.');

       

        dispatch(logout()); // Clears user data
        dispatch(clearpatients());
       
      
        // dispatch(clearPatients()); // Clears patient data
        persistor.purge(); // Clears persisted data from storage
        navigation.navigate("LoginScreen"); // Red
      }
      else {
        Alert.alert('Error', 'Something went wrong. Please try again later.');
      }
      console.error('Error fetching lab history:', error);
    },
  });
};





export const useLogin = (enabled, phoneNumber) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const login = async (phoneNumber) => {
    console.log("Phone Number:", phoneNumber);
    return authApi.get(`${serverRoutes.LOGIN}?mobileNumber=${phoneNumber}`);
  };

  return useQuery(["login", phoneNumber], () => login(phoneNumber), {
    enabled, // Triggers the query only if `enabled` is true
    onSuccess: (data) => {
      console.log("Login Successful:", data);

      if (data?.data?.token) {
        // Store token in Redux
        dispatch(setToken(data.data.token));

        // Navigate to the dashboard
        // navigation.navigate("dashboard");
      }
    },
    onError: (error) => {
      console.error("Login Query Error:", error);
      Alert.alert("Error", "Failed to log in. Please check your phone number.");
    },
  });
};





// profile



const userProfile = () => {
  return api.get("GET_USER");
};

export const useGetUserProfile = () => {
  return useQuery(["userProfile"], () => userProfile(), {
    onSuccess: (data) => {},
    onError: (error) => {
      
      console.log("user profile", error);
    },
  });
};

