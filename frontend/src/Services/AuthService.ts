import { UserPayload, AuthResponse } from "../Models/User.js";

export class AuthService {
  // Trỏ đúng vào URL Backend của sếp
  private apiUrl = "http://localhost:3000/api/auth";

  // ================= GỌI API ĐĂNG NHẬP =================
  async login(payload: UserPayload): Promise<AuthResponse> {
    try {
      const response = await fetch(`${this.apiUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Gói dữ liệu thành chuỗi JSON để gửi đi
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Bắt lỗi từ backend (như sai pass, không tìm thấy user)
        return { success: false, msg: data.message || "Đăng nhập thất bại!" };
      }

      return {
        success: true,
        msg: data.message || "Đăng nhập thành công!",
        token: data.token,
      };
    } catch (error) {
      console.error("Lỗi gọi API Login:", error);
      return { success: false, msg: "Lỗi kết nối đến server!" };
    }
  }

  // ================= GỌI API ĐĂNG KÝ =================
  async register(payload: UserPayload): Promise<AuthResponse> {
    try {
      const response = await fetch(`${this.apiUrl}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Gửi toàn bộ data form xuống backend
        body: JSON.stringify({
          fullName: payload.name, // Ở frontend sếp gọi là name, map sang fullName cho an toàn
          email: payload.email,
          phone: payload.phone,
          password: payload.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Nếu Backend báo lỗi (ví dụ trùng Email)
        return { success: false, msg: data.message || "Đăng ký thất bại!" };
      }

      return {
        success: true,
        msg: "Tạo tài khoản thành công! Vui lòng đăng nhập.",
      };
    } catch (error) {
      console.error("Lỗi gọi API Register:", error);
      return { success: false, msg: "Lỗi kết nối đến server!" };
    }
  }
}
