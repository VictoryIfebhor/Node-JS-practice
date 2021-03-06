const User = require("../models/user")
const { StatusCodes } = require('http-status-codes')
const { createCustomError } = require("../errors/exception")

const invalidCredentials = createCustomError("Invalid Credentials", StatusCodes.UNAUTHORIZED)
const noEmailOrPassword = createCustomError("Please provide email and password", StatusCodes.BAD_REQUEST)

const registerUser = async (req, res) => {
    const user = await User.create(req.body)
    res.status(StatusCodes.CREATED).json({ msg: `${user.fullName} account created successfully` })
}

const loginUser = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        throw noEmailOrPassword
    }
    const user = await User.findOne({ email })
    if (!user) {
        throw invalidCredentials
    }
    const isPasswordCorrect = await user.confirmPassword(password)
    if (!isPasswordCorrect) {
        throw invalidCredentials
    }
    const token = user.generateToken()
    res.json({ access_token: token, token_type: "Bearer" })
}

module.exports = { loginUser, registerUser }