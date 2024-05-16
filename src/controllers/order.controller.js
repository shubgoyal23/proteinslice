import mongoose from "mongoose";
import { Order } from "../modles/oders.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getOrdetById = asyncHandler(async (req, res) => {
  const { id } = await req.params;

  const orders = await Order.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(id) } },
    { $unwind: "$items" },
    {
      $lookup: {
        from: "products",
        foreignField: "_id",
        localField: "items.productId",
        as: "items.product",
      },
    },
    {
      $group: {
        _id: "$_id",
        items: { $push: "$items" },
        status: { $first: "$status" },
        createdAt: { $first: "$createdAt" },
        total: { $first: "$total" },
        itemsName: { $first: "$itemsName" },
        coverImage: { $first: "$coverImage" },
        paymentCurrency: { $first: "$paymentCurrency" },
      },
    },
    {
      $project: {
        "items.product._id": 1,
        "items.product.name": 1,
        "items.product.description": 1,
        "items.product.price": 1,
        "items.product.images": 1,
        "items.quantity": 1,
        "items.price": 1,
        paymentCurrency: 1,
        itemsName: 1,
        status: 1,
        createdAt: 1,
        total: 1,
        coverImage: 1,
      },
    },
  ]);

  return res
    .status(200)
    .json(new ApiResponse(200, orders, "order Details fetched successfull"));
});

const getUsersOrder = asyncHandler(async (req, res) => {
  const orders = await Order.find({ userId: req?.user?._id })
    .select("-items -payment")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, orders, "orders fetched successfull"));
});

export { getUsersOrder, getOrdetById };
