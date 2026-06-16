const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    sku: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: [true, "Vui lòng nhập tên sản phẩm"],
      trim: true,
    },
    // Sửa lại thành ObjectId liên kết với bảng Category
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
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
    images: [String],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Product", productSchema);
