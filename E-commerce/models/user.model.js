import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import { isEmail } from "validator";

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
            validator: isEmail,
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

UserSchema.plugin(uniqueValidator, { message: "Email is already registered before"})

export default mongoose.model("User", UserSchema)