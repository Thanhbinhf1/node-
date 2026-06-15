import { DashboardService } from "../Services/DashboardService.js";
import { DashboardView } from "../Views/DashboardView.js";

export class DashboardController {
  constructor(
    private service: DashboardService,
    private view: DashboardView,
  ) {
    this.init();
  }

  async init() {
    // Tải dữ liệu song song cho nhanh
    const [stats, chartData, orders, products] = await Promise.all([
      this.service.getStats(),
      this.service.getChartData(),
      this.service.getLatestOrders(),
      this.service.getTopProducts(),
    ]);

    this.view.renderStats(stats);
    this.view.renderChart(chartData.labels, chartData.data);
    this.view.renderOrders(orders);
    this.view.renderProducts(products);
  }
}
