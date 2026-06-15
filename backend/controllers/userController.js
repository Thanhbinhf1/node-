const User = require("../models/User");

const userController = {
  getAllUsers: async (req, res) => {
    try {
      // Ẩn field password khi trả về cho Frontend để bảo mật
      const users = await User.find()
        .select("-password")
        .sort({ createdAt: -1 });
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: "Lỗi Server", error: error.message });
    }
  },

  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id).select("-password");
      if (!user)
        return res.status(404).json({ message: "Không tìm thấy người dùng" });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Lỗi Server", error: error.message });
    }
  },

  // Dùng để Admin tạo tài khoản nhân viên mới
  createUser: async (req, res) => {
    try {
      const newUser = await User.create(req.body);
      res
        .status(201)
        .json({ message: "Tạo tài khoản thành công", data: newUser });
    } catch (error) {
      if (error.code === 11000)
        return res.status(400).json({ message: "Email này đã được sử dụng!" });
      res
        .status(400)
        .json({ message: "Lỗi tạo tài khoản", error: error.message });
    }
  },

  updateUser: async (req, res) => {
    try {
      // Nếu không gửi password mới thì xóa field password khỏi req.body để tránh ghi đè rỗng
      if (!req.body.password) {
        delete req.body.password;
      }

      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
      ).select("-password");
      if (!updatedUser)
        return res.status(404).json({ message: "Không tìm thấy người dùng" });
      res
        .status(200)
        .json({ message: "Cập nhật thành công", data: updatedUser });
    } catch (error) {
      res.status(400).json({ message: "Lỗi cập nhật", error: error.message });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      if (!deletedUser)
        return res.status(404).json({ message: "Không tìm thấy người dùng" });
      res.status(200).json({ message: "Xóa tài khoản thành công" });
    } catch (error) {
      res.status(500).json({ message: "Lỗi Server", error: error.message });
    }
  },
};

module.exports = userController;
