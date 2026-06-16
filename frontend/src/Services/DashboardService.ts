export class DashboardService {
  private orderApi = "http://localhost:3000/api/orders";
  private userApi = "http://localhost:3000/api/users";
  private productApi = "http://localhost:3000/api/products";

  async getStats(): Promise<any> {
    try {
      const [ordersRes, usersRes, productsRes] = await Promise.all([
        fetch(this.orderApi),
        fetch(this.userApi),
        fetch(this.productApi),
      ]);

      const orders = await ordersRes.json();
      const users = await usersRes.json();
      const products = await productsRes.json();

      const totalRevenue = orders
        .filter((o: any) => o.status === "Hoàn thành")
        .reduce((sum: number, o: any) => sum + (o.totalAmount || 0), 0);

      return {
        revenue: totalRevenue,
        orders: orders.length,
        users: users.length,
        products: products.length,
      };
    } catch (error) {
      return { revenue: 0, orders: 0, users: 0, products: 0 };
    }
  }

  async getChartData(): Promise<any> {
    // Dữ liệu biểu đồ doanh thu giả lập (vì Backend chưa có API thống kê theo tháng)
    return {
      labels: ["T1", "T2", "T3", "T4", "T5", "T6", "T7"],
      data: [12000000, 19000000, 3000000, 5000000, 2000000, 3000000, 10000000],
    };
  }

  async getLatestOrders(): Promise<any[]> {
    try {
      const response = await fetch(this.orderApi);
      const orders = await response.json();
      // Trả về 5 đơn hàng mới nhất
      return orders.slice(0, 5).map((o: any) => ({
        id: o.orderId,
        customer: o.customerName || "Khách vãng lai",
        total: o.totalAmount,
        status: o.status,
      }));
    } catch (error) {
      return [];
    }
  }

  async getTopProducts(): Promise<any[]> {
    try {
      const response = await fetch(this.productApi);
      const products = await response.json();
      // Sắp xếp theo số lượng bán (sold) giảm dần và lấy 5 cái đầu
      products.sort((a: any, b: any) => (b.sold || 0) - (a.sold || 0));
      return products.slice(0, 5).map((p: any) => ({
        name: p.name,
        sold: p.sold || 0,
        price: p.price || 0,
      }));
    } catch (error) {
      return [];
    }
  }
}
