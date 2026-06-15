const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/categoriesControllers");
const upload = require("../services/upload"); // Xài lại chung middleware Multer của bên Product

router.get("/", CategoryController.getAllCategories);
router.get("/:id", CategoryController.getCategoryById);

// Dùng upload.single('image') vì danh mục chỉ có 1 ảnh bìa
router.post("/", upload.single("image"), CategoryController.createCategory);
router.put("/:id", upload.single("image"), CategoryController.updateCategory);
router.delete("/:id", CategoryController.deleteCategory);

module.exports = router;
