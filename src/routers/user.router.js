import { Router } from "express";
import {
  createuser,
  loginUser,
  logoutuser,
  changePassword,
  currentUser,
  updateDetails,
  refereshTokens,
  updateAddress,
  forgotPasswordSendMail,
  resetPassword,
} from "../controllers/user.controller.js";
import { verifyJwt } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/register").post(createuser);
router.route("/login").post(loginUser);
router.route("/token").post(refereshTokens);
router.route("/current").post(currentUser);
router.route("/forgot-password").post(forgotPasswordSendMail);
router.route("/reset-password").post(resetPassword);

//secure
router.route("/logout").get(verifyJwt, logoutuser);
router.route("/password").post(verifyJwt, changePassword);
router.route("/edit").post(verifyJwt, updateDetails);
router.route("/address").post(verifyJwt, updateAddress);

export default router;
