export class AdminCouponService {
    apiUrl = "http://localhost:3000/api/coupons";
    async getAllCoupons() {
        try {
            const response = await fetch(this.apiUrl);
            if (!response.ok)
                return [];
            const data = await response.json();
            return data.map((item) => ({
                id: item._id,
                code: item.code,
                discountAmount: item.discountAmount || 0,
                expirationDate: item.expirationDate
                    ? new Date(item.expirationDate).toLocaleDateString("vi-VN")
                    : "Không thời hạn",
                isActive: item.isActive !== undefined ? item.isActive : true,
            }));
        }
        catch (error) {
            return [];
        }
    }
    async getCouponById(id) {
        try {
            const response = await fetch(`${this.apiUrl}/${id}`);
            if (!response.ok)
                return null;
            return await response.json();
        }
        catch (error) {
            return null;
        }
    }
    async addCoupon(data) {
        try {
            const response = await fetch(this.apiUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            return response.ok;
        }
        catch (error) {
            return false;
        }
    }
    async updateCoupon(id, data) {
        try {
            const response = await fetch(`${this.apiUrl}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            return response.ok;
        }
        catch (error) {
            return false;
        }
    }
    async deleteCoupon(id) {
        try {
            const response = await fetch(`${this.apiUrl}/${id}`, {
                method: "DELETE",
            });
            return response.ok;
        }
        catch (error) {
            return false;
        }
    }
}
