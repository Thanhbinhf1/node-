export class AuthView {
  private tabLogin = document.getElementById("tab-login");
  private tabRegister = document.getElementById("tab-register");
  private viewLogin = document.getElementById("login-view");
  private viewRegister = document.getElementById("register-view");

  private btnLogin = document.getElementById(
    "btn-do-login",
  ) as HTMLButtonElement;
  private btnRegister = document.getElementById(
    "btn-do-register",
  ) as HTMLButtonElement;

  constructor() {
    this.initUIEvents();
  }

  // Xử lý hiệu ứng giao diện (Tabs & Mật khẩu)
  private initUIEvents() {
    // Chuyển Tab Đăng nhập
    this.tabLogin?.addEventListener("click", () => {
      this.tabRegister?.classList.remove("active");
      this.tabLogin?.classList.add("active");
      if (this.viewRegister && this.viewLogin) {
        this.viewRegister.style.display = "none";
        this.viewLogin.style.display = "block";
      }
    });

    // Chuyển Tab Đăng ký
    this.tabRegister?.addEventListener("click", () => {
      this.tabLogin?.classList.remove("active");
      this.tabRegister?.classList.add("active");
      if (this.viewLogin && this.viewRegister) {
        this.viewLogin.style.display = "none";
        this.viewRegister.style.display = "block";
      }
    });

    // Gắn sự kiện cho các icon con mắt (ẩn/hiện pass)
    // Chú ý: Ở file HTML phải bỏ hàm onclick inline cũ đi, thay bằng class "icon-eye"
    const eyeIcons = document.querySelectorAll(".icon-eye");
    eyeIcons.forEach((icon) => {
      icon.addEventListener("click", (e) => {
        const target = e.currentTarget as HTMLElement;
        const input = target.previousElementSibling as HTMLInputElement;
        if (input && input.type === "password") {
          input.type = "text";
          target.classList.replace("fa-eye-slash", "fa-eye");
        } else if (input) {
          input.type = "password";
          target.classList.replace("fa-eye", "fa-eye-slash");
        }
      });
    });
  }

  // Cung cấp dữ liệu form Login cho Controller
  bindLoginEvent(handler: (data: any) => void) {
    this.btnLogin?.addEventListener("click", () => {
      const email = (
        document.getElementById("login-email") as HTMLInputElement
      )?.value.trim();
      const password = (document.getElementById("login-pw") as HTMLInputElement)
        ?.value;
      handler({ email, password });
    });
  }

  // Cung cấp dữ liệu form Register cho Controller
  bindRegisterEvent(handler: (data: any) => void) {
    this.btnRegister?.addEventListener("click", () => {
      const name = (
        document.getElementById("reg-name") as HTMLInputElement
      )?.value.trim();
      const email = (
        document.getElementById("reg-email") as HTMLInputElement
      )?.value.trim();
      const phone = (
        document.getElementById("reg-phone") as HTMLInputElement
      )?.value.trim();
      const password = (document.getElementById("reg-pw") as HTMLInputElement)
        ?.value;
      const pwConfirm = (
        document.getElementById("reg-pw-confirm") as HTMLInputElement
      )?.value;
      handler({ name, email, phone, password, pwConfirm });
    });
  }

  // Trạng thái Loading
  showLoginLoading(isLoading: boolean) {
    if (!this.btnLogin) return;
    this.btnLogin.innerText = isLoading ? "ĐANG ĐĂNG NHẬP..." : "ĐĂNG NHẬP";
    this.btnLogin.disabled = isLoading;
  }

  showRegisterLoading(isLoading: boolean) {
    if (!this.btnRegister) return;
    this.btnRegister.innerText = isLoading ? "ĐANG XỬ LÝ..." : "TẠO TÀI KHOẢN";
    this.btnRegister.disabled = isLoading;
  }

  switchToLoginTab() {
    this.tabLogin?.click();
  }
}
