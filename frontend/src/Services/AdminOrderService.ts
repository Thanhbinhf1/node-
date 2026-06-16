import { AdminOrder } from "../Models/AdminOrder.js";

export class AdminOrderService {
  private apiUrl = "http://localhost:3000/api/orders";

  async getAllOrders(): Promise<AdminOrder[]> {
    try {
      const response = await fetch(this.apiUrl);
      if (!response.ok) return [];

      const data = await response.json();
      return data.map((item: any) => ({
        id: item._id,
        orderId: item.orderId,
        customerName: item.customerName,
        date: new Date(item.createdAt).toLocaleDateString("vi-VN"),
        total: item.totalAmount,
        paymentMethod: item.paymentMethod,
        status: item.status,
      }));
    } catch (error) {
      console.error("Lỗi tải đơn hàng:", error);
      return [];
    }
  }

  // Bổ sung hàm lấy chi tiết đơn hàng (Sửa lỗi TS2339)
  async getOrderById(id: string): Promise<any> {
    try {
      const response = await fetch(`${this.apiUrl}/${id}`);
      if (!response.ok) return null;
      return await response.json();
    } catch (error) {
      console.error("Lỗi lấy chi tiết đơn hàng:", error);
      return null;
    }
  }

  async updateOrderStatus(id: string, newStatus: string): Promise<void> {
    try {
      await fetch(`${this.apiUrl}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch (error) {
      console.error("Lỗi cập nhật trạng thái:", error);
    }
  }
}
