import {Router} from 'express'
import { verifyJwt } from '../middleware/auth.middleware.js'
import { addReview, getReview, updateReview, deleteReview, getAllReviews } from '../controllers/review.controller.js'

const router = Router()


router.route("").get(getReview)
router.route("").post(verifyJwt, addReview)
router.route("").patch(verifyJwt, updateReview)
router.route("").delete(verifyJwt, deleteReview)


router.route("/all/:id").get(getAllReviews)

export default router