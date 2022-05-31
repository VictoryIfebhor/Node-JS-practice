import { Router } from "express";
import {
    createProduct,
    deleteProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    uploadProductImage
} from "../controllers/product.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/")
  .get(getAllProducts)
  .post(authMiddleware, createProduct)
router.route("/:id")
  .get(getSingleProduct)
  .patch(authMiddleware, updateProduct)
  .delete(authMiddleware, deleteProduct)
router.patch("/image/:id", authMiddleware, uploadProductImage)

export default router
