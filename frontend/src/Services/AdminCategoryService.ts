import { AdminCategory } from "../Models/AdminCategory.js";

export class AdminCategoryService {
  private API_URL = "http://localhost:3000/api/categories";

  async getAllCategories(): Promise<AdminCategory[]> {
    try {
      const response = await fetch(this.API_URL);
      const data = await response.json();
      return data.map((item: any) => ({
        id: item._id,
        name: item.name,
        slug: item.slug,
        parent: item.parent || "None",
        productsCount: 0, // Sau này rảnh mình truy vấn nối với Product để lấy số thực tế sau
        status: item.status || "Active",
        image: item.image
          ? `http://localhost:3000${item.image}`
          : "https://via.placeholder.com/100", // Ảnh mặc định nếu chưa up
      }));
    } catch (error) {
      return [];
    }
  }

  async getCategoryById(id: string): Promise<any> {
    try {
      const response = await fetch(`${this.API_URL}/${id}`);
      return response.ok ? await response.json() : null;
    } catch (error) {
      return null;
    }
  }

  async addCategory(formData: FormData): Promise<boolean> {
    try {
      const response = await fetch(this.API_URL, {
        method: "POST",
        body: formData,
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  }

  async updateCategory(id: string, formData: FormData): Promise<boolean> {
    try {
      const response = await fetch(`${this.API_URL}/${id}`, {
        method: "PUT",
        body: formData,
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  }

  async deleteCategory(id: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.API_URL}/${id}`, {
        method: "DELETE",
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  }
}
