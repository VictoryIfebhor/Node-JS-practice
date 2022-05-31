import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import cloudinaryConfig from "./utils/cloudinary.js";
import { connectDB } from "./db/index.js";

import v1Router from "./routers/index.js";

import { notFoundMiddleware } from "./middlewares/not-found.js";
import { errorHandlerMiddleware } from "./middlewares/error-handler.js";

dotenv.config()

const app = express()

cloudinaryConfig()

app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET))
app.use(fileUpload({ useTempFiles: true }))

app.use("/api/v1", v1Router)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT
const mongoUrl = process.env.MONGO_URI

const start = async () => {
    try {
        await connectDB(mongoUrl)
        app.listen(port, () => console.log(`Server listening on port ${port}...`))
    } catch (error) {
        console.log("Could not connect to database");
    }
}

start()