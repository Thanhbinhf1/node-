export class CategoryController {
    service;
    view;
    constructor(service, view) {
        this.service = service;
        this.view = view;
        this.init();
    }
    async init() {
        const categories = await this.service.getAllCategories();
        this.view.render(categories);
    }
}
