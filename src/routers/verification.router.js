import {Router} from 'express'
import {verifyJwt} from '../middleware/auth.middleware.js'
import { generateCode, verifycode } from '../controllers/verification.controller.js'
const router = Router()


router.route("/").get(verifyJwt, generateCode)
router.route("/:id").get(verifyJwt, verifycode)

export default router