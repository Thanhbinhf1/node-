export class CheckoutController {
    service;
    view;
    finalTotal = 0;
    checkoutItems = [];
    constructor(service, view) {
        this.service = service;
        this.view = view;
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
    async handlePlaceOrder(formData) {
        if (!formData.customerName || !formData.phone || !formData.address) {
            alert("Vui lòng điền đầy đủ Họ Tên, Số điện thoại và Địa chỉ!");
            return;
        }
        const orderItems = this.checkoutItems.map((item) => ({
            product: item.id,
            name: item.name,
            price: item.price,
            qty: item.qty,
        }));
        const userId = localStorage.getItem("userId") || null;
        const payload = {
            ...formData,
            totalAmount: this.finalTotal,
            items: orderItems,
            user: userId,
        };
        this.view.showLoading(true);
        try {
            const response = await fetch("http://localhost:3000/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const result = await response.json();
            this.view.showLoading(false);
            if (response.ok) {
                localStorage.removeItem("cart");
                if (payload.paymentMethod === "cod") {
                    alert(`Đặt hàng thành công!`);
                    window.location.href = "index.html";
                }
                else {
                    alert(`Đang chuyển hướng sang cổng thanh toán...`);
                }
            }
            else {
                alert("Lỗi đặt hàng: " + result.message);
            }
        }
        catch (error) {
            this.view.showLoading(false);
            alert("Không thể kết nối đến Server!");
        }
    }
}
