import { HomeService } from "../Services/HomeService.js";
import { HomeView } from "../Views/HomeView.js";

export class HomeController {
  constructor(
    private service: HomeService,
    private view: HomeView,
  ) {
    this.init();
  }

  async init() {
    // Có thể dùng Promise.all để gọi nhiều API cùng lúc cho nhanh
    const [banners, hotProducts] = await Promise.all([
      this.service.getBanners(),
      this.service.getHotProducts(),
    ]);

    this.view.renderBanners(banners);
    this.view.renderHotProducts(hotProducts);
  }
}
