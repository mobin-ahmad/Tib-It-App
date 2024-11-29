import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  Reports: [], // List of patients
};

const labReportSlice = createSlice({
  name: 'labreport',
  initialState,
  reducers: {
    setLabReport: (state, action) => {
      state.Reports = action.payload;
    },
    // setSelectedPatient: (state, action) => {
    //   state.selectedPatient = action.payload;
    // },
  },
});

export const { setLabReport } = labReportSlice.actions;

export default labReportSlice.reducer;
