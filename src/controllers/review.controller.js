import mongoose from "mongoose";
import { Product } from "../modles/products.models.js";
import { Review } from "../modles/review.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addReview = asyncHandler(async (req, res) => {
  const { product, rating, comment, tittle } = req.body;

  if (!rating && isNaN(rating)) {
    throw new ApiError(401, "Rating is required");
  }
  if (!product) {
    throw new ApiError(401, "Product id is required");
  }

  const checkProduct = await Review.findOne({
    product: product,
    user: req.user?._id,
  });
  if (checkProduct) {
    throw new ApiError(
      401,
      "You have already posted review for this Product Please edit it from My account section. if you want to change it."
    );
  }

  const review = await Review.create({
    product,
    rating,
    comment,
    tittle,
    user: req.user?._id,
  });

  if (!review) {
    throw new ApiError(401, "cannot post a review");
  }

  const allReviews = await Review.find({ product });
  const allrating = allReviews?.reduce((acc, crr) => {
    return acc + crr.rating;
  }, 0);

  const average = (allrating / allReviews.length).toFixed(1);

  await Product.findByIdAndUpdate(product, { $set: { rating: average } });

  return res
    .status(200)
    .json(new ApiResponse(200, review, "review posted successfully"));
});

const getReview = asyncHandler(async (req, res) => {
  const id = req.user?._id;
  const p = req.query?.p;
  if (!p) {
    throw new ApiError(401, "Product id is required to get review details");
  }

  const review = await Review.findOne({ user: id, product: p });

  if (!review) {
    throw new ApiError(404, "review not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, review, "review fetched successfully"));
});

const updateReview = asyncHandler(async (req, res) => {
  const { product, rating, comment, tittle } = req.body;
  if (!product) {
    throw new ApiError(401, "review id is required to edit review details");
  }
  const id = req.user?._id;
  const edit = await Review.findOne({ user: id, product });
  if (!edit) {
    throw new ApiError(500, "review id is not correct");
  }

  if (rating) {
    edit.rating = rating;
  }
  if (comment) {
    edit.comment = comment;
  }
  if (tittle) {
    edit.tittle = tittle;
  }

  await edit.save({ validateBeforeSave: true });

  return res
    .status(200)
    .json(new ApiResponse(200, edit, "review updated successfully"));
});

const deleteReview = asyncHandler(async (req, res) => {
  const product = req.query?.product;
  const id = req.user?._id;

  if (!product) {
    throw new ApiError(401, "review id is required to edit review details");
  }

  const review = await Review.findOne({ user: id, product });
  if (!review) {
    throw new ApiError(500, "review id is not correct");
  }

  const check = review.user.equals(req.user?._id);
  if (!check) {
    throw new ApiError(403, "Not Authoried to delete");
  }

  await Review.findByIdAndDelete(review._id);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "review deleted successfully"));
});

const getAllReviews = asyncHandler(async (req, res) => {
  const { page, limit, p } = req.query;
  if (!p) {
    throw new ApiError(401, "id is required to get reviews");
  }

  const options = {
    page: page || 1,
    limit: limit || 10,
  };

  const reviewsQuery = [
    {
      $match: { product: p },
    },
    {
      $lookup: {
        from: "users",
        foreignField: "_id",
        localField: "user",
        as: "userInfo",
      },
    },
    { $unwind: "$userInfo" },
    {
      $project: {
        _id: 1,
        rating: 1,
        tittle: 1,
        comment: 1,
        createdAt: 1,
        user: 1,
        userName: "$userInfo.fullname",
        avatar: "$userInfo.avatar",
        country: "$userInfo.address.country",
      },
    },
  ];

  const reviews = await Review.aggregatePaginate(reviewsQuery, options);

  if (reviews.length === 0) {
    throw new ApiError(401, "No review found for this product");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, reviews, "reviews fetched successfull"));
});

const allReviewsOfUser = asyncHandler(async (req, res) => {
  const reviews = await Review.aggregate([
    { $match: { user: req.user._id } },
    {
      $lookup: {
        from: "products",
        localField: "product",
        foreignField: "_id",
        as: "product",
      },
    },
    {
      $addFields: {
        product: { $arrayElemAt: ["$product", 0] },
      },
    },
  ]);

  res
    .status(200)
    .json(new ApiResponse(200, reviews, "reviews fetched successfully"));
});

export {
  addReview,
  getReview,
  updateReview,
  deleteReview,
  getAllReviews,
  allReviewsOfUser,
};
