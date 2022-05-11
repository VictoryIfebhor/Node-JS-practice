require("dotenv").config()
const jwt = require("jsonwebtoken")


const authMiddleware = (req, res, next) => {
    const token = req.cookies.jwt
    if (!token)  {
        return res.redirect("/users/login")
    }
    try {
        /* 
            for this application, there is no need for the user details in the token
            the token is only needed to allow the user visit a page
        */
        jwt.verify(token, process.env.JWT_SECRET)
        next()
    } catch (err) {
        return res.redirect("/users/login")
    }
}

module.exports = authMiddleware