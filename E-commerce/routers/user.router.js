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

router.use(permit("admin"))

router.get("/:id", getSingleUser)
router.get("/", getAllUsers)

export default router