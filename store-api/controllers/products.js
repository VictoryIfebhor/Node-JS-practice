const Product = require("../models/products")

const getProducts = async (req, res) => {
    const products = await Product.find()
    return res.json({ count: products.length, products })
}

const getProductById = async (req, res) => {
    const product = await Product.findById(req.params.id)
    return res.json({ product })
}

module.exports = { getProducts, getProductById }