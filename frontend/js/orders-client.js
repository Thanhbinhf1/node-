import { OrderService } from "./Services/OrderService.js";
import { OrderView } from "./Views/OrderView.js";
import { OrderController } from "./Controllers/OrderController.js";
document.addEventListener("DOMContentLoaded", () => {
    const service = new OrderService();
    const view = new OrderView();
    const app = new OrderController(service, view);
});
