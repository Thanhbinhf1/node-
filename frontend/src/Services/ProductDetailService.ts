import { ProductDetail } from "../Models/ProductDetail.js";

export class ProductDetailService {
  private apiUrl = "http://localhost:3000/api/products";

  async getProductById(id: string): Promise<ProductDetail | null> {
    try {
      const response = await fetch(`${this.apiUrl}/${id}`);

      // Nếu không tìm thấy sản phẩm (hoặc ID sai)
      if (!response.ok) return null;

      const data = await response.json();

      // Ép kiểu dữ liệu từ MongoDB sang model của Frontend và bọc an toàn
      return {
        ...data,
        id: data._id, // Chuyển _id thành id
        price: data.price || 0, // An toàn giá tiền
        // Xử lý ảnh: Nếu có mảng images thì dùng, không thì lấy ảnh chính, không có nữa thì dùng ảnh dự phòng
        images:
          data.images && data.images.length > 0
            ? data.images
            : [
                data.image ||
                  "https://dummyimage.com/600x600/cccccc/000000&text=No+Image",
              ],
      };
    } catch (error) {
      console.error("Lỗi lấy chi tiết sản phẩm:", error);
      return null;
    }
  }
}
