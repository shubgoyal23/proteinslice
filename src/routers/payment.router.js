import { Router } from "express";
import { createOrder, key, verifyPayment } from "../controllers/payment.controller.js";
import {verifyJwt} from "../middleware/auth.middleware.js"
const router = Router()

router.route("/key").get(verifyJwt, key)
router.route("/pay").post(verifyJwt, createOrder)
router.route("/verify/:id").post(verifyJwt, verifyPayment)

export default router