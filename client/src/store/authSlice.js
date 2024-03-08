import { createSlice } from "@reduxjs/toolkit";

export const authSrevice = createSlice({
   name: "User Authentication",
   initialState: {
      isLogged: false,
      userData: null,
   },
   reducers: {
      login: (state, action) => {
         state.isLogged = true;
         state.userData = action.payload;
      },
      logout: (state) => {
         state.isLogged = false;
         state.userData = null;
      },
   },
});

export const { login, logout } = authSrevice.actions;

export default authSrevice.reducer;
