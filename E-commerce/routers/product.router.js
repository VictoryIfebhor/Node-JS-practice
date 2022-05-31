import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  uploadProductImage,
} from "../controllers/product.controller.js";
import { getSingleProductReviews } from "../controllers/review.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").get(getAllProducts).post(authMiddleware, createProduct);
router
  .route("/:id")
  .get(getSingleProduct)
  .patch(authMiddleware, updateProduct)
  .delete(authMiddleware, deleteProduct);
router.patch("/:id/image", authMiddleware, uploadProductImage);
router.get("/:id/reviews", getSingleProductReviews);

export default router;
