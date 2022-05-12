require("dotenv").config()

const User = require("../models/user")


const signUpPage = (req, res) => {
    res.locals.form = "Sign Up"
    res.render("form")
}

const signUpUser = async (req, res) => {
    const { email, password } = req.body
    const user = await User.create({ email, password })
    const token = user.generateToken()
    res.cookie("jwt", token, { httpOnly: true, maxAge: eval(process.env.JWT_LIFETIME) * 1000 })
    return res.status(201).json({ user: user._id })            
}

const loginPage = (req, res) => {
    res.locals.form = "Login"
    res.render("form")
}

const loginUser = async (req, res) => {
    const { email, password } = req.body
    const user = await User.login(email, password)
    const token = await user.generateToken()
    res.cookie("jwt", token, { httpOnly: true, maxAge: eval(process.env.JWT_LIFETIME) * 1000})
    return res.json({ user: user._id })
}

const signOutUser = (req, res) => {
    res.cookie("jwt", "", { maxAge: 1 })
    res.redirect("/")
}

module.exports = { signOutUser, signUpPage, signUpUser, loginPage, loginUser }