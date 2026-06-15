export class ProductController {
    service;
    view;
    constructor(service, view) {
        this.service = service;
        this.view = view;
        this.init();
        this.view.bindFilterEvents(this.handleFilterUpdate.bind(this));
    }
    async init() {
        const products = await this.service.getAllProducts();
        this.view.renderProductList(products);
    }
    async handleFilterUpdate(filters) {
        const filteredProducts = await this.service.filterProducts(filters.keyword, filters.categories, filters.minPrice, filters.maxPrice, filters.sortBy);
        this.view.renderProductList(filteredProducts);
    }
}
