require("dotenv").config()
require("express-async-errors")

const express = require("express")
const fileUpload = require('express-fileupload')
const cloudinary = require("cloudinary").v2

const connectDB = require("./db")
const notFoundMiddleware = require("./middlewares/not-found")
const errorHandlerMiddleware = require("./middlewares/error-handler")

const productRoute = require("./routes/productRoute")

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

const app = express()

app.use(express.json())
app.use(fileUpload({ useTempFiles: true }))

app.use("/api/v1/products", productRoute)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.port
const mongoUri = process.env.MONGO_URI

const start = async () => {
    try {
        await connectDB(mongoUri)
        app.listen(port, () => {
            console.log(`Server listening on port ${port}`)
        })        
    } catch (error) {
        console.log(error)
    }
}

start()