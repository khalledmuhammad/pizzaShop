const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrderSchema = mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    orderItems: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
        amount : {
          type: Number,
          default: 0,
        },
        price: { type: Number, required: true },
        title : {type: String }
      },
    ],
    totalPrice: {
      type: Number,
      default: 0,
    },
    quantity: { type: Number, required: true },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);
module.exports = { Order };
