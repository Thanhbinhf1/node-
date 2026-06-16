export class AdminUserService {
    apiUrl = "http://localhost:3000/api/users";
    async getAllUsers() {
        const res = await fetch(this.apiUrl);
        if (!res.ok)
            throw new Error("Lỗi khi tải danh sách người dùng");
        return res.json();
    }
    async createUser(formData) {
        const plainFormData = Object.fromEntries(formData.entries());
        const res = await fetch(this.apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(plainFormData),
        });
        if (!res.ok)
            throw new Error("Lỗi khi tạo tài khoản");
    }
    async updateUser(id, formData) {
        const plainFormData = Object.fromEntries(formData.entries());
        const res = await fetch(`${this.apiUrl}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(plainFormData),
        });
        if (!res.ok)
            throw new Error("Lỗi khi cập nhật tài khoản");
    }
    async deleteUser(id) {
        const res = await fetch(`${this.apiUrl}/${id}`, {
            method: "DELETE",
        });
        if (!res.ok)
            throw new Error("Lỗi khi xóa tài khoản");
    }
}
