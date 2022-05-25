import { Router } from "express";
import { authMiddleware, permit } from "../middlewares/auth.middleware.js";
import {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updatePassword,
    updateUser
} from "../controllers/user.controller.js";

const router = Router()

router.use(authMiddleware)

router.get("/me", showCurrentUser)
router.patch("/", updateUser)
router.patch("/password", updatePassword)

router.get("/:id", permit("admin", "self"), getSingleUser)
router.get("/", permit("admin"), getAllUsers)

export default router