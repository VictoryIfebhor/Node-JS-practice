const Product = require("../models/products")
const { createCustomError } = require("../utils/exception")

const getProducts = async (req, res) => {
    const { name, company, featured } = req.query
    const queryObject = {}

    if (name) {
        queryObject.name = { $regex: name, $options: "i" }
    }
    if (featured) {
        if (["true", "false"].includes(featured)){
            queryObject.featured = featured === "true" ? true : false
        } else {
            throw createCustomError(`"${featured}" is not a valid input for featured. "featured" can only be true or false`, 400)
        }
    }
    if (company) {
        queryObject.company = company
    }
    console.log(queryObject);
    const products = await Product.find(queryObject)
    return res.json({ count: products.length, products })
}

const getProductById = async (req, res) => {
    const product = await Product.findById(req.params.id)
    return res.json({ product })
}

module.exports = { getProducts, getProductById }