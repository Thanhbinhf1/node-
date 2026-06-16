import { ClientOrder } from "../Models/Order.js";

export class OrderService {
  private apiUrl = "http://localhost:3000/api/orders";

  async getOrdersByStatus(status: string): Promise<ClientOrder[]> {
    try {
      // Lấy ID user đang đăng nhập
      const userId = localStorage.getItem("userId");
      if (!userId) return []; // Chưa đăng nhập thì mảng rỗng

      const response = await fetch(this.apiUrl);
      if (!response.ok) return [];

      const allOrders = await response.json();

      // 1. Lọc ra ĐÚNG những đơn hàng của khách này
      let myOrders = allOrders.filter((order: any) => {
        // Backend có populate user nên cần check an toàn
        const orderUserId = order.user?._id || order.user;
        return orderUserId === userId;
      });

      // 2. Lọc tiếp theo trạng thái (Tất cả, Đang giao, Đã hủy...)
      if (status && status !== "all") {
        myOrders = myOrders.filter((order: any) => order.status === status);
      }

      // 3. Map lại dữ liệu cho View dễ đọc
      return myOrders.map((order: any) => ({
        id: order.orderId, // Lấy mã ORD-123456 cho đẹp
        date: new Date(order.createdAt).toLocaleDateString("vi-VN"),
        total: order.totalAmount,
        status: order.status,
      }));
    } catch (error) {
      console.error("Lỗi lấy danh sách đơn hàng:", error);
      return [];
    }
  }
}
