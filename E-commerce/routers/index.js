import { Router } from "express";
import authRouter from "./auth.router.js";
import userRouter from "./user.router.js";
import reviewRouter from "./review.router.js";
import orderRouter from "./order.router.js";

const mainrouter = Router();

mainrouter.use("/auth", authRouter);
mainrouter.use("/users", userRouter);
mainrouter.use("/reviews", reviewRouter);
mainrouter.use("/orders", orderRouter);

export default mainrouter;
