const Review = require("../models/Review");

const reviewController = {
  // Lấy tất cả đánh giá
  getAllReviews: async (req, res) => {
    try {
      const reviews = await Review.find().sort({ createdAt: -1 });
      res.status(200).json(reviews);
    } catch (error) {
      res.status(500).json({ message: "Lỗi Server", error: error.message });
    }
  },

  // Đổi trạng thái đánh giá (Duyệt / Ẩn)
  updateReviewStatus: async (req, res) => {
    try {
      const updatedReview = await Review.findByIdAndUpdate(
        req.params.id,
        { status: req.body.status },
        { new: true },
      );
      if (!updatedReview)
        return res.status(404).json({ message: "Không tìm thấy đánh giá" });
      res
        .status(200)
        .json({ message: "Cập nhật thành công", data: updatedReview });
    } catch (error) {
      res.status(400).json({ message: "Lỗi cập nhật", error: error.message });
    }
  },

  // Xóa đánh giá
  deleteReview: async (req, res) => {
    try {
      const deletedReview = await Review.findByIdAndDelete(req.params.id);
      if (!deletedReview)
        return res.status(404).json({ message: "Không tìm thấy đánh giá" });
      res.status(200).json({ message: "Xóa thành công" });
    } catch (error) {
      res.status(500).json({ message: "Lỗi Server", error: error.message });
    }
  },

  // (Dành cho Client: Khách hàng viết đánh giá mới)
  createReview: async (req, res) => {
    try {
      const newReview = await Review.create(req.body);
      res
        .status(201)
        .json({ message: "Cảm ơn bạn đã đánh giá", data: newReview });
    } catch (error) {
      res
        .status(400)
        .json({ message: "Lỗi tạo đánh giá", error: error.message });
    }
  },
};

module.exports = reviewController;
