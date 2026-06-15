const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    discountType: {
      type: String,
      enum: ["percentage", "fixed"],
      required: true,
    },
    discountValue: { type: Number, required: true, min: 0 },
    minOrderAmount: { type: Number, default: 0 },
    usageLimit: { type: Number, default: 9999 },
    usageCount: { type: Number, default: 0 },
    expiryDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ["Active", "Hidden", "Expired"],
      default: "Active",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Coupon", couponSchema);
