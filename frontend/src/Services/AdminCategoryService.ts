import { AdminCategory } from "../Models/AdminCategory.js";

export class AdminCategoryService {
  private apiUrl = "http://localhost:3000/api/categories";

  async getAllCategories(): Promise<AdminCategory[]> {
    try {
      const response = await fetch(this.apiUrl);
      if (!response.ok) return [];

      const data = await response.json();
      return data.map((item: any) => ({
        id: item._id,
        name: item.name,
        slug: item.slug || item.name.toLowerCase().replace(/ /g, "-"),
        productCount: item.productCount || 0,
        status: item.status || "Hoạt động",
      }));
    } catch (error) {
      return [];
    }
  }

  // Bổ sung hàm lấy 1 danh mục (Sửa lỗi TS2339)
  async getCategoryById(id: string): Promise<any> {
    try {
      const response = await fetch(`${this.apiUrl}/${id}`);
      if (!response.ok) return null;
      return await response.json();
    } catch (error) {
      console.error("Lỗi lấy chi tiết danh mục:", error);
      return null;
    }
  }

  // Đổi tên thành addCategory và trả về boolean (Sửa lỗi TS2339, TS2322, TS1345)
  async addCategory(formData: FormData): Promise<boolean> {
    try {
      const plainData = Object.fromEntries(formData.entries());
      const response = await fetch(this.apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(plainData),
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  }

  // Trả về boolean thay vì void
  async updateCategory(id: string, formData: FormData): Promise<boolean> {
    try {
      const plainData = Object.fromEntries(formData.entries());
      const response = await fetch(`${this.apiUrl}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(plainData),
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  }

  // Trả về boolean thay vì void
  async deleteCategory(id: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.apiUrl}/${id}`, {
        method: "DELETE",
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  }
}
