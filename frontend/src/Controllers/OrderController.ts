import { OrderService } from "../Services/OrderService.js";
import { OrderView } from "../Views/OrderView.js";

export class OrderController {
  constructor(
    private service: OrderService,
    private view: OrderView,
  ) {
    // Mặc định load tất cả đơn hàng lúc mới vào
    this.handleFilterOrders("all");

    // Lắng nghe sự kiện chuyển Tab từ View
    this.view.bindTabClick(this.handleFilterOrders.bind(this));
  }

  // Xử lý khi có lệnh lọc đơn
  async handleFilterOrders(status: string) {
    // Có thể thêm tính năng bật Loading ở đây nếu muốn

    // Nhờ Service móc dữ liệu
    const filteredOrders = await this.service.getOrdersByStatus(status);

    // Nhờ View vẽ ra
    this.view.renderOrders(filteredOrders);
  }
}
