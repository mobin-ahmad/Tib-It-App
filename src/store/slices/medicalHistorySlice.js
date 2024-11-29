import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  History: [], // List of patients
};

const medicalHistorySlice = createSlice({
  name: 'medicalhistory',
  initialState,
  reducers: {
    setMedicalHistory: (state, action) => {
      state.History = action.payload;
    },
    // setSelectedPatient: (state, action) => {
    //   state.selectedPatient = action.payload;
    // },
  },
});

export const { setMedicalHistory } = medicalHistorySlice.actions;

export default medicalHistorySlice.reducer;
