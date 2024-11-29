import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [], // List of patients
};

const doctorsSlice = createSlice({
  name: 'doctors',
  initialState,
  reducers: {
    setdoctors: (state, action) => {
      state.list = action.payload;
    },
   

    
    cleardoctors: (state:any) => {
      state.list = [];
    },

  },
});

export const { setdoctors, cleardoctors } = doctorsSlice.actions;

export default doctorsSlice.reducer;
