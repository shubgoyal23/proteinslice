import {Router} from "express"
import { addContactForm } from "../controllers/contact.controller.js";

const router = Router()

router.route("/").post(addContactForm)

export default router