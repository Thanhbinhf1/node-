const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const authService = {
  // ================= 1. HÀM ĐĂNG KÝ =================
  registerUser: async (data) => {
    // Kiểm tra xem email đã tồn tại chưa
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      throw new Error("Email này đã được sử dụng!");
    }

    // Mã hóa mật khẩu (Tuyệt đối không lưu pass dạng chữ thường)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    // Tạo user mới
    const newUser = new User({
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      password: hashedPassword, // Lưu pass đã mã hóa
      role: "User", // Mặc định là khách hàng
      status: "Active",
    });

    await newUser.save();
    return newUser;
  },

  // ================= 2. HÀM ĐĂNG NHẬP =================
  loginUser: async (email, password) => {
    // Tìm user theo email
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Email hoặc mật khẩu không chính xác!");
    }

    // So sánh mật khẩu khách nhập với pass trong Database
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new Error("Email hoặc mật khẩu không chính xác!");
    }

    // Kiểm tra xem nick có bị Admin khóa không
    if (user.status === "Banned") {
      throw new Error("Tài khoản của bạn đã bị khóa!");
    }

    // Tạo vé thông hành (Token)
    const token = jwt.sign(
      { id: user._id, role: user.role, fullName: user.fullName },
      "FSTYLE_SECRET_KEY_2026",
      { expiresIn: "1d" }, // Token sống được 1 ngày
    );

    return { user, token };
  },

  // ================= 3. BẢO VỆ ROUTE ADMIN =================
  verifyAdmin: (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
      const accessToken = token.split(" ")[1];
      jwt.verify(accessToken, "FSTYLE_SECRET_KEY_2026", (err, user) => {
        if (err)
          return res
            .status(403)
            .json({ message: "Token không hợp lệ hoặc đã hết hạn!" });

        // Chặn cửa nếu không phải Admin
        if (user.role === "Admin" || user.role === "SuperAdmin") {
          req.user = user;
          next(); // Cho phép đi tiếp
        } else {
          res
            .status(403)
            .json({ message: "Bạn không có quyền truy cập khu vực này!" });
        }
      });
    } else {
      res.status(401).json({ message: "Chưa xác thực (Thiếu Token)!" });
    }
  },
};

module.exports = authService;
