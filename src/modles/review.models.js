import mongoose from "mongoose";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";

const reviewSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    title: {
      type: String,
      maxLength: 50
    },
    comment: {
      type: String,
      maxLength: 300
    },
  },
  { timestamps: true }
);

reviewSchema.plugin(aggregatePaginate);

export const Review = mongoose.model("Review", reviewSchema);
