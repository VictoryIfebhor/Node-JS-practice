require("dotenv").config()

const jwt = require('jsonwebtoken')
const { StatusCodes } = require("http-status-codes")

const User = require("../models/user")
const { createCustomError } = require("../errors/exception")

const unauthenticated = createCustomError("Not Authenticated", StatusCodes.UNAUTHORIZED)

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw unauthenticated
    }
    const token = authHeader.split(" ")[1]
    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(payload.sub).select("-password")
        next()
    } catch (error) {
        throw unauthenticated
    }
}

module.exports = authMiddleware