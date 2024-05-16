import { Router } from "express";
import { verifyJwt } from "../middleware/auth.middleware.js";
import {
  allProducts,
  product,
  Addproduct,
  productSearch,
  brandSearch,
  categorySearch,
  editproduct,
  deleteproduct
} from "../controllers/product.controller.js";
const router = Router();

router.route("/list").get(allProducts);
router.route("/item/:id").get(product);
router.route("/search").get(productSearch);
router.route("/brand").get(brandSearch);
router.route("/category").get(categorySearch);

//secure
router.route("/add").post(verifyJwt, Addproduct);
router.route("/edit").post(verifyJwt, editproduct);
router.route("/distroy").post(verifyJwt, deleteproduct);

export default router;
