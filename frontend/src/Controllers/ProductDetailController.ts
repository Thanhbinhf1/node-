import { ProductDetailService } from "../Services/ProductDetailService.js";
import { ProductDetailView } from "../Views/ProductDetailView.js";

export class ProductDetailController {
  private productId: number = 0;

  constructor(
    private service: ProductDetailService,
    private view: ProductDetailView,
  ) {
    const urlParams = new URLSearchParams(window.location.search);
    this.productId = parseInt(urlParams.get("id") || "1");

    this.init();

    this.view.bindQuantityEvents();

    // Gọi hàm hiệu ứng click lúc vừa mở trang
    this.view.bindVariantSelection();

    this.view.bindAddToCart(this.handleAddToCart.bind(this));
  }

  async init() {
    const product = await this.service.getProductById(this.productId);

    if (product) {
      this.view.renderProduct(product);
    } else {
      this.view.renderError();
    }
  }

  handleAddToCart(qty: number) {
    // Nhờ View lấy giùm Màu và Size đang được chọn
    const variants = this.view.getSelectedVariants();

    // In ra màn hình để kiểm tra
    alert(
      `Đã thêm vào giỏ hàng: \n- Số lượng: ${qty} cái \n- Màu: ${variants.color} \n- Size: ${variants.size}`,
    );
  }
}
