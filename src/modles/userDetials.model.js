import mongoose from "mongoose";
const userDetailsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
  },
  name: String,
  email: String,
  phone: String,
  house: String,
  street: String,
  city: String,
  country: String,
  state: String,
  zip: String,
});

export const OrderDetails = mongoose.model("OrderDetails", userDetailsSchema);
