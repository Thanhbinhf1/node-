import { AdminProductService } from "./Services/AdminProductService.js";
import { AdminProductView } from "./Views/AdminProductView.js";
import { AdminProductController } from "./Controllers/AdminProductController.js";

document.addEventListener("DOMContentLoaded", () => {
  const service = new AdminProductService();
  const view = new AdminProductView();
  const app = new AdminProductController(service, view);
});
