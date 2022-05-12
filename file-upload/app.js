require("dotenv").config()
require("express-async-errors")

const express = require("express")

const connectDB = require("./db")
const notFoundMiddleware = require("./middlewares/not-found")
const errorHandlerMiddleware = require("./middlewares/error-handler")


const app = express()

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