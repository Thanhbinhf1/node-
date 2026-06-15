import { AdminOrderService } from "./Services/AdminOrderService.js";
import { AdminOrderView } from "./Views/AdminOrderView.js";
import { AdminOrderController } from "./Controllers/AdminOrderController.js";

document.addEventListener("DOMContentLoaded", () => {
  const service = new AdminOrderService();
  const view = new AdminOrderView();
  const app = new AdminOrderController(service, view);
});
