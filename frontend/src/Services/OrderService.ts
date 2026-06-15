import { ClientOrder } from "../Models/Order.js";

export class OrderService {
  // Dữ liệu mô phỏng
  private mockOrders: ClientOrder[] = [
    {
      id: "FS-9901",
      date: "28/05/2026",
      total: 3200000,
      status: "Chờ xác nhận",
    },
    { id: "FS-9842", date: "25/05/2026", total: 5700000, status: "Đang giao" },
    { id: "FS-9711", date: "20/05/2026", total: 1200000, status: "Hoàn thành" },
    { id: "FS-9650", date: "15/05/2026", total: 4500000, status: "Đã hủy" },
    {
      id: "FS-9530",
      date: "10/05/2026",
      total: 14800000,
      status: "Hoàn thành",
    },
  ];

  // Trả về danh sách đơn hàng đã được lọc
  async getOrdersByStatus(status: string): Promise<ClientOrder[]> {
    // Giả lập độ trễ API 200ms cho giống thật
    return new Promise((resolve) => {
      setTimeout(() => {
        if (status === "all" || !status) {
          resolve([...this.mockOrders]);
        } else {
          resolve(this.mockOrders.filter((order) => order.status === status));
        }
      }, 200);
    });
  }
}
