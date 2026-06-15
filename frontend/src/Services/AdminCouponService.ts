import { AdminCoupon } from "../Models/AdminCoupon.js";

export class AdminCouponService {
  private API_URL = "http://localhost:3000/api/coupons";

  async getAllCoupons(): Promise<AdminCoupon[]> {
    try {
      const response = await fetch(this.API_URL);
      const data = await response.json();
      return data.map((item: any) => ({
        id: item._id,
        code: item.code,
        discountType: item.discountType,
        discountValue: item.discountValue,
        minOrderAmount: item.minOrderAmount || 0,
        usageLimit: item.usageLimit || 0,
        usageCount: item.usageCount || 0,
        expiryDate: item.expiryDate,
        status: item.status,
      }));
    } catch (error) {
      return [];
    }
  }

  async getCouponById(id: string): Promise<any> {
    try {
      const response = await fetch(`${this.API_URL}/${id}`);
      return response.ok ? await response.json() : null;
    } catch (error) {
      return null;
    }
  }

  async addCoupon(data: any): Promise<boolean> {
    try {
      const response = await fetch(this.API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  }

  async updateCoupon(id: string, data: any): Promise<boolean> {
    try {
      const response = await fetch(`${this.API_URL}/${id}`, {
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
      const response = await fetch(`${this.API_URL}/${id}`, {
        method: "DELETE",
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  }
}
