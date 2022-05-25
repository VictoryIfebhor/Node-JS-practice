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

// public routes
router.get("/", getAllProducts)
router.get("/:id", getSingleProduct)

router.use(authMiddleware)

// protected routes
router.post("/", createProduct)
router.route("/:id")
    .patch(updateProduct)
    .delete(deleteProduct)
router.patch("/:id/image", uploadProductImage)