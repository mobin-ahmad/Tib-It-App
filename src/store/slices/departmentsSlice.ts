import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [], // List of patients
};

const departmentsSlice = createSlice({
  name: 'departments',
  initialState,
  reducers: {
    setdepartments: (state, action) => {
      state.list = action.payload;
    },
   

    
    cleardepartments: (state:any) => {
      state.list = {};
    },

  },
});

export const { setdepartments, cleardepartments } = departmentsSlice.actions;

export default departmentsSlice.reducer;
