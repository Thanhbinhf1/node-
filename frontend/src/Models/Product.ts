export interface Product {
  id: string; // Đảm bảo ID đã được đổi thành string (phục vụ MongoDB)
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  discount?: string;
  rating?: number;
  sold: number;
  inStock: boolean;
  image: string;
  dateAdded?: string;

  createdAt?: string;
  updatedAt?: string;
}
