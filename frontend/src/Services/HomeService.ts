import { Banner } from "../Models/Banner.js";
import { Product } from "../Models/Product.js";

export class HomeService {
  private productApiUrl = "http://localhost:3000/api/products";

  // 1. Dữ liệu Banner (Tạm giữ nguyên vì bạn chưa có API quản lý banner)
  private mockBanners: Banner[] = [
    {
      id: 1,
      imageUrl:
        "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200",
      link: "/products.html",
      altText: "Sale nội thất văn phòng",
    },
    {
      id: 2,
      imageUrl:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200",
      link: "/products.html",
      altText: "Ghế công thái học cao cấp",
    },
  ];

  async getBanners(): Promise<Banner[]> {
    return this.mockBanners;
  }

  // 2. Kéo Sản phẩm nổi bật từ DB thật
  async getHotProducts(): Promise<Product[]> {
    try {
      const response = await fetch(this.productApiUrl);
      if (!response.ok) return [];
      const data = await response.json();

      // Ép kiểu ID và chỉ lấy 4 sản phẩm đầu tiên để hiển thị trang chủ
      const products = data.map((item: any) => ({
        ...item,
        id: item._id,
      }));

      return products.slice(0, 4);
    } catch (error) {
      console.error("Lỗi lấy sản phẩm HOT:", error);
      return [];
    }
  }
}
