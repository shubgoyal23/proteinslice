import mongoose from "mongoose";

const oderItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    itemsName: String,
    coverImage: String,
    paymentCurrency: String,
    items: [oderItemSchema],
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "Payment Recieved", "delivered", "shipped", "returned"],
      default: "pending",
    },
    payment: {
      type: String,
    },
    userDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OrderDetails",
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
