const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    avatar: { type: String, default: "https://via.placeholder.com/100" },
    role: { type: String, enum: ["Admin", "User"], default: "User" },
    status: { type: String, enum: ["Active", "Banned"], default: "Active" },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
