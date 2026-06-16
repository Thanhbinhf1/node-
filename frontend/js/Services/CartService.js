export class CartService {
    discountAmount = 0;
    async getCartItems() {
        const cartData = localStorage.getItem("cart");
        return cartData ? JSON.parse(cartData) : [];
    }
    async updateQuantity(id, change) {
        let cart = await this.getCartItems();
        const item = cart.find((i) => i.id === id);
        if (item) {
            item.qty += change;
            if (item.qty < 1)
                item.qty = 1;
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    }
    async removeItem(id) {
        let cart = await this.getCartItems();
        cart = cart.filter((i) => i.id !== id);
        localStorage.setItem("cart", JSON.stringify(cart));
    }
    async applyCoupon(code) {
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
    async getSummary() {
        const cartItems = await this.getCartItems();
        const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
        const actualDiscount = Math.min(this.discountAmount, subtotal);
        const total = subtotal - actualDiscount;
        return { subtotal, discount: actualDiscount, total };
    }
}
