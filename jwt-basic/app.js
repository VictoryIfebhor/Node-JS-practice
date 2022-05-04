require("dotenv").config()
require('express-async-errors');

const express = require("express")

const routeNotFound = require("./middlewares/not-found")
const errorHandlerMiddleware = require("./middlewares/error-handler")


const app = express()

// express middlewares
app.use(express.json())


app.get("/", (_, res) => res.send("Connected"))


// routes


// custom middlewares
app.use(routeNotFound)
app.use(errorHandlerMiddleware)


// env variables
const port = process.env.PORT


app.listen(port, () => console.log(`Server listening at port ${port}`))