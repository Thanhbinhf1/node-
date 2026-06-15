import { AdminProduct } from "../Models/AdminProduct.js";

export class AdminProductService {
  // Trỏ đúng vào cổng 3000 của Node.js sếp đang chạy
  private API_URL = "http://localhost:3000/api/products";

  async getAllProducts(): Promise<AdminProduct[]> {
    try {
      const response = await fetch(this.API_URL);
      const data = await response.json();

      return data.map((item: any) => ({
        id: item._id,
        sku: item.sku || "",
        name: item.name || "Sản phẩm chưa có tên",
        category: item.category || "Chưa phân loại",
        // Chốt chặn thần thánh: Nếu item.price bị undefined thì gán bằng 0
        price: item.price || 0,
        stock: item.stock || 0,
        status:
          item.status === "Active"
            ? "Đang bán"
            : item.status === "Hidden"
              ? "Đã ẩn"
              : "Hết hàng",
        images: item.images || [],
      }));
    } catch (error) {
      console.error("Lỗi lấy dữ liệu sản phẩm:", error);
      return [];
    }
  }

  async deleteProduct(id: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.API_URL}/${id}`, {
        method: "DELETE",
      });
      return response.ok;
    } catch (error) {
      console.error("Lỗi xóa từ Backend:", error);
      return false;
    }
  }

  async addProduct(formData: FormData): Promise<boolean> {
    try {
      const response = await fetch(this.API_URL, {
        method: "POST",
        // KHÔNG ĐƯỢC set Content-Type là application/json nữa
        // Trình duyệt sẽ tự động set Content-Type là multipart/form-data
        body: formData,
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  }
  // (Giữ nguyên các hàm getAllProducts, addProduct, deleteProduct cũ của sếp ở đây)

  // Lấy 1 sản phẩm theo ID để bơm vào Form
  async getProductById(id: string): Promise<any> {
    try {
      const response = await fetch(`${this.API_URL}/${id}`);
      if (!response.ok) return null;
      return await response.json();
    } catch (error) {
      console.error("Lỗi lấy chi tiết sản phẩm:", error);
      return null;
    }
  }

  // Cập nhật sản phẩm
  async updateProduct(id: string, data: any): Promise<boolean> {
    try {
      const response = await fetch(`${this.API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return response.ok;
    } catch (error) {
      console.error("Lỗi cập nhật sản phẩm:", error);
      return false;
    }
  }
}
