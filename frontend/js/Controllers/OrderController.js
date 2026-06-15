export class OrderController {
    service;
    view;
    constructor(service, view) {
        this.service = service;
        this.view = view;
        this.handleFilterOrders("all");
        this.view.bindTabClick(this.handleFilterOrders.bind(this));
    }
    async handleFilterOrders(status) {
        const filteredOrders = await this.service.getOrdersByStatus(status);
        this.view.renderOrders(filteredOrders);
    }
}
