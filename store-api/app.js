require("dotenv").config()

const express = require("express")
const routeNotFound = require("./middlewares/not-found")
const errorHandlerMiddleware = require("./middlewares/error-handler")


const app = express()

app.use(express.json())

app.get("/", (_, res) => res.send("Connected"))

app.use(routeNotFound)
app.use(errorHandlerMiddleware)

const port = process.env.PORT

app.listen(port, () => console.log(`Server is listening at port ${port}`))