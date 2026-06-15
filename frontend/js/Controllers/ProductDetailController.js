export class ProductDetailController {
    service;
    view;
    productId = 0;
    constructor(service, view) {
        this.service = service;
        this.view = view;
        const urlParams = new URLSearchParams(window.location.search);
        this.productId = parseInt(urlParams.get("id") || "1");
        this.init();
        this.view.bindQuantityEvents();
        this.view.bindVariantSelection();
        this.view.bindAddToCart(this.handleAddToCart.bind(this));
    }
    async init() {
        const product = await this.service.getProductById(this.productId);
        if (product) {
            this.view.renderProduct(product);
        }
        else {
            this.view.renderError();
        }
    }
    handleAddToCart(qty) {
        const variants = this.view.getSelectedVariants();
        alert(`Đã thêm vào giỏ hàng: \n- Số lượng: ${qty} cái \n- Màu: ${variants.color} \n- Size: ${variants.size}`);
    }
}
