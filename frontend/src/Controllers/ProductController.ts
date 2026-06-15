import { ProductService } from "../Services/ProductService.js";
import { ProductView } from "../Views/ProductView.js";

export class ProductController {
  constructor(
    private service: ProductService,
    private view: ProductView,
  ) {
    // Khởi tạo hiển thị lần đầu
    this.init();

    // Nhận sự kiện từ View và xử lý
    this.view.bindFilterEvents(this.handleFilterUpdate.bind(this));
  }

  async init() {
    const products = await this.service.getAllProducts();
    this.view.renderProductList(products);
  }

  async handleFilterUpdate(filters: any) {
    // Nhờ Service lọc data dựa trên bộ lọc từ View
    const filteredProducts = await this.service.filterProducts(
      filters.keyword,
      filters.categories,
      filters.minPrice,
      filters.maxPrice,
      filters.sortBy,
    );
    // Đưa data đã lọc cho View vẽ ra
    this.view.renderProductList(filteredProducts);
  }
}
