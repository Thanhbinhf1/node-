import { CheckoutItem, OrderPayload } from "../Models/Checkout.js";

export class CheckoutService {
  private apiUrl = "http://localhost:3000/api/orders";
  private SHIPPING_FEE = 30000;

  // Đọc giỏ hàng thật từ LocalStorage
  async getCheckoutItems(): Promise<CheckoutItem[]> {
    const cartData = localStorage.getItem("cart");
    return cartData ? JSON.parse(cartData) : [];
  }

  async getOrderTotals() {
    const items = await this.getCheckoutItems();
    const subtotal = items.reduce(
      (sum, item) => sum + item.price * item.qty,
      0,
    );

    // Nếu có mã giảm giá đã lưu từ trang Giỏ hàng
    const discountStr = localStorage.getItem("discountAmount");
    const discount = discountStr ? Number(discountStr) : 0;

    const finalTotal = subtotal - discount + this.SHIPPING_FEE;

    return {
      subtotal,
      discount,
      shipping: this.SHIPPING_FEE,
      finalTotal,
    };
  }

  // Gọi API thật lên Backend Node.js
  async placeOrder(
    payload: any,
  ): Promise<{ success: boolean; orderId?: string; message?: string }> {
    try {
      const response = await fetch(this.apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        // Đặt hàng thành công thì xóa sạch giỏ hàng đi
        localStorage.removeItem("cart");
        localStorage.removeItem("discountAmount");
        return { success: true, orderId: data.data.orderId };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      return { success: false, message: "Lỗi kết nối đến Server!" };
    }
  }
}
