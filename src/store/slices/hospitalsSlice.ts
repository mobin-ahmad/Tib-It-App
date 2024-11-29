import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [], // List of patients
};

const hospitalsSlice = createSlice({
  name: 'hospitals',
  initialState,
  reducers: {
    sethospitals: (state, action) => {
      state.list = action.payload;
    },
   

    
    clearhospitals: (state:any) => {
      state.list = {};
    },

  },
});

export const { sethospitals, clearhospitals } = hospitalsSlice.actions;

export default hospitalsSlice.reducer;
