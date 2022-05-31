import { Router } from "express";
import { authMiddleware, permit } from "../middlewares/auth.middleware.js";
import {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updatePassword,
  updateUser,
} from "../controllers/user.controller.js";

const router = Router();

router.use(authMiddleware);

router.get("/", permit("admin"), getAllUsers);
router.get("/me", showCurrentUser);
router.get("/:id", permit("admin", "self"), getSingleUser);
router.patch("/", updateUser);
router.patch("/password", updatePassword);

export default router;
