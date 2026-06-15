import { CheckoutService } from "../Services/CheckoutService.js";
import { CheckoutView } from "../Views/CheckoutView.js";
import { OrderPayload } from "../Models/Checkout.js";

export class CheckoutController {
  private finalTotal: number = 0;

  constructor(
    private service: CheckoutService,
    private view: CheckoutView,
  ) {
    this.init();
    this.view.bindPaymentSelection();
    this.view.bindSubmitOrder(this.handlePlaceOrder.bind(this));
  }

  async init() {
    const items = await this.service.getCheckoutItems();
    const totals = await this.service.getOrderTotals();

    this.finalTotal = totals.finalTotal;

    this.view.renderItems(items);
    this.view.renderTotals(totals);
  }

  async handlePlaceOrder(formData: any) {
    // 1. Validate Form cơ bản
    if (!formData.customerName || !formData.phone || !formData.address) {
      alert("Vui lòng điền đầy đủ Họ Tên, Số điện thoại và Địa chỉ!");
      return;
    }

    // 2. Chuẩn bị Payload gửi lên Server
    const payload: OrderPayload = {
      ...formData,
      totalAmount: this.finalTotal,
    };

    // 3. Hiển thị trạng thái Loading
    this.view.showLoading(true);

    // 4. Gọi Service xử lý đặt hàng
    const result = await this.service.placeOrder(payload);

    this.view.showLoading(false);

    // 5. Xử lý sau khi đặt thành công
    if (result.success) {
      if (payload.paymentMethod === "cod") {
        alert(`Đặt hàng thành công! Mã đơn của bạn là: ${result.orderId}`);
        window.location.href = "index.html"; // Đẩy về trang chủ
      } else {
        alert(
          `Đang chuyển hướng sang cổng thanh toán ${payload.paymentMethod.toUpperCase()}...`,
        );
      }
    }
  }
}
