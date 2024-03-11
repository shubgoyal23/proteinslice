import { Product } from "../modles/products.models.js";
import { Review } from "../modles/review.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addReview = asyncHandler(async (req, res) => {
  const { product, rating, comment } = req.body;

  if (!rating && isNaN(rating)) {
    throw new ApiError(401, "Rating is required");
  }

  const checkProduct = await Review.findOne({
    product: product,
    user: req.user?._id,
  });
  if (checkProduct) {
    throw new ApiError(
      401,
      "You have already posted review for this Product Please edit it if you want to change it."
    );
  }

  const review = await Review.create({
    product,
    rating,
    comment,
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

  await Product.findByIdAndUpdate(product, { rating: average });

  return res
    .status(200)
    .json(new ApiResponse(200, review, "review posted successfully"));
});

const getReview = asyncHandler(async (req, res) => {
  const id = req.query?.id;
  if (!id) {
    throw new ApiError(401, "review id is required to get review details");
  }

  const review = await Review.findById(id);
  if (!review) {
    throw new ApiError(404, "review not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, review, "review fetched successfully"));
});

const updateReview = asyncHandler(async (req, res) => {
  const { id, rating, comment } = req.body;
  if (!id) {
    throw new ApiError(401, "review id is required to edit review details");
  }
  const edit = await Review.findById(id);
  if (!edit) {
    throw new ApiError(500, "review id is not correct");
  }

  const check = edit.user.equals(req.user?._id);
  if (!check) {
    throw new ApiError(403, "Not Authoried to make this changes");
  }
  if (rating) {
    edit.rating = rating;
  }
  if (comment) {
    edit.comment = comment;
  }

  await edit.save({ validateBeforeSave: true });

  return res
    .status(200)
    .json(new ApiResponse(200, edit, "review updated successfully"));
});

const deleteReview = asyncHandler(async (req, res) => {
  const id = req.query?.id;
  if (!id) {
    throw new ApiError(401, "review id is required to edit review details");
  }

  const review = await Review.findById(id);
  if (!review) {
    throw new ApiError(500, "review id is not correct");
  }

  const check = review.user.equals(req.user?._id);
  if (!check) {
    throw new ApiError(403, "Not Authoried to delete");
  }

  await Review.findByIdAndDelete(id);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "review deleted successfully"));
});

const getAllReviews = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError(401, "id is required to get reviews");
  }

  const reviews = await Review.find({ product: id });

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
