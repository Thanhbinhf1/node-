import { ProductDetail } from "../Models/ProductDetail.js";

export class ProductDetailView {
  // Chỗ hứng dữ liệu
  private titleEl = document.getElementById("detail-title");
  private priceEl = document.getElementById("detail-price");
  private oldPriceEl = document.getElementById("detail-old-price");
  private descEl = document.getElementById("detail-desc");
  private mainImgEl = document.getElementById(
    "detail-main-img",
  ) as HTMLImageElement;
  private galleryEl = document.getElementById("detail-gallery");

  // Nút bấm & Input
  private qtyInput = document.getElementById("detail-qty") as HTMLInputElement;
  private btnAddCart = document.getElementById("btn-add-to-cart");
  private btnBuyNow = document.getElementById("btn-buy-now");
  private btnPlus = document.getElementById("btn-qty-plus");
  private btnMinus = document.getElementById("btn-qty-minus");

  renderProduct(product: ProductDetail) {
    if (this.titleEl) this.titleEl.innerText = product.name;
    if (this.priceEl)
      this.priceEl.innerText = `${product.price.toLocaleString("vi-VN")}đ`;
    if (this.oldPriceEl)
      this.oldPriceEl.innerText = `${product.oldPrice.toLocaleString("vi-VN")}đ`;
    if (this.descEl) this.descEl.innerText = product.description;

    if (this.mainImgEl && product.images.length > 0) {
      this.mainImgEl.src = product.images[0];
    }

    // In các ảnh nhỏ (thumbnails)
    if (this.galleryEl) {
      this.galleryEl.innerHTML = product.images
        .map(
          (img, index) => `
                <img src="${img}" class="thumb-img" data-src="${img}" style="width: 80px; cursor: pointer; border: ${index === 0 ? "2px solid var(--primary)" : "1px solid #ccc"};">
            `,
        )
        .join("");

      // Bắt sự kiện bấm vào ảnh nhỏ thì đổi ảnh to
      const thumbs = this.galleryEl.querySelectorAll(".thumb-img");
      thumbs.forEach((thumb) => {
        thumb.addEventListener("click", (e) => {
          const target = e.target as HTMLImageElement;
          if (this.mainImgEl)
            this.mainImgEl.src = target.getAttribute("data-src") || "";

          // Reset viền
          thumbs.forEach(
            (t) => ((t as HTMLElement).style.border = "1px solid #ccc"),
          );
          target.style.border = "2px solid var(--primary)";
        });
      });
    }
  }

  renderError() {
    if (this.titleEl) this.titleEl.innerText = "Không tìm thấy sản phẩm!";
    // Ẩn các nút mua hàng...
  }

  bindQuantityEvents() {
    this.btnPlus?.addEventListener("click", () => {
      if (this.qtyInput)
        this.qtyInput.value = (parseInt(this.qtyInput.value) + 1).toString();
    });

    this.btnMinus?.addEventListener("click", () => {
      if (this.qtyInput && parseInt(this.qtyInput.value) > 1) {
        this.qtyInput.value = (parseInt(this.qtyInput.value) - 1).toString();
      }
    });
  }

  bindAddToCart(handler: (qty: number) => void) {
    this.btnAddCart?.addEventListener("click", () => {
      const qty = parseInt(this.qtyInput?.value || "1");
      handler(qty);
    });
  }
  // 1. Hàm tạo hiệu ứng click (đổi viền đỏ)
  bindVariantSelection() {
    const variantGroups = document.querySelectorAll(".variant-options");

    variantGroups.forEach((group) => {
      const buttons = group.querySelectorAll(".opt-btn");

      buttons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          // Xóa class 'active' của các nút khác trong cùng nhóm
          buttons.forEach((b) => b.classList.remove("active"));
          // Thêm class 'active' cho nút vừa bấm
          const target = e.currentTarget as HTMLElement;
          target.classList.add("active");
        });
      });
    });
  }

  // 2. Hàm đọc xem khách đang chọn Màu gì, Size gì
  getSelectedVariants() {
    const activeColor = document.querySelector(
      "#color-options .opt-btn.active",
    );
    const activeSize = document.querySelector("#size-options .opt-btn.active");

    return {
      color: activeColor ? activeColor.getAttribute("data-value") : "Đen",
      size: activeSize ? activeSize.getAttribute("data-value") : "Size S",
    };
  }
}
