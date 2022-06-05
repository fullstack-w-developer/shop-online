import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    images: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      trim: true,
      required: true,
    },
    inStock: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    content: {
      type: String,
      trim: true,
      required: true,
    },
    Score: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
// @ts-ignore
export default mongoose.models.product ||
  mongoose.model("product", ProductSchema);
