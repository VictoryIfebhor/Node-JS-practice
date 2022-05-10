require("dotenv").config()

const express = require("express")
const cookieParser = require('cookie-parser');

const connectDB = require("./db")
const auth = require("./routes/auth")


const app = express()

app.use(express.static("public"))
app.use(express.json())
app.use(cookieParser())

app.set("view engine", "ejs")

app.get("/", (req, res) => res.render("home"))
app.get("/smoothies", (req, res) => res.render("smoothies"))
app.use("/users", auth)


const start = async () => {
    try {
        // await connectDB(process.env.MONGO_URI)
        app.listen(process.env.PORT, () => {
            console.log(`Server is listening on port ${process.env.PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()