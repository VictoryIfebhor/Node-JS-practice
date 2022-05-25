import { StatusCodes } from "http-status-codes";
import User from "../models/user.model.js";
import { BadRequest, NotFoudError, UnauthenticatedError } from "../errors/custom-errors.js";

export const getAllUsers = async (req, res) => {
    const users = await User.find({ role: "user" }).select("-password")
    res.status(StatusCodes.OK).json({ users })
}

export const getSingleUser = async (req, res) => {
    const user = await User.findById(req.params.id).select("-password")
    if (!user) {
        throw new NotFoudError("User not found")
    }
    res.status(StatusCodes.OK).json({ user })
}

export const showCurrentUser = async (req, res) => {
    const user = req.user
    res.status(StatusCodes.OK).json({ user })
}

export const updateUser = async (req, res) => {
    const { email } = req.user
    const { name } = req.body
    if (!name) {
        throw new BadRequest("Name was not provided")
    }
    // mongoose-unique-validator requires that context option be set to query
    const user = await User.findOneAndUpdate({ email }, { name }, { new: true, runValidators: true, context: "query" })
    res.status(StatusCodes.OK).json({ user })
}

export const updatePassword = async (req, res) => {
    const { _id: id, email } = req.user
    const { oldPassword, newPassword } = req.body
    if (!oldPassword || !newPassword) {
        throw new BadRequest("Please provide both the old password and the new password")
    }
    const user = await User.findById(id)
    const isPasswordCorrect = await user.confirmPassword(oldPassword)
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError("Password is incorrect")
    }
    await User.updateOne({ email }, { password: newPassword })
    res.status(StatusCodes.OK).json({ msg: "Password updated successfully" })
}