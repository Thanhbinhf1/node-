const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    userAvatar: { type: String, default: "https://via.placeholder.com/100" },
    productName: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Hidden"],
      default: "Pending",
    },
  },
  { timestamps: true },
);

// Sếp XÓA TOÀN BỘ đoạn userSchema.pre("save", ...) ở khu vực này đi nhé, không cần tới nó đâu!

// Chỉ chốt sổ xuất file ra là xong:
module.exports = mongoose.model("Review", reviewSchema);
