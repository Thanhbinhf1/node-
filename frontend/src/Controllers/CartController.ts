import { CartService } from "../Services/CartService.js";
import { CartView } from "../Views/CartView.js";

export class CartController {
  constructor(
    private service: CartService,
    private view: CartView,
  ) {
    this.init();

    // Truyền các hàm xử lý cho View gắn vào nút bấm
    this.view.bindCartEvents(
      this.updateQuantity.bind(this),
      this.removeItem.bind(this),
      this.applyCoupon.bind(this),
    );
  }

  // Load dữ liệu lần đầu
  async init() {
    this.refreshCartDisplay();
  }

  // Hàm gọi chung để vẽ lại toàn bộ giỏ hàng
  private async refreshCartDisplay() {
    const items = await this.service.getCartItems();
    const summary = this.service.getSummary();

    this.view.renderCartList(items);
    this.view.renderSummary(summary);
  }

  async updateQuantity(id: number, change: number) {
    await this.service.updateQuantity(id, change);
    this.refreshCartDisplay(); // Vẽ lại
  }

  async removeItem(id: number) {
    await this.service.removeItem(id);
    this.refreshCartDisplay(); // Vẽ lại
  }

  async applyCoupon(code: string) {
    if (!code) {
      this.view.renderCouponMessage(false, "Vui lòng nhập mã giảm giá!");
      return;
    }

    const result = await this.service.applyCoupon(code);
    this.view.renderCouponMessage(result.success, result.msg);
    this.refreshCartDisplay(); // Vẽ lại tổng tiền
  }
}
