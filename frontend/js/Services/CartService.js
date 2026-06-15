export class CartService {
    cartItems = [
        {
            id: 1,
            name: "Ghế Công Thái Học F.Style",
            variant: "Đen",
            price: 3200000,
            qty: 1,
            img: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=150",
        },
        {
            id: 2,
            name: "Arm Màn Hình Kép",
            variant: "Trắng",
            price: 1200000,
            qty: 2,
            img: "https://images.unsplash.com/photo-1527443154391-4208e9baea10?w=150",
        },
    ];
    discountAmount = 0;
    async getCartItems() {
        return this.cartItems;
    }
    async updateQuantity(id, change) {
        const item = this.cartItems.find((i) => i.id === id);
        if (item) {
            item.qty += change;
            if (item.qty < 1)
                item.qty = 1;
        }
    }
    async removeItem(id) {
        this.cartItems = this.cartItems.filter((i) => i.id !== id);
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
    getSummary() {
        const subtotal = this.cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
        const actualDiscount = Math.min(this.discountAmount, subtotal);
        const total = subtotal - actualDiscount;
        return { subtotal, discount: actualDiscount, total };
    }
}
