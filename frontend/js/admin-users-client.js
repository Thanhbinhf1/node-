import { AdminUserView } from "./Views/AdminUserView.js";
import { AdminUserService } from "./Services/AdminUserService.js";
import { AdminUserController } from "./Controllers/AdminUserController.js";
document.addEventListener("DOMContentLoaded", () => {
    const view = new AdminUserView();
    const service = new AdminUserService();
    const controller = new AdminUserController(view, service);
    controller.init();
});
