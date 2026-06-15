export class CheckoutController {
    service;
    view;
    finalTotal = 0;
    constructor(service, view) {
        this.service = service;
        this.view = view;
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
    async handlePlaceOrder(formData) {
        if (!formData.customerName || !formData.phone || !formData.address) {
            alert("Vui lòng điền đầy đủ Họ Tên, Số điện thoại và Địa chỉ!");
            return;
        }
        const payload = {
            ...formData,
            totalAmount: this.finalTotal,
        };
        this.view.showLoading(true);
        const result = await this.service.placeOrder(payload);
        this.view.showLoading(false);
        if (result.success) {
            if (payload.paymentMethod === "cod") {
                alert(`Đặt hàng thành công! Mã đơn của bạn là: ${result.orderId}`);
                window.location.href = "index.html";
            }
            else {
                alert(`Đang chuyển hướng sang cổng thanh toán ${payload.paymentMethod.toUpperCase()}...`);
            }
        }
    }
}
