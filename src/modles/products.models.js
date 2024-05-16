import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
    },
    category: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: "INR",
    },
    discount: {
      type: Number,
      default: 0,
    },
    availability: {
      type: Boolean,
      default: true,
    },
    weight: {
      type: Number,
    },
    dimensions: {
      type: {
        length: Number,
        width: Number,
        height: Number,
      },
    },
    images: {
      type: [String],
    },
    mpn: String,
    upc: String,
    ean: String,
    isbn: String,
    gtin: String,
    customAttributes: {
      type: Map,
      of: String,
    },
    rating: String,
    relatedProducts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    returnPeriod: {
      type: Number,
      default: 10,
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
