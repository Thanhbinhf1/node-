import { HomeService } from "./Services/HomeService.js";
import { HomeView } from "./Views/HomeView.js";
import { HomeController } from "./Controllers/HomeController.js";

// Không cần bọc DOMContentLoaded nữa! Kích hoạt thẳng luôn!
const service = new HomeService();
const view = new HomeView();
const app = new HomeController(service, view);
