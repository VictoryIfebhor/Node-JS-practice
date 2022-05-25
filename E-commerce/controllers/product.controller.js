import { StatusCodes } from "http-status-codes";
import Product from "../models/product.model.js";
import { deleteKeys } from "../utils/helper.js";
import { NotFoudError } from "../errors/custom-errors.js";

export const createProduct = async (req, res) => {
    const { _id: user } = req.user
    deleteKeys(req.body, "user", "averageRating")
    const product = await Product.create({ ...req.body, user })
    res.status(StatusCodes.CREATED).json({ product })
}

export const getSingleProduct = async (req, res) => {
    const { id } = req.params
    const product = await Product.findById(id)
    if (!product) {
        throw new NotFoudError("Product does not exists")
    }
    res.status(StatusCodes.OK).json({ product })
}

export const getAllProducts = async (req, res) => {
    let { limit, skip, sort } = req.query
    const productQuery = Product.find()
    limit = limit || 50
    skip = skip || 0
    sort = sort?.split(",").join(" ") || "-averageRating price"
    const products = await Product.find({ featured: true })
        .limit(limit)
        .skip(skip)
        .sort(sort)
    res.status(StatusCodes.OK).json({ products })
}

export const updateProduct = async (req, res) => {
    const { _id: user } = req.user
    deleteKeys(req.body, "user", "averageRating", "image")
    const product = await Product.findOneAndUpdate(
        { _id: req.params.id, user },
        req.body,
        { new: true, runValidators: true }
    )
    if (!product) {
        throw new NotFoudError("Product does not exists")
    }
    res.status(StatusCodes.OK).json({ product })
}

export const deleteProduct = async (req, res) => {
    const { _id: user } = req.user
    const product = await Product.findOneAndDelete({ _id: req.params.id, user })
    if (!product) {
        throw new NotFoudError("Product does not exists")
    }
    res.status(StatusCodes.OK).json({ msg: "Product deleted successfully" })
}

export const uploadProductImage = async (req, res) => {
    throw new Error("Not implemented yet")
}