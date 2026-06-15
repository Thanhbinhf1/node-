const authService = require("../services/authen");

const authController = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Gọi qua Service để xử lý logic
      const result = await authService.loginUser(email, password);

      // Nếu Service chạy trót lọt thì trả về JSON thành công
      res.status(200).json({
        message: "Đăng nhập thành công!",
        user: result.user,
        token: result.token,
      });
    } catch (error) {
      // Nếu Service quăng lỗi (Sai pass, khóa nick...) thì bắt ở đây
      res.status(400).json({ message: error.message });
    }
  },

  register: async (req, res) => {
    try {
      // Đẩy nguyên cục data qua Service để mã hóa và lưu
      const newUser = await authService.registerUser(req.body);
      res
        .status(201)
        .json({ message: "Tạo tài khoản thành công!", data: newUser });
    } catch (error) {
      if (error.code === 11000)
        return res.status(400).json({ message: "Email này đã tồn tại!" });
      res
        .status(400)
        .json({ message: "Lỗi tạo tài khoản", error: error.message });
    }
  },
};

module.exports = authController;
