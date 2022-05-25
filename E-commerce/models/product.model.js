import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Please provide product name"],
        maxlength: [100, "Product name cannot be more than 100 characters"]
    },
    price: {
        type: Number,
        required: [true, "Please provide product price"]
    },
    description: {
        type: String,
        required: [true, "Please provide product price"],
        maxlength: [1000, "Product description cannot be more than a 1000 characters"]
    },
    image: {
        type: String,
        default: "/"
        // will come back to set default once there is a default image
    },
    category: {
        type: String,
        required: [true, "Please provide product category"],
        enum: {
            values: ["office", "kitchen", "bedroom"],
            message: "{VALUE} is not supported"
        }
    },
    company: {
        type: String,
        required: [true, "Please provide company"],
        enum: {
            values: ["ikea", "liddy", "marcos"],
            message: "{VALUE} is not supported"
        }
    },
    colors: {
        type: [String],
        required: [true, "Please provide colors for the product"]
    },
    featured: {
        type: Boolean,
        default: false
    },
    freeShipping: {
        type: Boolean,
        default: false
    },
    inventory: {
        type: Number,
        required: true
    },
    averageRating: {
        type: Number,
        default: 0
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: [true, "Please specify the owner of the product"]
    }
}, { timestamps: true })

export default mongoose.model("Product", ProductSchema)