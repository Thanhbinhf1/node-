import { DashboardService } from "./Services/DashboardService.js";
import { DashboardView } from "./Views/DashboardView.js";
import { DashboardController } from "./Controllers/DashboardController.js";

document.addEventListener("DOMContentLoaded", () => {
  const service = new DashboardService();
  const view = new DashboardView();
  const app = new DashboardController(service, view);
});
