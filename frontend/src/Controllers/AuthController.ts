import { AuthService } from "../Services/AuthService.js";
import { AuthView } from "../Views/AuthView.js";

export class AuthController {
  constructor(
    private service: AuthService,
    private view: AuthView,
  ) {
    // Lắng nghe sự kiện từ View
    this.view.bindLoginEvent(this.handleLogin.bind(this));
    this.view.bindRegisterEvent(this.handleRegister.bind(this));
  }

  // Xử lý Đăng nhập
  async handleLogin(data: any) {
    if (!data.email || !data.password) {
      alert("Vui lòng nhập đầy đủ Email và Mật khẩu!");
      return;
    }

    this.view.showLoginLoading(true);
    const response = await this.service.login({
      email: data.email,
      password: data.password,
    });
    this.view.showLoginLoading(false);

    if (response.success) {
      alert(response.msg);
      // Lưu token và userId vào LocalStorage
      localStorage.setItem("fstyle_token", response.token || "");
      localStorage.setItem("userId", response.user?._id || "");

      // LƯU THÊM QUYỀN VÀ BẺ LÁI CHUYỂN TRANG
      const userRole = response.user?.role || "User";
      localStorage.setItem("userRole", userRole);

      // Nếu là Admin thì mở cửa vào Dashboard, Khách thì ra trang chủ
      if (userRole === "Admin" || userRole === "SuperAdmin") {
        window.location.href = "../admin/admin.html";
      } else {
        window.location.href = "index.html";
      }
    } else {
      alert(response.msg);
    }
  }

  // Xử lý Đăng ký
  async handleRegister(data: any) {
    if (!data.name || !data.email || !data.phone || !data.password) {
      alert("Vui lòng điền đầy đủ thông tin bắt buộc!");
      return;
    }

    if (data.password !== data.pwConfirm) {
      alert("Mật khẩu xác nhận không khớp!");
      return;
    }

    this.view.showRegisterLoading(true);
    const response = await this.service.register({
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
    });
    this.view.showRegisterLoading(false);

    if (response.success) {
      alert(response.msg);
      this.view.switchToLoginTab(); // Thành công thì đẩy qua tab đăng nhập
    } else {
      alert(response.msg);
    }
  }
}
