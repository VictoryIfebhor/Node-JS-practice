require("dotenv").config()

const express = require("express")

const connectDB = require("./db/connect")
const routeNotFound = require("./middlewares/not-found")
const errorHandlerMiddleware = require("./middlewares/error-handler")

const products = require("./routes/products")


const app = express()

// express middlewares
app.use(express.json())


app.get("/", (_, res) => res.send("Connected"))


// routes
app.use("/api/v1/products", products)


// custom middlewares
app.use(routeNotFound)
app.use(errorHandlerMiddleware)


// env variables
const port = process.env.PORT
const mongoURI = process.env.CONNECTION_URL


// start function
const start = async () => {
    try {
        // await connectDB(mongoURI)
        app.listen(port, () => console.log(`Server listening at port ${port}`))
    } catch (error) {
        console.log(error)
        console.log("Could not connect to the database")
    }
}

start()