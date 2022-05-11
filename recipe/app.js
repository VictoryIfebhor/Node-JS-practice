require("dotenv").config()
require("express-async-errors")

const express = require("express")
const cookieParser = require('cookie-parser');

const connectDB = require("./db")
const auth = require("./routes/auth")
const pages = require("./routes/pages")
const authMiddleware = require("./middlewares/authMiddleware")
const routeNotFound = require("./middlewares/not-found")


const app = express()

app.use(express.static("public"))
app.use(express.json())
app.use(cookieParser())

app.set("view engine", "ejs")

app.use("/users", auth)
app.get("/:page", authMiddleware, pages)

app.use("/users", routeNotFound)

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(process.env.PORT, () => {
            console.log(`Server is listening on port ${process.env.PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()