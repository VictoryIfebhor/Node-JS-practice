require("dotenv").config()

const jwt = require('jsonwebtoken')

const { createCustomError } = require("../errors/exception")

const unauthenticated = createCustomError("Not Authenticated", StatusCodes.UNAUTHORIZED)

const authMiddleware = (req, res,next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw unauthenticated
    }
    const token = authHeader.split(" ")[1]
    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = { id: payload.sub }
        next()
    } catch (error) {
        throw unauthenticated
    }
}

module.exports = authMiddleware