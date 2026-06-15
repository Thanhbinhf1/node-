const Category = require("../models/Category");

const CategoryController = {
  getAllCategories: async (req, res) => {
    try {
      const categories = await Category.find().sort({ createdAt: -1 });
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ message: "Lỗi Server", error: error.message });
    }
  },

  getCategoryById: async (req, res) => {
    try {
      const category = await Category.findById(req.params.id);
      if (!category)
        return res.status(404).json({ message: "Không tìm thấy danh mục" });
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json({ message: "Lỗi Server", error: error.message });
    }
  },

  createCategory: async (req, res) => {
    try {
      // Nếu không nhập slug, tự động tạo từ name
      if (!req.body.slug) {
        req.body.slug = req.body.name
          .toLowerCase()
          .replace(/ /g, "-")
          .replace(/[^\w-]+/g, "");
      }

      // Xử lý lưu ảnh bìa (chỉ 1 ảnh)
      if (req.file) {
        req.body.image = "/images/" + req.file.filename;
      }

      const newCategory = await Category.create(req.body);
      res.status(201).json({ message: "Thêm thành công", data: newCategory });
    } catch (error) {
      res
        .status(400)
        .json({ message: "Lỗi thêm dữ liệu", error: error.message });
    }
  },

  updateCategory: async (req, res) => {
    try {
      if (req.file) {
        req.body.image = "/images/" + req.file.filename;
      }

      const updatedCategory = await Category.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
      );
      if (!updatedCategory)
        return res.status(404).json({ message: "Không tìm thấy danh mục" });
      res
        .status(200)
        .json({ message: "Sửa thành công", data: updatedCategory });
    } catch (error) {
      res.status(400).json({ message: "Lỗi cập nhật", error: error.message });
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const deletedCategory = await Category.findByIdAndDelete(req.params.id);
      if (!deletedCategory)
        return res.status(404).json({ message: "Không tìm thấy danh mục" });
      res.status(200).json({ message: "Xóa thành công" });
    } catch (error) {
      res.status(500).json({ message: "Lỗi Server", error: error.message });
    }
  },
};

module.exports = CategoryController;
