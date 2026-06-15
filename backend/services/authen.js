const jwt = require("jsonwebtoken");

// 1. Các hàm login, register sếp đã viết ở đây...

// 2. Thêm hàm bảo vệ này vào:
const verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const accessToken = token.split(" ")[1];
    jwt.verify(accessToken, "FSTYLE_SECRET_KEY_2026", (err, user) => {
      if (err) return res.status(403).json({ message: "Token không hợp lệ!" });

      if (user.role === "Admin") {
        req.user = user;
        next(); // Là Admin thì cho đi tiếp
      } else {
        res.status(403).json({ message: "Bạn không có quyền Admin!" });
      }
    });
  } else {
    res.status(401).json({ message: "Chưa xác thực (Thiếu Token)!" });
  }
};

// 3. KIỂM TRA DÒNG CUỐI CÙNG CỦA FILE NÀY:
// Bắt buộc phải gom chung vào và export ra như vầy:
module.exports = {
  // loginUser,   <-- (Các hàm sếp đã có)
  // registerUser, <-- (Các hàm sếp đã có)
  verifyAdmin, // Quan trọng nhất là phải lôi ông này ra
};
