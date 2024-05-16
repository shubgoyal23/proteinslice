import { createSlice } from "@reduxjs/toolkit";
import {
  getUserCurrency,
  setUserCurrency,
} from "../service/currencyConvertor/currencyConvert";

export const currencyService = createSlice({
  name: "User currency",
  initialState: {
    userCurrency: getUserCurrency(),
  },
  reducers: {
    changeCurrency: (state, action) => {
      state.userCurrency = action.payload;
      setUserCurrency(action.payload);
    },
  },
});

export const { changeCurrency } = currencyService.actions;

export default currencyService.reducer;
