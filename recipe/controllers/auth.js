require("dotenv").config()

const User = require("../models/user")


const signUpPage = (req, res) => {
    res.render("signup")
}

const signUpUser = async (req, res) => {
    const { email, password } = req.body
    const user = await User.create({ email, password })
    const token = user.generateToken()
    res.cookie("jwt", token, { httpOnly: true, maxAge: eval(process.env.JWT_LIFETIME) * 1000 })
    return res.status(201).json({ user: user._id })            
}

const loginPage = (req, res) => {
    res.render("login")
}

const loginUser = async (req, res) => {
    const { email, password } = req.body
    const user = await User.login(email, password)
    const token = await user.generateToken()
    res.cookie("jwt", token, { httpOnly: true, maxAge: eval(process.env.JWT_LIFETIME) * 1000})
    return res.json({ user: user._id })
}

module.exports = { signUpPage, signUpUser, loginPage, loginUser }