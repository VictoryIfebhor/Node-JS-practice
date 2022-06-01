import { Router } from "express";
import {
  confirmOrder,
  createOrder,
  getAllOrders,
  getMyOrders,
  getSingleOrder,
} from "../controllers/order.controller.js";
import { authMiddleware, permit } from "../middlewares/auth.middleware.js";

const router = Router();

router
  .route("/")
  .get(authMiddleware, permit("admin"), getAllOrders)
  .post(authMiddleware, createOrder);
router.route("/my-orders").get(authMiddleware, getMyOrders);
router
  .route("/:id")
  .get(authMiddleware, getSingleOrder)
  .patch(authMiddleware, confirmOrder);

export default router;
