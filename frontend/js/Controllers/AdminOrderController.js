export class AdminOrderController {
    service;
    view;
    constructor(service, view) {
        this.service = service;
        this.view = view;
        this.init();
        this.view.bindViewDetail(this.handleViewDetail.bind(this));
    }
    async init() {
        const orders = await this.service.getAllOrders();
        this.view.renderOrdersTable(orders);
    }
    async handleViewDetail(orderId) {
        const order = await this.service.getOrderById(orderId);
        if (order) {
            this.view.renderOrderDetail(order);
        }
    }
}
