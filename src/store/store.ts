// import { configureStore } from "@reduxjs/toolkit";
// import { combineReducers } from "redux";

// import storage from "redux-persist/lib/storage";
// import { persistReducer, persistStore } from "redux-persist";

// import userReducer from "./slices/auth";
 
// const persistConfig = {
//   key: "root",
//   storage: storage,
//   whitelist: ["user"],
// };
// const reducers = combineReducers({
//   user: userReducer,
// });
// const persistedReducer = persistReducer(persistConfig, reducers);
 
// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }),
// });
 
// export const persistor = persistStore(store);
 

import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

import userReducer from "./slices/auth";
import patientsReducer from "./slices/patientsSlice"; 
import doctorsReducer from "./slices/doctorsSlice"; 
import hospitalsReducer from "./slices/hospitalsSlice"; 
import departmentsReducer from "./slices/departmentsSlice"; 
import timeslotsReducer from "./slices/timeSlotsSlice"; 

import medicalHistoryReducer from "./slices/medicalHistorySlice"; 

import labreportReducer from "./slices/labRecords"; 



// Import the patients reducer
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["user", "patients", "doctors", "hospitals","departments", "timeslots","medicalhistory", "labreport"], // Add 'patients' to the whitelist
};

const reducers = combineReducers({
  user: userReducer,
  patients: patientsReducer,
  doctors:doctorsReducer,
  hospitals:hospitalsReducer,
  departments:departmentsReducer,
  timeslots:timeslotsReducer,
  medicalhistory:medicalHistoryReducer,
  labreport:labreportReducer


  // Add patients reducer to the root reducer
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable state check for persist
    }),
});

export const persistor = persistStore(store);
