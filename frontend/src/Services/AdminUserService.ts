import { AdminUser } from "../Models/AdminUser.js";

export class AdminUserService {
  // Sếp nhớ đổi cổng 3000 cho khớp với Backend của sếp nhé
  private apiUrl = "http://localhost:3000/api/users";

  async getAllUsers(): Promise<AdminUser[]> {
    const res = await fetch(this.apiUrl);
    if (!res.ok) throw new Error("Lỗi khi tải danh sách người dùng");
    return res.json();
  }

  async createUser(formData: FormData): Promise<void> {
    const res = await fetch(this.apiUrl, {
      method: "POST",
      body: formData,
    });
    if (!res.ok) throw new Error("Lỗi khi tạo tài khoản");
  }

  async updateUser(id: string, formData: FormData): Promise<void> {
    const res = await fetch(`${this.apiUrl}/${id}`, {
      method: "PUT",
      body: formData,
    });
    if (!res.ok) throw new Error("Lỗi khi cập nhật tài khoản");
  }

  async deleteUser(id: string): Promise<void> {
    const res = await fetch(`${this.apiUrl}/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Lỗi khi xóa tài khoản");
  }
}
