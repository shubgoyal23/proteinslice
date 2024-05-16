import { asyncHandler } from "../utils/asyncHandler.js";
import { Product } from "../modles/products.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const allProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res
    .status(200)
    .json(new ApiResponse(200, products, "products fetched successful"));
});
const productSearch = asyncHandler(async (req, res) => {
  const query = req.query.q;
  if (!query) {
    throw new ApiError(401, "query is required");
  }
  const product = await Product.find({
    $or: [
      { name: { $regex: query, $options: "i" } },
      { description: { $regex: query, $options: "i" } },
    ],
  });

  if (product.length === 0) {
    throw new ApiError(401, "No Product found For this query");
  }

  res
    .status(200)
    .json(new ApiResponse(200, product, "product fetched successfully"));
});
const brandSearch = asyncHandler(async (req, res) => {
  const query = req.query.q;
  if (!query) {
    throw new ApiError(401, "query is required");
  }
  const product = await Product.find({
    brand: { $regex: query, $options: "i" },
  });

  if (product.length === 0) {
    throw new ApiError(401, "No Product found For this query");
  }

  res
    .status(200)
    .json(new ApiResponse(200, product, "product fetched successfully"));
});

const categorySearch = asyncHandler(async (req, res) => {
  const { q: query, limit } = req.query;
  const product = await Product.aggregate([
    {
      $match: {
        category: { $regex: query },
      },
    },
    {
      $sort: {
        rating: -1,
      },
    },
    {
      $limit: parseInt(limit),
    },
  ]);

  if (product.length === 0) {
    throw new ApiError(401, "No Product found For this query");
  }

  res
    .status(200)
    .json(new ApiResponse(200, product, "product fetched successfully"));
});
const product = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  if (!product) {
    throw new ApiError(401, "No Product found For given id");
  }

  res
    .status(200)
    .json(new ApiResponse(200, product, "product fetched successfully"));
});
const Addproduct = asyncHandler(async (req, res) => {
  const admin = req.user?.type;

  if (admin !== "admin") {
    throw new ApiError(403, "Not Authorised");
  }

  const { name } = req.body;

  const check = await Product.findOne({ name: name });

  if (check) {
    throw new ApiError(401, "Product with Same name already exists");
  }

  const product = await Product.create({ ...req?.body });

  res
    .status(200)
    .json(new ApiResponse(200, product, "product created Succussfully"));
});
const editproduct = asyncHandler(async (req, res) => {
  const admin = req.user?.type;
  if (admin !== "admin") {
    throw new ApiError(403, "Not Authorised");
  }

  const { id } = req.body;
  if (!id) {
    throw new ApiError(401, "Id is required");
  }

  const product = await Product.findByIdAndUpdate(
    id,
    { ...req.body },
    { new: true }
  );

  res
    .status(200)
    .json(new ApiResponse(200, product, "product updated Succussfully"));
});
const deleteproduct = asyncHandler(async (req, res) => {
  const admin = req.user?.type;

  if (admin !== "admin") {
    throw new ApiError(403, "Not Authorised");
  }

  const { id } = req.body;
  if (!id) {
    throw new ApiError(401, "Id is required");
  }

  const product = await Product.findByIdAndDelete(id);
  console.log(product);
  if (!product) {
    throw new ApiError(404, "No product found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, {}, "product Distroyed Succussfully"));
});

export {
  allProducts,
  product,
  Addproduct,
  productSearch,
  brandSearch,
  categorySearch,
  editproduct,
  deleteproduct,
};
