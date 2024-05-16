import {Router} from "express"
import { verifyJwt } from "../middleware/auth.middleware.js";
import { getOrdetById, getUsersOrder } from "../controllers/order.controller.js";

const router = Router()

router.route("/").get(verifyJwt, getUsersOrder)
router.route("/:id").get(verifyJwt, getOrdetById)

export default router