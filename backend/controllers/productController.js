const Product = require("../models/Product");

const productController = {
  // 1. Lấy tất cả sản phẩm
  getAllProducts: async (req, res) => {
    try {
      const products = await Product.find().sort({ createdAt: -1 });
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: "Lỗi Server", error: error.message });
    }
  },

  // 2. Lấy 1 sản phẩm theo ID
  getProductById: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product)
        return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: "Lỗi Server", error: error.message });
    }
  },

  // 3. Thêm mới sản phẩm có kèm ảnh
  createProduct: async (req, res) => {
    try {
      if (!req.body.sku) {
        req.body.sku = "FS-" + Date.now().toString().slice(-6);
      }

      // Nếu Frontend có truyền file ảnh lên thì lưu mảng đường dẫn vào DB
      if (req.files && req.files.length > 0) {
        req.body.images = req.files.map((file) => "/images/" + file.filename);
      }

      const newProduct = await Product.create(req.body);
      res.status(201).json({ message: "Thêm thành công", data: newProduct });
    } catch (error) {
      res
        .status(400)
        .json({ message: "Lỗi thêm dữ liệu", error: error.message });
    }
  },

  // 4. Sửa sản phẩm có kèm ảnh mới thông minh
  updateProduct: async (req, res) => {
    try {
      // Nếu sếp chọn ảnh mới khi sửa, cập nhật lại danh sách ảnh mới
      if (req.files && req.files.length > 0) {
        req.body.images = req.files.map((file) => "/images/" + file.filename);
      }

      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }, // Trả về dữ liệu mới nhất sau khi sửa
      );

      if (!updatedProduct)
        return res
          .status(404)
          .json({ message: "Không tìm thấy sản phẩm để sửa" });
      res.status(200).json({ message: "Sửa thành công", data: updatedProduct });
    } catch (error) {
      res.status(400).json({ message: "Lỗi cập nhật", error: error.message });
    }
  },

  // 5. Xóa sản phẩm
  deleteProduct: async (req, res) => {
    try {
      const deletedProduct = await Product.findByIdAndDelete(req.params.id);
      if (!deletedProduct)
        return res
          .status(404)
          .json({ message: "Không tìm thấy sản phẩm để xóa" });
      res.status(200).json({ message: "Xóa thành công" });
    } catch (error) {
      res.status(500).json({ message: "Lỗi Server", error: error.message });
    }
  },
};
module.exports = productController;
