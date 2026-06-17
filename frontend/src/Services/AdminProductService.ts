import { AdminProduct } from "../Models/AdminProduct.js";

export class AdminProductService {
  // Trỏ đúng vào cổng 3000 của Node.js sếp đang chạy
  private API_URL = "http://localhost:3000/api/products";

  // ================= 1. LẤY TẤT CẢ SẢN PHẨM =================
  async getAllProducts(): Promise<AdminProduct[]> {
    try {
      const response = await fetch(this.API_URL);
      const data = await response.json();

      return data.map((item: any) => ({
        id: item._id,
        sku: item.sku || "",
        name: item.name || "Sản phẩm chưa có tên",
        category: item.category || "Chưa phân loại",
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

  // ================= 2. LẤY 1 SẢN PHẨM THEO ID =================
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

  // ================= 3. THÊM SẢN PHẨM MỚI =================
  async addProduct(formData: FormData): Promise<boolean> {
    try {
      const token = localStorage.getItem("fstyle_token"); // Lấy vé Admin trong bóp ra
      const response = await fetch(this.API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Xuất trình vé cho ông verifyAdmin
        },
        body: formData, // Gửi nguyên FormData chứa ảnh
      });
      return response.ok;
    } catch (error) {
      console.error("Lỗi thêm sản phẩm:", error);
      return false;
    }
  }

  // ================= 4. CẬP NHẬT SẢN PHẨM =================
  async updateProduct(id: string, formData: FormData): Promise<boolean> {
    try {
      const token = localStorage.getItem("fstyle_token");
      const response = await fetch(`${this.API_URL}/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          // Tuyệt đối không dùng Content-Type: application/json ở đây vì mình đang gửi ảnh (FormData)
        },
        body: formData,
      });
      return response.ok;
    } catch (error) {
      console.error("Lỗi cập nhật sản phẩm:", error);
      return false;
    }
  }

  // ================= 5. XÓA SẢN PHẨM =================
  async deleteProduct(id: string): Promise<boolean> {
    try {
      const token = localStorage.getItem("fstyle_token");
      const response = await fetch(`${this.API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.ok;
    } catch (error) {
      console.error("Lỗi xóa từ Backend:", error);
      return false;
    }
  }
}
