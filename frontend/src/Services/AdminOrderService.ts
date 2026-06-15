import { AdminOrder } from "../Models/AdminOrder.js";

export class AdminOrderService {
  private API_URL = "http://localhost:3000/api/orders";

  async getAllOrders(): Promise<AdminOrder[]> {
    try {
      const response = await fetch(this.API_URL);
      const data = await response.json();

      return data.map((item: any) => ({
        id: item._id,
        orderIdCode: item.orderId || "N/A",
        customerName: item.customerName || "Khách vãng lai",
        email: item.email || "",
        phone: item.phone || "",
        address: item.address || "",
        date: item.createdAt
          ? new Date(item.createdAt).toLocaleString("vi-VN")
          : "",
        totalAmount: item.totalAmount || 0, // Bọc lót chống sập toLocaleString
        paymentMethod: item.paymentMethod || "COD",
        paymentStatus: item.paymentStatus || "Unpaid",
        status: item.status || "Chờ xác nhận",
        items: item.items || [],
      }));
    } catch (error) {
      return [];
    }
  }

  async getOrderById(id: string): Promise<any> {
    try {
      const response = await fetch(`${this.API_URL}/${id}`);
      return response.ok ? await response.json() : null;
    } catch (error) {
      return null;
    }
  }

  async updateOrderStatus(id: string, newStatus: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.API_URL}/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  }
}
