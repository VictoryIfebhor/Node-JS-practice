require('dotenv').config()

const mongoose = require("mongoose")
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { isEmail } = require("validator")

const { createCustomFieldError } = require("../errors")

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: [isEmail, "Please provide a valid email"]
    },
    password: {
        type: String,
        required: true,
    }
}, {timestamps: true})

UserSchema.pre("save", async function(next){
    const salt = await bcryptjs.genSalt()
    this.password = await bcryptjs.hash(this.password, salt)
    next()
})

UserSchema.methods.comparePassword = async function(password) {
    const isMatch = await bcryptjs.compare(password, this.password)
    return isMatch
}

UserSchema.methods.generateToken = function() {
    return jwt.sign({sub: this._id}, process.env.JWT_SECRET, {
        expiresIn: eval(process.env.JWT_LIFETIME)
    })
}

UserSchema.statics.login = async function(email, password) {
    if (!isEmail(email)) {
        throw createCustomFieldError("email", "Provide a valid email")
    }
    const user = this.findOne({ email })
    if (!user) {
        throw createCustomFieldError("email", "No account registered with this email")
    }
    const isMatch = await bcryptjs.compare(password, this.password)
    if (!isMatch) {
        throw createCustomFieldError("password", "Password is invalid")
    }
    return user
}

module.exports = new mongoose.model("User", UserSchema)