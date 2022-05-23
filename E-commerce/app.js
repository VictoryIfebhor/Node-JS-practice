import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./db/index.js";

import v1Router from "./routers/index.js";

import { notFoundMiddleware } from "./middlewares/not-found.js";
import { errorHandlerMiddleware } from "./middlewares/error-handler.js";

dotenv.config()

const app = express()

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