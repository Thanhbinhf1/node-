import { AdminReviewService } from "./Services/AdminReviewService.js";
import { AdminReviewView } from "./Views/AdminReviewView.js";
import { AdminReviewController } from "./Controllers/AdminReviewController.js";
document.addEventListener("DOMContentLoaded", () => {
    const service = new AdminReviewService();
    const view = new AdminReviewView();
    const app = new AdminReviewController(service, view);
});
