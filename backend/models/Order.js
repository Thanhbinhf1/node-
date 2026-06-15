const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, unique: true }, // VD: ORD-2026-9901
    customerName: { type: String, required: true },
    email: { type: String },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    totalAmount: { type: Number, required: true, min: 0 },
    paymentMethod: { type: String, default: "COD" },
    paymentStatus: {
      type: String,
      enum: ["Paid", "Unpaid"],
      default: "Unpaid",
    },
    status: {
      type: String,
      enum: [
        "Chờ xác nhận",
        "Đã xác nhận",
        "Đang giao",
        "Hoàn thành",
        "Đã hủy",
      ],
      default: "Chờ xác nhận",
    },
    items: [
      {
        name: String,
        price: Number,
        qty: Number,
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Order", orderSchema);
