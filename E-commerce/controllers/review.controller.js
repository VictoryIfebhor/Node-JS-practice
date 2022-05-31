import { StatusCodes } from "http-status-codes";
import Review from "../models/review.model.js";
import { deleteKeys } from "../utils/helper.js";
import { NotFoudError } from "../errors/custom-errors.js";

export const getAllReviews = async (req, res) => {
  const reviews = await Review.find()
    .populate({
      path: "product",
      select: "name price company",
    })
    .populate({
      path: "user",
      select: "name",
    });
  res.status(StatusCodes.OK).json({ reviews });
};

export const getSingleReview = async (req, res) => {
  const { id } = req.params;
  const review = await Review.findById(id)
    .populate({
      path: "product",
      select: "name price company",
    })
    .populate({
      path: "user",
      select: "name",
    });
  res.status(StatusCodes.OK).json({ review });
};

export const createReview = async (req, res) => {
  const user = req.user._id;
  deleteKeys(req.body, "user");
  const review = await Review.create({ ...req.body, user });
  res.status(StatusCodes.CREATED).json({ review });
};

export const updateReview = async (req, res) => {
  const { id } = req.params;
  const { _id: user } = req.user;
  const { title, rating, comment } = req.body;
  const review = await Review.findOne({ _id: id, user });
  if (!review) {
    throw new NotFoudError("No such review found");
  }
  review.title = title
  review.rating = rating
  review.comment = comment
  await review.save()
  res.status(StatusCodes.OK).json({ review });
};

export const deleteReview = async (req, res) => {
  const { id } = req.params;
  const { _id: user } = req.user;
  const review = await Review.findOne({ _id: id, user });
  if (!review) {
    throw new NotFoudError("No such review found");
  }
  await review.remove()
  res.status(StatusCodes.OK).json({ msg: "Review deleted successfully" });
};

export const getSingleProductReviews = async (req, res) => {
  const { id: product } = req.params;
  const reviews = await Review.find({ product });
  res.status(StatusCodes.OK).json({ reviews });
};
