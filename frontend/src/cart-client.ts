import { CartService } from "./Services/CartService.js";
import { CartView } from "./Views/CartView.js";
import { CartController } from "./Controllers/CartController.js";

document.addEventListener("DOMContentLoaded", () => {
  const service = new CartService();
  const view = new CartView();
  const app = new CartController(service, view);
});
