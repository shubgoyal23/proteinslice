import {Router} from 'express'
import {verifyJwt} from '../middleware/auth.middleware.js'
import { sendVerificationMail, verifycode } from '../controllers/verification.controller.js'
const router = Router()


router.route("/").get(verifyJwt, sendVerificationMail)
router.route("/").post(verifycode)

export default router