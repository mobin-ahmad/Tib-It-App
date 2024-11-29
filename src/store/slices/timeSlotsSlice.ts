import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [], // List of patients
};

const timeSlotsSlice = createSlice({
  name: 'timeslots',
  initialState,
  reducers: {
    settimeslots: (state, action) => {
      state.list = action.payload;
    },
   

    
    cleartimeslots: (state:any) => {
      state.list = {};
    },

  },
});

export const { settimeslots, cleartimeslots } = timeSlotsSlice.actions;

export default timeSlotsSlice.reducer;
