const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const upload = require("../services/upload");

// Bóc tách đúng ông bảo vệ ra dùng (Xóa dòng const authen thừa kia đi)
const { verifyAdmin } = require("../services/authen");

// Xem thì ai cũng xem được (Không cần bảo vệ)
router.get("/", productController.getAllProducts);

// Thêm/Sửa/Xóa thì bắt buộc phải là Admin ĐÃ ĐĂNG NHẬP
router.post(
  "/",
  verifyAdmin, // Bước 1: Trình thẻ Admin
  upload.array("images", 5), // Bước 2: Thẻ chuẩn thì cho up ảnh
  productController.createProduct, // Bước 3: Lưu vào DB
);

router.put(
  "/:id",
  verifyAdmin,
  upload.array("images", 5),
  productController.updateProduct,
);

router.delete("/:id", verifyAdmin, productController.deleteProduct);

module.exports = router;
