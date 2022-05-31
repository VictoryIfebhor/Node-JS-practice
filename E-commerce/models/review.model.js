import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, "Please provide review title"]
    },
    rating: {
        type: Number,
        required: [true, "Please provide rating"],
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: [true, "Please provide comment"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Please provide user"]
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: [true, "Please provide product"]
    }
}, { timestamps: true })

ReviewSchema.index({ product: 1, user: 1 }, { unique: true })

export default mongoose.model("Review", ReviewSchema)
