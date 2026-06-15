// backend/middlewares/upload.js
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Nhớ tạo sẵn thư mục public/images trong backend nhé sếp!
    cb(null, "public/images/");
  },
  filename: function (req, file, cb) {
    // Đổi tên file cho khỏi bị trùng
    cb(
      null,
      Date.now() +
        "-" +
        Math.round(Math.random() * 1e9) +
        path.extname(file.originalname),
    );
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
