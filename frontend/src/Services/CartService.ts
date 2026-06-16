import { CartItem } from "../Models/CartItem.js"; // Đã thêm import để sửa lỗi TS2304

export class CartService {
  private discountAmount: number = 0;

  // Lấy dữ liệu thực tế từ Local Storage
  async getCartItems(): Promise<CartItem[]> {
    const cartData = localStorage.getItem("cart");
    return cartData ? JSON.parse(cartData) : [];
  }

  async updateQuantity(id: string, change: number): Promise<void> {
    let cart = await this.getCartItems();
    const item = cart.find((i) => i.id === id);
    if (item) {
      item.qty += change;
      if (item.qty < 1) item.qty = 1;
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }

  async removeItem(id: string): Promise<void> {
    let cart = await this.getCartItems();
    cart = cart.filter((i) => i.id !== id);
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // Khôi phục lại hàm applyCoupon (Sửa lỗi TS2339)
  async applyCoupon(
    code: string,
  ): Promise<{ success: boolean; msg: string; amount: number }> {
    if (code === "FSTYLE50K") {
      this.discountAmount = 50000;
      return {
        success: true,
        msg: "Áp dụng mã thành công! Giảm 50.000đ",
        amount: 50000,
      };
    }
    this.discountAmount = 0;
    return { success: false, msg: "Mã không hợp lệ hoặc hết hạn!", amount: 0 };
  }

  // Khôi phục lại hàm getSummary và đọc từ giỏ hàng hiện tại (Sửa lỗi TS2339)
  async getSummary(): Promise<{
    subtotal: number;
    discount: number;
    total: number;
  }> {
    const cartItems = await this.getCartItems();
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.qty,
      0,
    );
    const actualDiscount = Math.min(this.discountAmount, subtotal);
    const total = subtotal - actualDiscount;

    return { subtotal, discount: actualDiscount, total };
  }
}
