import { Router } from "express";
import authRouter from "./auth.router.js";
import userRouter from "./user.router.js";

const mainrouter = Router()

mainrouter.use("/auth", authRouter)
mainrouter.use("/users", userRouter)

export default mainrouter