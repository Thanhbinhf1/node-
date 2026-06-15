import { ProfileService } from "./Services/ProfileService.js";
import { ProfileView } from "./Views/ProfileView.js";
import { ProfileController } from "./Controllers/ProfileController.js";

document.addEventListener("DOMContentLoaded", () => {
  const service = new ProfileService();
  const view = new ProfileView();
  const app = new ProfileController(service, view);
});
