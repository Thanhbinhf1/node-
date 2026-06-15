import { AdminCouponService } from "./Services/AdminCouponService.js";
import { AdminCouponView } from "./Views/AdminCouponView.js";
import { AdminCouponController } from "./Controllers/AdminCouponController.js";
document.addEventListener("DOMContentLoaded", () => {
    const service = new AdminCouponService();
    const view = new AdminCouponView();
    const app = new AdminCouponController(service, view);
});
