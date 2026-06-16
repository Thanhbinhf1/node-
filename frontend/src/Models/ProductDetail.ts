export interface ProductDetail {
  id: string;
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
