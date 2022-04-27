const express = require("express")
const connectDB = require("./db/connect")
const task = require("./routes/task")
require("dotenv").config()

const app = express()

const port = process.env.PORT
const mongoUrl = process.env.CONNECTION_URL

app.use(express.json())

app.use("/api/v1/tasks", task)

const start = async () => {
    try {
        await connectDB(mongoUrl)

        app.listen(port, () => console.log(`Server listening to port ${port}...`))
        
    } catch (error) {
        console.log(error)
    }
}

start()
