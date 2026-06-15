export interface CheckoutItem {
  id: number;
  name: string;
  variant: string;
  price: number;
  qty: number;
  img: string;
}

export interface OrderPayload {
  customerName: string;
  phone: string;
  email: string;
  address: string;
  note: string;
  paymentMethod: string;
  totalAmount: number;
}
