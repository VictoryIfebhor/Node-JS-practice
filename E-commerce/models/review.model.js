import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "Please provide review title"],
    },
    rating: {
      type: Number,
      required: [true, "Please provide rating"],
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: [true, "Please provide comment"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Please provide product"],
    },
  },
  { timestamps: true }
);

ReviewSchema.index({ product: 1, user: 1 }, { unique: true });

ReviewSchema.post("save", async function (next) {
  await this.constructor.updateProductRatingInfo(this.product);
  next();
});

ReviewSchema.post("remove", async function (next) {
  await this.constructor.updateProductRatingInfo(this.product);
  next();
});

ReviewSchema.statics.updateProductRatingInfo = async function (product) {
  const result = await this.aggregate([
    {
      $match: { product },
    },
    {
      $group: {
        _id: "$product",
        averageRating: { $avg: "$rating" },
        numberOfReviews: { $sum: 1 },
      },
    },
  ]);
  try {
    await this.model("Product").findByIdAndUpdate(product, {
      averageRating: Math.ceil(result[0]?.averageRating || 0),
      numberOfReviews: result[0]?.numberOfReviews || 0,
    });
  } catch (error) {
    console.log(error);
  }
};

export default mongoose.model("Review", ReviewSchema);
