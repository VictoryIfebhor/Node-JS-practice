import { Router } from "express";
import { createReview, deleteReview, getAllReviews, getSingleReview, updateReview } from "../controllers/review.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/")
  .post(authMiddleware, createReview)
  .get(getAllReviews)
router.route("/:id")
  .get(getSingleReview)
  .patch(authMiddleware, updateReview)
  .delete(authMiddleware, deleteReview)

export default router
