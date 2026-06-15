import { ProductService } from "./Services/ProductService.js";
import { ProductView } from "./Views/ProductView.js";
import { ProductController } from "./Controllers/ProductController.js";

// Khởi tạo kiến trúc MVC
document.addEventListener("DOMContentLoaded", () => {
  const service = new ProductService();
  const view = new ProductView();
  const app = new ProductController(service, view);
});
