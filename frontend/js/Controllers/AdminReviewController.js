export class AdminReviewController {
    service;
    view;
    constructor(service, view) {
        this.service = service;
        this.view = view;
        this.init();
        this.view.bindActionEvents(this.handleApprove.bind(this), this.handleHide.bind(this), this.handleDelete.bind(this));
    }
    async init() {
        const reviews = await this.service.getAllReviews();
        this.view.renderTable(reviews);
    }
    async handleApprove(id) {
        const success = await this.service.updateReviewStatus(id, "Approved");
        if (success)
            this.init();
    }
    async handleHide(id) {
        const success = await this.service.updateReviewStatus(id, "Hidden");
        if (success)
            this.init();
    }
    async handleDelete(id) {
        const success = await this.service.deleteReview(id);
        if (success)
            this.init();
    }
}
