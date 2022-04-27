const express = require("express")
const connectDB = require("./db/connect")
require("dotenv").config()

const app = express()

const port = process.env.PORT
const mongoUrl = process.env.CONNECTION_URL

const start = async () => {
    try {
        await connectDB(mongoUrl)

        app.listen(port, () => console.log(`Server listening to port ${port}...`))
        
    } catch (error) {
        console.log(error)
    }
}

start()
