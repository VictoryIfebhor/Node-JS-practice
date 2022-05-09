require("dotenv").config()
require("express-async-errors")

const express = require('express')
const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs')
const rateLimit = require("express-rate-limit")
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean');


const connectDB = require("./db")
const authMiddleware = require("./middlewares/auth")
const errorHandlerMiddleware = require("./middlewares/error-handler")
const routeNotFound = require("./middlewares/not-found")

const auth = require("./routes/auth")
const jobs = require("./routes/jobs")
const users = require("./routes/user")


const app = express()
const swaggerDocument = YAML.load('./swagger.yml')


app.set("trust proxy", 1)
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})
app.use(limiter)

app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(xss())


app.get("/", (req, res) => res.send(req.ip))
app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
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