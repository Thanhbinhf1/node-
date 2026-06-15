import { AdminOrderService } from "../Services/AdminOrderService.js";
import { AdminOrderView } from "../Views/AdminOrderView.js";

export class AdminOrderController {
  constructor(
    private service: AdminOrderService,
    private view: AdminOrderView,
  ) {
    this.init();
    this.view.bindViewDetail(this.handleViewDetail.bind(this));
  }

  async init() {
    const orders = await this.service.getAllOrders();
    this.view.renderOrdersTable(orders);
  }

  async handleViewDetail(orderId: string) {
    const order = await this.service.getOrderById(orderId);
    if (order) {
      this.view.renderOrderDetail(order);
    }
  }
}
