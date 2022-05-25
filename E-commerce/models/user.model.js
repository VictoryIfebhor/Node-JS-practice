import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name must be provided"]
    },
    email: {
        type: String,
        required: [true, "Email must be provided"],
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: "Email is not valid"
        }
    },
    password: {
        type: String,
        minlength: 8,
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    }
})

UserSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword
    }
    next()
})

UserSchema.pre("updateOne", async function (next) {
    const data = this.getUpdates()
    if (data.password) {
        const salt = await bcrypt.genSalt()
        data.password = await bcrypt.hash(data.password, salt)
    }
    next()
})

UserSchema.methods.generateToken = function () {
    const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME })
    return token
}

UserSchema.methods.confirmPassword = async function (password) {
    const isPasswordCorrect = await bcrypt.compare(password, this.password)
    return isPasswordCorrect
}

UserSchema.plugin(uniqueValidator, { message: "Email is already registered before" })

export default mongoose.model("User", UserSchema)