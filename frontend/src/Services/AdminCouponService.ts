import { AdminCoupon } from "../Models/AdminCoupon.js";

export class AdminCouponService {
  private apiUrl = "http://localhost:3000/api/coupons";

  async getAllCoupons(): Promise<AdminCoupon[]> {
    try {
      const response = await fetch(this.apiUrl);
      if (!response.ok) return [];

      const data = await response.json();
      return data.map((item: any) => ({
        id: item._id,
        code: item.code,
        discountAmount: item.discountAmount || 0,
        expirationDate: item.expirationDate
          ? new Date(item.expirationDate).toLocaleDateString("vi-VN")
          : "Không thời hạn",
        isActive: item.isActive !== undefined ? item.isActive : true,
      }));
    } catch (error) {
      return [];
    }
  }

  // Bổ sung hàm lấy 1 mã giảm giá
  async getCouponById(id: string): Promise<any> {
    try {
      const response = await fetch(`${this.apiUrl}/${id}`);
      if (!response.ok) return null;
      return await response.json();
    } catch (error) {
      return null;
    }
  }

  // Nhận data trực tiếp thay vì FormData
  async addCoupon(data: any): Promise<boolean> {
    try {
      const response = await fetch(this.apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  }

  // Nhận data trực tiếp thay vì FormData
  async updateCoupon(id: string, data: any): Promise<boolean> {
    try {
      const response = await fetch(`${this.apiUrl}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  }

  async deleteCoupon(id: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.apiUrl}/${id}`, {
        method: "DELETE",
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  }
}
