import { configureStore } from "@reduxjs/toolkit";
import authSrevice from "./authSlice";
import cart from "./cartSlice";
import currencySlice from "./currencySlice";

export default configureStore({
  reducer: {
    authentication: authSrevice,
    cart: cart,
    currency: currencySlice,
  },
});
