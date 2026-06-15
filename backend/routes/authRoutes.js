const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/login", authController.login);
router.post("/register", authController.register); // API để sếp tạo Admin đầu tiên

module.exports = router;
