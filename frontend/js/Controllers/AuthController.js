export class AuthController {
    service;
    view;
    constructor(service, view) {
        this.service = service;
        this.view = view;
        this.view.bindLoginEvent(this.handleLogin.bind(this));
        this.view.bindRegisterEvent(this.handleRegister.bind(this));
    }
    async handleLogin(data) {
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
            localStorage.setItem("fstyle_token", response.token || "");
            localStorage.setItem("userId", response.user?._id || "");
            const userRole = response.user?.role || "User";
            localStorage.setItem("userRole", userRole);
            if (userRole === "Admin" || userRole === "SuperAdmin") {
                window.location.href = "../admin/admin.html";
            }
            else {
                window.location.href = "index.html";
            }
        }
        else {
            alert(response.msg);
        }
    }
    async handleRegister(data) {
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
            this.view.switchToLoginTab();
        }
        else {
            alert(response.msg);
        }
    }
}
