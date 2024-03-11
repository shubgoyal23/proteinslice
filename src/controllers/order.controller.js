import { Order } from "../modles/oders.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getUsersOrder = asyncHandler(async (req, res) => {
  const orders = await Order.aggregate([
    { $match: { userId: req?.user?._id } },
    { $unwind: "$items" },
    {
      $lookup: {
        from: "products",
        foreignField: "_id",
        localField: "items.productId",
        as: "products",
      },
    },
    {
      $group: {
        _id: "$_id",
        productslist: { $addToSet: { $first: "$products" } },
        status: { $first: "$status" },
        createdAt: { $first: "$createdAt" },
        total: { $first: "$total" },
      },
    },
  ]);

  return res
    .status(200)
    .json(new ApiResponse(200, orders, "orders fetched successfull"));
});

export { getUsersOrder };
