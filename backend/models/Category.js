const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
    parent: { type: String, default: "none" }, // 'none' nghĩa là danh mục gốc
    status: { type: String, enum: ["Active", "Hidden"], default: "Active" },
    image: { type: String }, // Chỉ lưu 1 link ảnh
  },
  { timestamps: true },
);

module.exports = mongoose.model("Category", categorySchema);
