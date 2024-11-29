import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [], // List of patients
  selectedPatient: null, // Selected patient
};

const patientsSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {
    setPatients: (state, action) => {
      state.list = action.payload;
    },
    setSelectedPatient: (state, action) => {
      state.selectedPatient = action.payload;
    },

    
    clearpatients: (state:any) => {
        state.list = {};
        state.selectedPatient=null;
      },

  },
});

export const { setPatients, setSelectedPatient ,clearpatients} = patientsSlice.actions;

export default patientsSlice.reducer;
