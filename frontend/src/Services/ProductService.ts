import { Product } from "../Models/Product.js";

export class ProductService {
  // Dữ liệu giả lập (Sau này thay bằng gọi API Backend)
  private mockData: Product[] = [
    {
      id: 1,
      name: "Ghế Công Thái Học F.Style",
      category: "Ghế",
      price: 3200000,
      oldPrice: 4500000,
      discount: "29%",
      rating: 5,
      sold: 1250,
      inStock: true,
      image:
        "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=300",
      dateAdded: "2026-05-10",
    },
    {
      id: 2,
      name: "Bàn Nâng Hạ Smart Desk",
      category: "Bàn",
      price: 4500000,
      oldPrice: 6000000,
      discount: "25%",
      rating: 4.8,
      sold: 840,
      inStock: true,
      image:
        "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=300",
      dateAdded: "2026-05-15",
    },
    // Thêm các sản phẩm khác...
  ];

  // Hàm lấy toàn bộ sp
  async getAllProducts(): Promise<Product[]> {
    return [...this.mockData];
  }

  // Hàm lọc tổng hợp (Logic nghiệp vụ nằm hết ở đây)
  async filterProducts(
    keyword: string,
    categories: string[],
    minPrice: number,
    maxPrice: number,
    sortBy: string,
  ): Promise<Product[]> {
    let result = [...this.mockData];

    // 1. Lọc từ khóa
    if (keyword) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(keyword.toLowerCase()),
      );
    }

    // 2. Lọc danh mục
    if (categories.length > 0) {
      result = result.filter((p) => categories.indexOf(p.category) !== -1);
    }

    // 3. Lọc giá
    if (minPrice > 0) result = result.filter((p) => p.price >= minPrice);
    if (maxPrice > 0) result = result.filter((p) => p.price <= maxPrice);

    // 4. Sắp xếp
    if (sortBy === "price-asc") result.sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") result.sort((a, b) => b.price - a.price);
    if (sortBy === "sales") result.sort((a, b) => b.sold - a.sold);
    if (sortBy === "new")
      result.sort(
        (a, b) =>
          new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime(),
      );

    return result;
  }
}
