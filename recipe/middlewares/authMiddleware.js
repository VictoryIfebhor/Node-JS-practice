require("dotenv").config()
const jwt = require("jsonwebtoken")
const User = require("../models/user")

const setLocals = async (req, res, next) => {
    const token = req.cookies.jwt
    if (!token) {
        res.locals.user = null
    } else {
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET)
            const user = await User.findById(payload.sub).select("-password")
            res.locals.user = user
        } catch {
            res.locals.user = null
        }
    }
    next()
}

const authMiddleware = (req, res, next) => {
    const user = res.locals.user
    if (!user)  {
        return res.redirect("/users/login")
    }
    next()
}

module.exports = { authMiddleware, setLocals }