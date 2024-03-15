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
        as: "items.product",
      },
    },
    {
      $group: {
        _id: "$_id",
        items: { $push: '$items' } ,
        status: { $first: "$status" },
        createdAt: { $first: "$createdAt" },
        total: { $first: "$total" },
      },
    },
    {
      $project: {
        "items.product._id": 1,
        "items.product.name": 1,
        "items.product.description": 1,
        "items.product.price": 1,
        "items.product.images": 1,
        "items.product.images": 1,
        "items.quantity": 1,
        "items.price": 1,
        "status": 1,
        "createdAt": 1,
        "total": 1,
      },
    },
  ]);

  return res
    .status(200)
    .json(new ApiResponse(200, orders, "orders fetched successfull"));
});

export { getUsersOrder };
