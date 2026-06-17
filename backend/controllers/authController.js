const authService = require("../services/authen");

const authController = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const result = await authService.loginUser(email, password);

      res.status(200).json({
        message: "Đăng nhập thành công!",
        user: result.user,
        token: result.token,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  register: async (req, res) => {
    try {
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
