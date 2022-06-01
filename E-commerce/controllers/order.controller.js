import { StatusCodes } from "http-status-codes";

import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import { BadRequest, NotFoudError } from "../errors/custom-errors.js";

const fakeStripeAPI = async ({ amount, currency }) => {
  const client_secret = "fakeClientSecret";
  return { client_secret, amount, currency };
};

export const createOrder = async (req, res) => {
  const { items, tax, shippingFee } = req.body;
  if (!items || items.length < 1) {
    throw new BadRequest("Items must be provided");
  }
  let orderItems = [];
  let subtotal = 0;
  for (const item in items) {
    const product = await Product.findById({ _id: item.product });
    if (!product) {
      throw new NotFoudError(`No product with id: ${item.product}`);
    }
    const { name, price, image, _id } = product;
    const orderItem = { name, image, price, amount: item.amount, product: _id };
    orderItems = [...orderItems, orderItem];
    subtotal += item.amount * price;
  }
  const total = tax + shippingFee + subtotal;
  const paymentIntent = await fakeStripeAPI({
    amount: total,
    currency: "usd",
  });
  const order = await Order.create({
    tax,
    shippingFee,
    subtotal,
    total,
    orderItems,
    user: req.user._id,
    clientSecret: paymentIntent.client_secret,
  });
  res.status(StatusCodes.CREATED).json({ order });
};

export const getAllOrders = async (req, res) => {
  const orders = await Order.find();
  res.status(StatusCodes.OK).json({ orders });
};

export const getSingleOrder = async (req, res) => {
  const { id } = req.params;
  const order = await Order.findOne({ _id: id, user: req.user._id });
  if (!order) {
    throw new NotFoudError("Order does not exists");
  }
  res.status(StatusCodes.OK).json({ order });
};

export const confirmOrder = async (req, res) => {
  const { id } = req.params;
  const { paymentIntentId } = req.body;
  const order = await Order.findOneAndUpdate(
    { _id: id, user: req.user._id },
    { paymentIntentId, status: "paid" }
  );
  if (!order) {
    throw new NotFoudError("Order does not exists");
  }
  res.status(StatusCodes.OK).json({ order });
};

export const cancelOrder = async (req, res) => {};

export const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(StatusCodes.OK).json({ orders });
};
