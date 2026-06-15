import {
  DashboardStats,
  DashboardOrder,
  DashboardProduct,
} from "../Models/Dashboard.js";

// Khai báo để TypeScript không báo lỗi khi dùng thư viện Chart.js nhúng từ HTML
declare const Chart: any;

export class DashboardView {
  // Thống kê
  private statRevenue = document.getElementById("stat-revenue");
  private statOrders = document.getElementById("stat-orders");
  private statProducts = document.getElementById("stat-products");
  private statUsers = document.getElementById("stat-users");

  // Bảng
  private ordersBody = document.getElementById("dashboard-orders-body");
  private productsBody = document.getElementById("dashboard-products-body");

  // Chart
  private chartCtx = document.getElementById(
    "revenueChart",
  ) as HTMLCanvasElement;
  private revenueChartInstance: any = null;

  renderStats(stats: DashboardStats) {
    // Bọc Number() bên ngoài để ép kiểu về số, lách luật TypeScript an toàn 100%
    if (this.statRevenue)
      this.statRevenue.innerText = `${Number(stats.revenue).toLocaleString("vi-VN")}đ`;
    if (this.statOrders)
      this.statOrders.innerText = Number(stats.orders).toLocaleString("vi-VN");
    if (this.statProducts)
      this.statProducts.innerText = Number(stats.products).toLocaleString(
        "vi-VN",
      );
    if (this.statUsers)
      this.statUsers.innerText = Number(stats.users).toLocaleString("vi-VN");
  }
  renderChart(labels: string[], data: number[]) {
    if (!this.chartCtx) return;

    // Hủy chart cũ nếu vẽ lại
    if (this.revenueChartInstance) {
      this.revenueChartInstance.destroy();
    }

    this.revenueChartInstance = new Chart(this.chartCtx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Doanh thu (VNĐ)", // Đã Việt hóa
            data: data,
            borderColor: "#3b82f6",
            backgroundColor: "rgba(59, 130, 246, 0.1)",
            borderWidth: 2,
            tension: 0.4,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: {
            beginAtZero: true,
            grid: { color: "#334155" },
            ticks: { color: "#94a3b8" },
          },
          x: { grid: { display: false }, ticks: { color: "#94a3b8" } },
        },
      },
    });
  }

  renderOrders(orders: DashboardOrder[]) {
    if (!this.ordersBody) return;
    this.ordersBody.innerHTML = orders
      .map((o) => {
        // Việt hóa trạng thái đơn hàng
        let statusClass = "status-pending";
        let statusText = "Chờ xác nhận";

        if (o.status === "Hoàn thành" || o.status === "Completed") {
          statusClass = "status-completed";
          statusText = "Hoàn thành";
        } else if (o.status === "Đang giao" || o.status === "Shipping") {
          statusClass = "status-shipping";
          statusText = "Đang giao";
        }

        return `
            <tr>
                <td>
                    <div style="font-weight: 600">${o.customer}</div>
                    <div style="font-size: 12px; color: var(--text-muted)">${o.id}</div>
                </td>
                <td style="font-weight: 600; color: var(--primary);">${o.total.toLocaleString("vi-VN")}đ</td>
                <td>
                    <span class="status-badge ${statusClass}">${statusText}</span>
                </td>
            </tr>
        `;
      })
      .join("");
  }

  renderProducts(products: DashboardProduct[]) {
    if (!this.productsBody) return;
    this.productsBody.innerHTML = products
      .map((p) => {
        const stockColor = p.stock > 10 ? "#10b981" : "#ef4444"; // Xanh nếu >10, đỏ nếu ít/hết hàng

        // Fix lỗi đường dẫn ảnh (giống trang Categories)
        const imgUrl = p.img
          ? `http://localhost:3000${p.img}`
          : "https://via.placeholder.com/50";

        return `
                <tr>
                    <td>
                        <div class="table-product">
                            <img src="${imgUrl}" alt="Product" style="border: 1px solid var(--border-color);"/>
                            <div>
                                <div style="font-weight: 600">${p.name}</div>
                                <div style="font-size: 12px; color: var(--text-muted)">SKU: ${p.sku || "---"}</div>
                            </div>
                        </div>
                    </td>
                    <td>${p.category}</td>
                    <td style="font-weight: 600;">${p.price.toLocaleString("vi-VN")}đ</td>
                    <td><strong>${p.sold.toLocaleString("vi-VN")}</strong></td>
                    <td><span style="color: ${stockColor}">${p.stock} sản phẩm</span></td>
                </tr>
            `;
      })
      .join("");
  }
}
