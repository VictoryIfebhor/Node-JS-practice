import { Router } from "express";
import authRouter from "./auth.router.js";

const mainrouter = Router()

mainrouter.use("/auth", authRouter)

export default mainrouter