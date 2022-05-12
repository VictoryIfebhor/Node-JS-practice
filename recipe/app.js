require("dotenv").config()
require("express-async-errors")

const express = require("express")
const cookieParser = require('cookie-parser');

const connectDB = require("./db")
const auth = require("./routes/auth")
const routeNotFound = require("./middlewares/not-found")
const errorHandler = require("./middlewares/errorHandlerMiddleware")
const { authMiddleware, setLocals} = require("./middlewares/authMiddleware")


const app = express()

app.use(express.static("public"))
app.use(express.json())
app.use(cookieParser())

app.set("view engine", "ejs")

app.use(setLocals)
app.get("/", (req, res) => res.render("home"))
app.get("/smoothies", authMiddleware, (req, res) => res.render("smoothies"))
app.use("/users", auth)
app.post("/users", routeNotFound)
app.use((req, res) => res.render("notFound"))

app.use(errorHandler)


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