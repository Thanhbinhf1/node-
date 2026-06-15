const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    sku: {
      type: String,
      required: true,
      unique: true, // Đảm bảo mã SKU không bao giờ trùng
    },
    name: {
      type: String,
      required: [true, "Vui lòng nhập tên sản phẩm"],
      trim: true,
    },
    category: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Giá không được số âm"],
    },
    stock: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["Active", "Hidden", "Out of Stock"],
      default: "Active",
    },
    description: { type: String },
    images: [String], // Mảng chứa các link ảnh
  },
  {
    timestamps: true, // Tự động sinh ra createdAt và updatedAt
  },
);

module.exports = mongoose.model("Product", productSchema);
