const Order = require("../models/Order");
const Product = require("../models/Product"); // Bắt buộc gọi thêm Product để xử lý tồn kho

const orderController = {
  getAllOrders: async (req, res) => {
    try {
      const orders = await Order.find()
        .populate("user", "fullName email") // Lấy thông tin cơ bản của user nếu có
        .sort({ createdAt: -1 });
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ message: "Lỗi Server", error: error.message });
    }
  },

  getOrderById: async (req, res) => {
    try {
      const order = await Order.findById(req.params.id)
        .populate("user", "fullName email phone")
        .populate("items.product", "sku name image"); // Lấy thêm ảnh và mã sku để hiển thị chi tiết

      if (!order)
        return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ message: "Lỗi Server", error: error.message });
    }
  },

  createOrder: async (req, res) => {
    try {
      const { items } = req.body;

      // 1. Kiểm tra tồn kho trước khi cho phép tạo đơn
      if (items && items.length > 0) {
        for (let item of items) {
          const product = await Product.findById(item.product);
          if (!product) {
            return res.status(400).json({ message: `Sản phẩm không tồn tại.` });
          }
          if (product.stock < item.qty) {
            return res.status(400).json({
              message: `Sản phẩm ${product.name} không đủ hàng (Kho chỉ còn ${product.stock}).`,
            });
          }
        }
      }

      // 2. Tạo ID đơn hàng
      if (!req.body.orderId) {
        req.body.orderId = "ORD-" + Date.now().toString().slice(-6);
      }

      // 3. Tạo đơn hàng mới
      const newOrder = await Order.create(req.body);

      // 4. Trừ đi số lượng trong kho sau khi tạo đơn thành công
      if (items && items.length > 0) {
        for (let item of items) {
          await Product.findByIdAndUpdate(item.product, {
            $inc: { stock: -item.qty }, // $inc âm (-) nghĩa là trừ đi
          });
        }
      }

      res.status(201).json({ message: "Tạo đơn thành công", data: newOrder });
    } catch (error) {
      res.status(400).json({ message: "Lỗi tạo đơn", error: error.message });
    }
  },

  updateOrderStatus: async (req, res) => {
    try {
      const { status } = req.body;
      const order = await Order.findById(req.params.id);

      if (!order) {
        return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
      }

      // Logic cộng lại kho: Nếu Admin chuyển trạng thái thành "Đã hủy"
      // (và trước đó đơn chưa bị hủy) thì phải trả lại số lượng cho kho hàng
      if (status === "Đã hủy" && order.status !== "Đã hủy") {
        for (let item of order.items) {
          await Product.findByIdAndUpdate(item.product, {
            $inc: { stock: item.qty }, // $inc dương (+) nghĩa là cộng lại vào kho
          });
        }
      }

      // Cập nhật trạng thái
      order.status = status;
      const updatedOrder = await order.save();

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
