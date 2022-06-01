import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    tax: {
      type: Number,
      required: true,
    },
    shippingFee: {
      type: Number,
      required: true,
    },
    subtotal: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    orderItems: [
      {
        name: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: String, required: true },
        amount: { type: String, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
      },
    ],
    status: {
      type: String,
      enum: {
        values: ["pending", "failed", "paid", "delivered", "canceled"],
        message: "{VALUE} is not a valid status",
      },
      default: "pending",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    clientSecret: {
      type: String,
      required: true,
    },
    paymentIntentId: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", OrderSchema);
