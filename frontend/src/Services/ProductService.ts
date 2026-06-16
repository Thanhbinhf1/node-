import { Product } from "../Models/Product.js";

export class ProductService {
  // Trỏ tới API lấy sản phẩm của Backend
  private apiUrl = "http://localhost:3000/api/products";

  // Hàm lấy toàn bộ sp từ Database
  async getAllProducts(): Promise<Product[]> {
    try {
      const response = await fetch(this.apiUrl);
      if (!response.ok) throw new Error("Lỗi khi tải dữ liệu sản phẩm");
      const data = await response.json();

      // MongoDB trả về _id, ta map nó thành id để View bên bạn không bị lỗi
      return data.map((item: any) => ({
        ...item,
        id: item._id,
      }));
    } catch (error) {
      console.error(error);
      return []; // Nếu lỗi thì trả về mảng rỗng tránh sập web
    }
  }

  // Hàm lọc tổng hợp
  async filterProducts(
    keyword: string,
    categories: string[],
    minPrice: number,
    maxPrice: number,
    sortBy: string,
  ): Promise<Product[]> {
    // 1. Phải lấy mảng sản phẩm thật từ Database trước
    let result = await this.getAllProducts();

    // 2. Các logic lọc của bạn giữ nguyên, nó sẽ lọc trên mảng thật
    if (keyword) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(keyword.toLowerCase()),
      );
    }

    if (categories.length > 0) {
      // Lưu ý: Nếu DB category của bạn trả về ID hoặc Object, logic này có thể cần sửa chút đỉnh
      result = result.filter((p) => categories.indexOf(p.category) !== -1);
    }

    if (minPrice > 0) result = result.filter((p) => p.price >= minPrice);
    if (maxPrice > 0) result = result.filter((p) => p.price <= maxPrice);

    if (sortBy === "price-asc") result.sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") result.sort((a, b) => b.price - a.price);
    if (sortBy === "sales") result.sort((a, b) => b.sold - a.sold);
    if (sortBy === "new") {
      result.sort(
        (a, b) =>
          new Date(b.createdAt || Date.now()).getTime() -
          new Date(a.createdAt || Date.now()).getTime(),
      );
    }

    return result;
  }
}
