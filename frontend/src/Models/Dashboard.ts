export interface DashboardStats {
  revenue: string;
  revenueTrend: string;
  orders: number;
  ordersTrend: string;
  products: number;
  users: number;
  usersTrend: string;
}

export interface DashboardOrder {
  id: string;
  customer: string;
  total: number;
  status: string;
}

export interface DashboardProduct {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  sold: number;
  stock: number;
  img: string;
}
