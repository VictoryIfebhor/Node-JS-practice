const User = require("../models/user")
const { StatusCodes } = require('http-status-codes')
const { createCustomError, invalidCredentials } = require("../errors/exception")

const registerUser = async (req, res) => {
    const user = await User.create(req.body)
    res.status(StatusCodes.CREATED).json({ msg: `${user.fullName} account created successfully` })
}

const loginUser = async (req, res, next) => {
    const { email, password } = req.body

    if (!email || !password) {
        throw createCustomError("Please provide email and password", StatusCodes.BAD_REQUEST)
    }

    const user = await User.find({ email })
    
    if (!user) {
        throw invalidCredentials
    }

    const isPasswordCorrect = user.confirmPassword(password)
    
    if (!isPasswordCorrect) {
        throw invalidCredentials
    }

    const token = user.generateToken()
    
    res.json({ access_token: token, token_type: "Bearer" })
}

module.exports = { loginUser, registerUser }