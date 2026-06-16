export class CheckoutService {
    apiUrl = "http://localhost:3000/api/orders";
    SHIPPING_FEE = 30000;
    async getCheckoutItems() {
        const cartData = localStorage.getItem("cart");
        return cartData ? JSON.parse(cartData) : [];
    }
    async getOrderTotals() {
        const items = await this.getCheckoutItems();
        const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
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
    async placeOrder(payload) {
        try {
            const response = await fetch(this.apiUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.removeItem("cart");
                localStorage.removeItem("discountAmount");
                return { success: true, orderId: data.data.orderId };
            }
            else {
                return { success: false, message: data.message };
            }
        }
        catch (error) {
            return { success: false, message: "Lỗi kết nối đến Server!" };
        }
    }
}
