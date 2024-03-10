import { Router } from "express";
import {
  createuser,
  loginUser,
  logoutuser,
  changePassword,
  currentUser,
  updateDetails,
  refereshTokens,
  updateAddress
} from "../controllers/user.controller.js";
import { verifyJwt } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/register").post(createuser);
router.route("/login").post(loginUser);
router.route("/token").post(refereshTokens);

//secure
router.route("/logout").get(verifyJwt, logoutuser);
router.route("/verify").post(verifyJwt);
router.route("/password").post(verifyJwt, changePassword);
router.route("/edit").post(verifyJwt, updateDetails);
router.route("/address").post(verifyJwt, updateAddress);
router.route("/current").post(currentUser);

export default router;
