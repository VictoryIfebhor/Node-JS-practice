import User from "../models/user.model.js";
import { StatusCodes } from "http-status-codes";
import { BadRequest } from "../errors/custom-errors.js";

export const registerUser = async (req, res) => {
    const { name, email, password } = req.body
    const user = await User.create({ name, email, password })
    res.cookie("jwt", user.generateToken(), { maxAge: "1d", httpOnly: true })
    res.status(StatusCodes.CREATED).json({ msg: "Account created successfully" })
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
        throw new BadRequest("Invalid Credentials")
    }
    const isPasswordCorrect = await user.confirmPassword(password)
    if (!isPasswordCorrect) {
        throw new BadRequest("Invalid credentials")
    }
    res.cookie("jwt", user.generateToken(), { maxAge: "1d", httpOnly: true })
    res.status(StatusCodes.OK).json({ msg: "Login successful" })
}

export const logoutUser = async (req, res) => {
    res.cookie("jwt", "", { maxAge: 1 })
    res.status(StatusCodes.OK).json({ msg: "User logged out" })
}