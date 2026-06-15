import { CheckoutItem, OrderPayload } from "../Models/Checkout.js";

export class CheckoutService {
  // Kéo dữ liệu giả lập (Sau này lấy từ LocalStorage hoặc API Giỏ hàng)
  private checkoutItems: CheckoutItem[] = [
    {
      id: 1,
      name: "Ghế Công Thái Học F.Style",
      variant: "Đen",
      price: 3200000,
      qty: 1,
      img: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=150",
    },
    {
      id: 2,
      name: "Arm Màn Hình Kép",
      variant: "Trắng",
      price: 1200000,
      qty: 2,
      img: "https://images.unsplash.com/photo-1527443154391-4208e9baea10?w=150",
    },
  ];

  private FIXED_DISCOUNT = 50000;
  private SHIPPING_FEE = 30000;

  async getCheckoutItems(): Promise<CheckoutItem[]> {
    return this.checkoutItems;
  }

  async getOrderTotals() {
    const subtotal = this.checkoutItems.reduce(
      (sum, item) => sum + item.price * item.qty,
      0,
    );
    const finalTotal = subtotal - this.FIXED_DISCOUNT + this.SHIPPING_FEE;

    return {
      subtotal,
      discount: this.FIXED_DISCOUNT,
      shipping: this.SHIPPING_FEE,
      finalTotal,
    };
  }

  // Giả lập gửi đơn hàng lên Backend
  async placeOrder(
    payload: OrderPayload,
  ): Promise<{ success: boolean; orderId: string }> {
    console.log("Đang gửi dữ liệu đơn hàng lên Server:", payload);
    // Mô phỏng độ trễ mạng
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          orderId: "FS-" + Math.floor(Math.random() * 10000),
        });
      }, 1000);
    });
  }
}
