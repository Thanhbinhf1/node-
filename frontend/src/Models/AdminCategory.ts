export interface AdminCategory {
  id: string; // Đổi sang string cho MongoDB
  name: string;
  slug: string;
  parent: string;
  productsCount: number;
  status: "Active" | "Hidden";
  image: string;
}
