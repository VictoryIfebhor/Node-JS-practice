require("dotenv").config()
const mongoose = require("mongoose")
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')


const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "name must be provided"],
        validate: {
            validator: function (val) {
                return val.split(" ").length > 1
            },
            message: "Only one name was provided. Full name should contain at least 2 names"
        }
    },
    email: {
        type: String,
        required: [true, "Email must be provided"],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Not a valid email"
        ],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password must be provided"],
    }
}, {timestamps: true})


UserSchema.pre("save", function(next) {
    const salt = await bcryptjs.genSalt()
    const passwordHash = await bcryptjs.hash(this.password, salt)
    this.password = passwordHash
    next()
})


UserSchema.methods.generateToken = function() {
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {expiresIn: "12h"})
}


UserSchema.methods.confirmPassword = function(password) {
    return bcryptjs.compare(password, this.password)
}

module.exports = new mongoose.model("User", UserSchema)