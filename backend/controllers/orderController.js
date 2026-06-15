const Order = require("../models/Order");

const orderController = {
  getAllOrders: async (req, res) => {
    try {
      const orders = await Order.find().sort({ createdAt: -1 });
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ message: "Lỗi Server", error: error.message });
    }
  },

  getOrderById: async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
      if (!order)
        return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ message: "Lỗi Server", error: error.message });
    }
  },

  // Hàm này tạm để Admin tự tạo đơn test, sau này Client xài
  createOrder: async (req, res) => {
    try {
      if (!req.body.orderId) {
        req.body.orderId = "ORD-" + Date.now().toString().slice(-6);
      }
      const newOrder = await Order.create(req.body);
      res.status(201).json({ message: "Tạo đơn thành công", data: newOrder });
    } catch (error) {
      res.status(400).json({ message: "Lỗi tạo đơn", error: error.message });
    }
  },

  // Dùng để Admin đổi trạng thái "Đang giao", "Hoàn thành"...
  updateOrderStatus: async (req, res) => {
    try {
      const updatedOrder = await Order.findByIdAndUpdate(
        req.params.id,
        { status: req.body.status },
        { new: true },
      );
      if (!updatedOrder)
        return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
      res
        .status(200)
        .json({ message: "Cập nhật thành công", data: updatedOrder });
    } catch (error) {
      res.status(400).json({ message: "Lỗi cập nhật", error: error.message });
    }
  },

  deleteOrder: async (req, res) => {
    try {
      const deletedOrder = await Order.findByIdAndDelete(req.params.id);
      if (!deletedOrder)
        return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
      res.status(200).json({ message: "Xóa thành công" });
    } catch (error) {
      res.status(500).json({ message: "Lỗi Server", error: error.message });
    }
  },
};

module.exports = orderController;
