export interface AdminProduct {
  id: string; // Đổi sang chuỗi để khớp với _id của MongoDB
  sku: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: "Đang bán" | "Hết hàng" | "Đã ẩn" | "Active" | "Hidden";
  images?: string[];
}
