const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "please add a title"],
      maxLength: [100, "too long"],
    },

    desc: {
      type: String,
      required: [true, "please add a title"],
      maxLength: [1000, "add more desc"],
    },
    img: { type: String },
    categories: { type: Array },
    size: { type: String },
    color: { type: String },
    featured: { type: Boolean, default: false },
    price: { type: Number, required: true },
   
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);
module.exports = { Product };
