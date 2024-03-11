import {Router} from "express"
import { verifyJwt } from "../middleware/auth.middleware.js";
import { getUsersOrder } from "../controllers/order.controller.js";

const router = Router()

router.route("/").get(verifyJwt, getUsersOrder)

export default router