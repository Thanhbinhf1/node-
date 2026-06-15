import { ProductService } from "./Services/ProductService.js";
import { ProductView } from "./Views/ProductView.js";
import { ProductController } from "./Controllers/ProductController.js";
document.addEventListener("DOMContentLoaded", () => {
    const service = new ProductService();
    const view = new ProductView();
    const app = new ProductController(service, view);
});
