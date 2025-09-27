import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    items: { type: Array, required: true },
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const OrderModel =
  mongoose.models.orders || mongoose.model("orders", orderSchema);

export default OrderModel;
