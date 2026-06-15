export interface ProductDetail {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice: number;
  description: string;
  images: string[];
  rating: number;
  sold: number;
  inStock: boolean;
}
