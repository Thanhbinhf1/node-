import { UserPayload, AuthResponse } from "../Models/User.js";

export class AuthService {
  // Giả lập API Đăng nhập
  async login(payload: UserPayload): Promise<AuthResponse> {
    console.log("Đang gọi API Login với:", payload.email);
    return new Promise((resolve) => {
      setTimeout(() => {
        if (
          payload.email === "phat.fpt@gmail.com" &&
          payload.password === "123456"
        ) {
          resolve({
            success: true,
            msg: "Đăng nhập thành công!",
            token: "fake-jwt-token",
          });
        } else {
          resolve({
            success: false,
            msg: "Email hoặc mật khẩu không chính xác!",
          });
        }
      }, 1000);
    });
  }

  // Giả lập API Đăng ký
  async register(payload: UserPayload): Promise<AuthResponse> {
    console.log("Đang gọi API Register với:", payload);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          msg: "Tạo tài khoản thành công! Vui lòng đăng nhập.",
        });
      }, 1000);
    });
  }
}
