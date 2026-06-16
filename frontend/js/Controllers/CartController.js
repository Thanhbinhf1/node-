export class CartController {
    service;
    view;
    constructor(service, view) {
        this.service = service;
        this.view = view;
        this.init();
        this.view.bindCartEvents(this.updateQuantity.bind(this), this.removeItem.bind(this), this.applyCoupon.bind(this));
    }
    async init() {
        this.refreshCartDisplay();
    }
    async refreshCartDisplay() {
        const items = await this.service.getCartItems();
        const summary = await this.service.getSummary();
        this.view.renderCartList(items);
        this.view.renderSummary(summary);
    }
    async updateQuantity(id, change) {
        await this.service.updateQuantity(id, change);
        this.refreshCartDisplay();
    }
    async removeItem(id) {
        await this.service.removeItem(id);
        this.refreshCartDisplay();
    }
    async applyCoupon(code) {
        if (!code) {
            this.view.renderCouponMessage(false, "Vui lòng nhập mã giảm giá!");
            return;
        }
        const result = await this.service.applyCoupon(code);
        this.view.renderCouponMessage(result.success, result.msg);
        this.refreshCartDisplay();
    }
}
