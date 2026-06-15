const Coupon = require("../models/Coupon");

const couponController = {
  getAllCoupons: async (req, res) => {
    try {
      const coupons = await Coupon.find().sort({ createdAt: -1 });
      res.status(200).json(coupons);
    } catch (error) {
      res.status(500).json({ message: "Lỗi Server", error: error.message });
    }
  },

  getCouponById: async (req, res) => {
    try {
      const coupon = await Coupon.findById(req.params.id);
      if (!coupon)
        return res.status(404).json({ message: "Không tìm thấy mã" });
      res.status(200).json(coupon);
    } catch (error) {
      res.status(500).json({ message: "Lỗi Server", error: error.message });
    }
  },

  createCoupon: async (req, res) => {
    try {
      const newCoupon = await Coupon.create(req.body);
      res.status(201).json({ message: "Tạo mã thành công", data: newCoupon });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({ message: "Mã giảm giá này đã tồn tại!" });
      }
      res.status(400).json({ message: "Lỗi tạo mã", error: error.message });
    }
  },

  updateCoupon: async (req, res) => {
    try {
      const updatedCoupon = await Coupon.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
      );
      if (!updatedCoupon)
        return res.status(404).json({ message: "Không tìm thấy mã" });
      res
        .status(200)
        .json({ message: "Cập nhật thành công", data: updatedCoupon });
    } catch (error) {
      res.status(400).json({ message: "Lỗi cập nhật", error: error.message });
    }
  },

  deleteCoupon: async (req, res) => {
    try {
      const deletedCoupon = await Coupon.findByIdAndDelete(req.params.id);
      if (!deletedCoupon)
        return res.status(404).json({ message: "Không tìm thấy mã" });
      res.status(200).json({ message: "Xóa thành công" });
    } catch (error) {
      res.status(500).json({ message: "Lỗi Server", error: error.message });
    }
  },
};

module.exports = couponController;
