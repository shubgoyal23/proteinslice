import { configureStore } from "@reduxjs/toolkit";
import authSrevice from "./authSlice";
import cart from "./cartSlice";

export default configureStore({
  reducer: {
    authentication: authSrevice,
    cart: cart,
  },
});
