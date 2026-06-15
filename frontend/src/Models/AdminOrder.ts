export interface AdminOrder {
  id: string; // Đổi sang string cho MongoDB
  orderIdCode: string; // Mã hiển thị (VD: ORD-12345)
  customerName: string;
  email: string;
  phone: string;
  address: string;
  date: string;
  totalAmount: number;
  paymentMethod: string;
  paymentStatus: string;
  status: string;
  items: { name: string; price: number; qty: number }[];
}
