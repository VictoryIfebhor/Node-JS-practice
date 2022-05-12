const fs = require("fs").promises

const cloudinary = require("cloudinary").v2

const Product = require("../models/productModel")
const { StatusCodes } = require("http-status-codes")
const { createCustomError } = require("../errors/exception")

const createProduct = async (req, res) => {
    const { name, price, image } = req.body
    const product = await Product.create({ name, price, image })
    res.status(StatusCodes.CREATED).json({ product })
}

const getAllProducts = async (req, res) => {
    const products = await Product.find()
    res.json({ products })
}

const uploadImage = async (req, res) => {
    const maxSize = 1000 * 1024
    const image = req.files?.image
    if (!image) {
        throw createCustomError("No file uploaded", StatusCodes.BAD_REQUEST)
    }
    if (!image.mimetype.startsWith("image")) {
        throw createCustomError("File uploaded is not an image", StatusCodes.BAD_REQUEST)
    }
    if (image.size > maxSize) {
        throw createCustomError("Image should be less than 1mb", StatusCodes.BAD_REQUEST)
    }
    const result = await cloudinary.uploader.upload(image.tempFilePath, {
        use_filename: true,
        folder: "file-upload-node-practice"
    })
    await fs.unlink(image.tempFilePath)
    return res.json({ imageUrl: result.secure_url})
}

module.exports = { createProduct, getAllProducts, uploadImage }