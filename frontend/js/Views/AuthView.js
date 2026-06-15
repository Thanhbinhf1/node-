export class AuthView {
    tabLogin = document.getElementById("tab-login");
    tabRegister = document.getElementById("tab-register");
    viewLogin = document.getElementById("login-view");
    viewRegister = document.getElementById("register-view");
    btnLogin = document.getElementById("btn-do-login");
    btnRegister = document.getElementById("btn-do-register");
    constructor() {
        this.initUIEvents();
    }
    initUIEvents() {
        this.tabLogin?.addEventListener("click", () => {
            this.tabRegister?.classList.remove("active");
            this.tabLogin?.classList.add("active");
            if (this.viewRegister && this.viewLogin) {
                this.viewRegister.style.display = "none";
                this.viewLogin.style.display = "block";
            }
        });
        this.tabRegister?.addEventListener("click", () => {
            this.tabLogin?.classList.remove("active");
            this.tabRegister?.classList.add("active");
            if (this.viewLogin && this.viewRegister) {
                this.viewLogin.style.display = "none";
                this.viewRegister.style.display = "block";
            }
        });
        const eyeIcons = document.querySelectorAll(".icon-eye");
        eyeIcons.forEach((icon) => {
            icon.addEventListener("click", (e) => {
                const target = e.currentTarget;
                const input = target.previousElementSibling;
                if (input && input.type === "password") {
                    input.type = "text";
                    target.classList.replace("fa-eye-slash", "fa-eye");
                }
                else if (input) {
                    input.type = "password";
                    target.classList.replace("fa-eye", "fa-eye-slash");
                }
            });
        });
    }
    bindLoginEvent(handler) {
        this.btnLogin?.addEventListener("click", () => {
            const email = document.getElementById("login-email")?.value.trim();
            const password = document.getElementById("login-pw")
                ?.value;
            handler({ email, password });
        });
    }
    bindRegisterEvent(handler) {
        this.btnRegister?.addEventListener("click", () => {
            const name = document.getElementById("reg-name")?.value.trim();
            const email = document.getElementById("reg-email")?.value.trim();
            const phone = document.getElementById("reg-phone")?.value.trim();
            const password = document.getElementById("reg-pw")
                ?.value;
            const pwConfirm = document.getElementById("reg-pw-confirm")?.value;
            handler({ name, email, phone, password, pwConfirm });
        });
    }
    showLoginLoading(isLoading) {
        if (!this.btnLogin)
            return;
        this.btnLogin.innerText = isLoading ? "ĐANG ĐĂNG NHẬP..." : "ĐĂNG NHẬP";
        this.btnLogin.disabled = isLoading;
    }
    showRegisterLoading(isLoading) {
        if (!this.btnRegister)
            return;
        this.btnRegister.innerText = isLoading ? "ĐANG XỬ LÝ..." : "TẠO TÀI KHOẢN";
        this.btnRegister.disabled = isLoading;
    }
    switchToLoginTab() {
        this.tabLogin?.click();
    }
}
