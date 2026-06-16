import { CheckoutService } from "../Services/CheckoutService.js";
import { CheckoutView } from "../Views/CheckoutView.js";
import { OrderPayload } from "../Models/Checkout.js";

export class CheckoutController {
  private finalTotal: number = 0;
  private checkoutItems: any[] = []; // Thêm biến lưu trữ items

  constructor(
    private service: CheckoutService,
    private view: CheckoutView,
  ) {
    this.init();
    this.view.bindPaymentSelection();
    this.view.bindSubmitOrder(this.handlePlaceOrder.bind(this));
  }

  async init() {
    this.checkoutItems = await this.service.getCheckoutItems();
    const totals = await this.service.getOrderTotals();

    this.finalTotal = totals.finalTotal;

    this.view.renderItems(this.checkoutItems);
    this.view.renderTotals(totals);
  }

  async handlePlaceOrder(formData: any) {
    if (!formData.customerName || !formData.phone || !formData.address) {
      alert("Vui lòng điền đầy đủ Họ Tên, Số điện thoại và Địa chỉ!");
      return;
    }

    // MAP lại danh sách item đúng chuẩn Backend yêu cầu
    const orderItems = this.checkoutItems.map((item) => ({
      product: item.id, // BẮT BUỘC: Đây phải là cái chuỗi ObjectId của MongoDB
      name: item.name,
      price: item.price,
      qty: item.qty,
    }));

    // Lấy ID user nếu khách đã đăng nhập (lưu trong localStorage)
    const userId = localStorage.getItem("userId") || null;

    const payload: any = {
      ...formData,
      totalAmount: this.finalTotal,
      items: orderItems, // Đã bổ sung mảng sản phẩm
      user: userId, // Đã bổ sung user để lưu lịch sử
    };

    this.view.showLoading(true);

    try {
      // Gọi API thật tới Backend thay vì mock
      const response = await fetch("http://localhost:3000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      this.view.showLoading(false);

      if (response.ok) {
        // Xóa giỏ hàng sau khi đặt thành công
        localStorage.removeItem("cart");

        if (payload.paymentMethod === "cod") {
          alert(`Đặt hàng thành công!`);
          window.location.href = "index.html";
        } else {
          alert(`Đang chuyển hướng sang cổng thanh toán...`);
        }
      } else {
        alert("Lỗi đặt hàng: " + result.message);
      }
    } catch (error) {
      this.view.showLoading(false);
      alert("Không thể kết nối đến Server!");
    }
  }
}
