import { AdminCategoryService } from "./Services/AdminCategoryService.js";
import { AdminCategoryView } from "./Views/AdminCategoryView.js";
import { AdminCategoryController } from "./Controllers/AdminCategoryController.js";
document.addEventListener("DOMContentLoaded", () => {
    const service = new AdminCategoryService();
    const view = new AdminCategoryView();
    const app = new AdminCategoryController(service, view);
});
