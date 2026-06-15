import { CheckoutService } from "./Services/CheckoutService.js";
import { CheckoutView } from "./Views/CheckoutView.js";
import { CheckoutController } from "./Controllers/CheckoutController.js";

document.addEventListener("DOMContentLoaded", () => {
  const service = new CheckoutService();
  const view = new CheckoutView();
  const app = new CheckoutController(service, view);
});
