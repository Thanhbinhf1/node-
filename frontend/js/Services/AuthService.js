export class AuthService {
    apiUrl = "http://localhost:3000/api/auth";
    async login(payload) {
        try {
            const response = await fetch(`${this.apiUrl}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: payload.email,
                    password: payload.password,
                }),
            });
            const data = await response.json();
            if (!response.ok) {
                return { success: false, msg: data.message || "Đăng nhập thất bại!" };
            }
            return {
                success: true,
                msg: data.message || "Đăng nhập thành công!",
                token: data.token,
                user: data.user,
            };
        }
        catch (error) {
            console.error("Lỗi gọi API Login:", error);
            return { success: false, msg: "Lỗi kết nối đến server!" };
        }
    }
    async register(payload) {
        try {
            const response = await fetch(`${this.apiUrl}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    fullName: payload.name,
                    email: payload.email,
                    phone: payload.phone,
                    password: payload.password,
                }),
            });
            const data = await response.json();
            if (!response.ok) {
                return { success: false, msg: data.message || "Đăng ký thất bại!" };
            }
            return {
                success: true,
                msg: "Tạo tài khoản thành công! Vui lòng đăng nhập.",
            };
        }
        catch (error) {
            console.error("Lỗi gọi API Register:", error);
            return { success: false, msg: "Lỗi kết nối đến server!" };
        }
    }
}
