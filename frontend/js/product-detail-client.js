import { ProductDetailService } from "./Services/ProductDetailService.js";
import { ProductDetailView } from "./Views/ProductDetailView.js";
import { ProductDetailController } from "./Controllers/ProductDetailController.js";
document.addEventListener("DOMContentLoaded", () => {
    const service = new ProductDetailService();
    const view = new ProductDetailView();
    const app = new ProductDetailController(service, view);
});
