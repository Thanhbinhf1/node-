import { ProductDetailService } from "../Services/ProductDetailService.js";
import { ProductDetailView } from "../Views/ProductDetailView.js";

export class ProductDetailController {
  // 1. Đổi kiểu dữ liệu sang chuỗi (string) hoặc null
  private productId: string | null = null;

  constructor(
    private service: ProductDetailService,
    private view: ProductDetailView,
  ) {
    const urlParams = new URLSearchParams(window.location.search);
    // 2. Không dùng parseInt nữa, lấy trực tiếp chuỗi ID trên thanh URL
    this.productId = urlParams.get("id");

    this.init();

    this.view.bindQuantityEvents();

    // Gọi hàm hiệu ứng click lúc vừa mở trang
    this.view.bindVariantSelection();

    this.view.bindAddToCart(this.handleAddToCart.bind(this));
  }

  async init() {
    // Nếu không có ID trên URL thì báo lỗi luôn
    if (!this.productId) {
      this.view.renderError();
      return;
    }

    // 3. Phải dùng this.productId
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
