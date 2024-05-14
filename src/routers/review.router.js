import {Router} from 'express'
import { verifyJwt } from '../middleware/auth.middleware.js'
import { addReview, getReview, updateReview, deleteReview, getAllReviews, allReviewsOfUser } from '../controllers/review.controller.js'

const router = Router()


router.route("/").get(verifyJwt, getReview)
router.route("/").post(verifyJwt, addReview)
router.route("/").patch(verifyJwt, updateReview)
router.route("/").delete(verifyJwt, deleteReview)


router.route("/all").get(getAllReviews) // get all reviews of product
router.route("/list").get(verifyJwt, allReviewsOfUser) // get all reviews of an user

export default router