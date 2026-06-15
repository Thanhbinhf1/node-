export class DashboardController {
    service;
    view;
    constructor(service, view) {
        this.service = service;
        this.view = view;
        this.init();
    }
    async init() {
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
