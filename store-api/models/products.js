const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name is required"],
    },
    price: {
        type: Number,
        required: [true, "Product price is required"],
    },
    rating: {
        type: Number,
        default: 0.0,
    },
    company: {
        type: String,
        enum: {
            values: ["ikea", "liddy", "caressa", "marcos"],
            message: "{VALUE} is not a supported"
        }
    },
    featured: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})


module.exports = mongoose.model("Product", ProductSchema)