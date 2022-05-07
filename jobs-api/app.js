require("dotenv").config()
require("express-async-errors")

const express = require('express');

const connectDB = require("./db")
const authMiddleware = require("./middlewares/auth")
const errorHandlerMiddleware = require("./middlewares/error-handler")
const routeNotFound = require("./middlewares/not-found")

const auth = require("./routes/auth")
const jobs = require("./routes/jobs")
const users = require("./routes/user")


const app = express()


app.use(express.json())


app.use("/api/v1/auth", auth)

app.use(authMiddleware)
app.use("/api/v1/jobs", jobs)
app.use("/api/v1/users", users )


app.use(routeNotFound)
app.use(errorHandlerMiddleware)


const start = async () => {
    const port = process.env.PORT
    const mongoURI = process.env.MONGO_URI

    try {
        await connectDB(mongoURI)
        app.listen(port, () => console.log(`Server listening at port ${port}`))
    } catch (error) {
        console.log(error)    
    }
}

start()