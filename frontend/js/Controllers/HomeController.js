export class HomeController {
    service;
    view;
    constructor(service, view) {
        this.service = service;
        this.view = view;
        this.init();
    }
    async init() {
        const [banners, hotProducts] = await Promise.all([
            this.service.getBanners(),
            this.service.getHotProducts(),
        ]);
        this.view.renderBanners(banners);
        this.view.renderHotProducts(hotProducts);
    }
}
