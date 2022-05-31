import { v2 as cloudinary } from "cloudinary";
import { promises as fs } from "fs";
import { StatusCodes } from "http-status-codes";
import Product from "../models/product.model.js";
import { deleteKeys } from "../utils/helper.js";
import { BadRequest, NotFoudError } from "../errors/custom-errors.js";

export const createProduct = async (req, res) => {
  const { _id: user } = req.user;
  deleteKeys(req.body, "user", "averageRating");
  const product = await Product.create({ ...req.body, user });
  res.status(StatusCodes.CREATED).json({ product });
};

export const getSingleProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id).populate("reviews");
  if (!product) {
    throw new NotFoudError("Product does not exists");
  }
  res.status(StatusCodes.OK).json({ product });
};

export const getAllProducts = async (req, res) => {
  let { limit, skip, sort } = req.query;
  limit = limit || 50;
  skip = skip || 0;
  sort = sort?.split(",").join(" ") || "-averageRating price";
  const products = await Product.find({ featured: true })
    .limit(limit)
    .skip(skip)
    .sort(sort);
  res.status(StatusCodes.OK).json({ products });
};

export const updateProduct = async (req, res) => {
  const { _id: user } = req.user;
  deleteKeys(req.body, "user", "averageRating", "image");
  const product = await Product.findOneAndUpdate(
    { _id: req.params.id, user },
    req.body,
    { new: true, runValidators: true }
  );
  if (!product) {
    throw new NotFoudError("Product does not exists");
  }
  res.status(StatusCodes.OK).json({ product });
};

export const deleteProduct = async (req, res) => {
  const { _id: user } = req.user;
  const product = await Product.findOne({ _id: req.params.id, user });
  if (!product) {
    throw new NotFoudError("Product does not exists");
  }
  await product.remove();
  res.status(StatusCodes.OK).json({ msg: "Product deleted successfully" });
};

export const uploadProductImage = async (req, res) => {
  const { _id: user } = req.user;
  const { id } = req.params;
  const image = req.files?.image;
  const oneMB = 1 * 1024 * 1024;
  const imageSize = image.size / oneMB;
  if (!image) {
    throw new BadRequest("File was not uploaded");
  }
  if (!image.mimetype.startsWith("image")) {
    throw new BadRequest("File uploaded is not an image");
  }
  if (imageSize > 3) {
    throw new BadRequest("File uploaded should not be more than 3mb");
  }
  const { secure_url } = await cloudinary.uploader.upload(image.tempFilePath, {
    folder: "E-commerce (Node.js)",
  });
  await fs.unlink(image.tempFilePath);
  const product = await Product.findOneAndUpdate(
    { _id: id, user },
    { image: secure_url },
    { new: true, runValidators: true }
  );
  if (!product) {
    throw new NotFoudError("Product does not exists");
  }
  res.status(StatusCodes.OK).json({ product });
};
