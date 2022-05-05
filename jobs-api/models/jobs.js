const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Job must have a title"],
        minLength: [3, "Job title must be at least 3 characters long"],
        trim: true
    },
    company: {
        type: String,
        required: [true, "Company must be specified"]
    },
    status: {
        type: String,
        default: "pending",
        enum: {
            values: ["pending", "expired"],
            message: "{VALUE} is not supported"
        }
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
}, {timestamps: true})

module.exports = new mongoose("Job", JobSchema)