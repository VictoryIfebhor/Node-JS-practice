require("dotenv").config()

const User = require("../models/user")

const errorHandler = (error) => {
    let errMsg = {}
    if (error.code === 11000){
        errMsg = {email: "Email already registered"}
    } else {
        Object.values(error.errors).forEach(({ properties }) => {
            errMsg[properties.path] = properties.message
        })
    }
    return errMsg
}

const signUpPage = (req, res) => {
    res.render("signup")
}

const signUpUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.create({ email, password })
        try {
            const token = user.generateToken()
            res.cookie("jwt", token, { httpOnly: true, maxAge: eval(process.env.JWT_LIFETIME) * 1000 })
            return res.status(201).json({ user: user._id })            
        } catch (error) {
            return res.status(401).json({ errors: { authentication: "Cannot authenticate user" } })
        }
    } catch (error) {
        const errors = errorHandler(error)
        return res.status(400).json({ errors })
    }
}

const loginPage = (req, res) => {
    res.render("login")
}

const loginUser = (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        throw new Error("Please provide email and password")
    }
    try {
        const user = await User.findOne({ email })
        try {
            const token = user.generateToken()
            res.cookie("jwt", token, { httpOnly: true, maxAge: eval(process.env.JWT_LIFETIME) * 1000})
            return res.json({ user: user._id })
        } catch (error) {
            res.status(401).json({ errors: { authentication: "Cannot authenticate user" } })
        }
    } catch (error) {
        const errors = errorHandler(error)
        return res.status(400).json({ errors })
    }
}

module.exports = { signUpPage, signUpUser, loginPage, loginUser }