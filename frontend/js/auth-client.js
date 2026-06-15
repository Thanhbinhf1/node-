import { AuthService } from "./Services/AuthService.js";
import { AuthView } from "./Views/AuthView.js";
import { AuthController } from "./Controllers/AuthController.js";
document.addEventListener("DOMContentLoaded", () => {
    const service = new AuthService();
    const view = new AuthView();
    const app = new AuthController(service, view);
});
