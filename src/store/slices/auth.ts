import { createSlice } from '@reduxjs/toolkit';
 
const initialState = {
  user: {},
  token: '',

};
 
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state:any, action:any) => {
      state.user = action.payload;
    },
   
    setToken: (state:any, action:any) => {
      state.token = action.payload;
    },
   
   
    logout: (state:any) => {
      state.user = {};
      state.token = '';
    },
   
  },
});
 
export const {
  setUser,
  setToken,
  logout,
} = userSlice.actions;
 
export default userSlice.reducer;
 