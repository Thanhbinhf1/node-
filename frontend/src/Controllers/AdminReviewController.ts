import { AdminReviewService } from "../Services/AdminReviewService.js";
import { AdminReviewView } from "../Views/AdminReviewView.js";

export class AdminReviewController {
  constructor(
    private service: AdminReviewService,
    private view: AdminReviewView,
  ) {
    this.init();
    this.view.bindActionEvents(
      this.handleApprove.bind(this),
      this.handleHide.bind(this),
      this.handleDelete.bind(this),
    );
  }

  async init() {
    const reviews = await this.service.getAllReviews();
    this.view.renderTable(reviews);
  }

  async handleApprove(id: string) {
    // Sửa number thành string
    const success = await this.service.updateReviewStatus(id, "Approved");
    if (success) this.init();
  }

  async handleHide(id: string) {
    // Sửa number thành string
    const success = await this.service.updateReviewStatus(id, "Hidden");
    if (success) this.init();
  }

  async handleDelete(id: string) {
    // Sửa number thành string
    const success = await this.service.deleteReview(id);
    if (success) this.init();
  }
}
