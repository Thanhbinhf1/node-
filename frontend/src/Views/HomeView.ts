import { Banner } from "../Models/Banner.js";
import { Product } from "../Models/Product.js";

export class HomeView {
  private bannerContainer = document.getElementById("hero-slider");
  private hotProductsGrid = document.getElementById("recommend-grid");

  // 1. In Banner Quảng cáo (Đã khớp với class .slide)
  renderBanners(banners: Banner[]) {
    if (!this.bannerContainer) return;

    this.bannerContainer.innerHTML = banners
      .map(
        (banner, index) => `
            <div class="slide ${index === 0 ? "active" : ""}" style="background-image: url('${banner.imageUrl}')">
                <div class="slide-overlay"></div>
                <div class="slide-content">
                    <h2>${banner.altText}</h2>
                    <a href="${banner.link}" class="btn-buy">Xem Ngay</a>
                </div>
            </div>
        `,
      )
      .join("");
  }

  // 2. In Lưới sản phẩm nổi bật (Đã khớp với cấu trúc HTML sếp thiết kế)
  renderHotProducts(products: Product[]) {
    if (!this.hotProductsGrid) return;

    this.hotProductsGrid.innerHTML = products
      .map(
        (p) => `
            <div class="product-card">
                <div class="discount-badge">-${p.discount}</div>
                <a href="product.html?id=${p.id}"><img src="${p.image}" class="product-img"></a>
                <div class="product-info">
                    <div class="product-name">${p.name}</div>
                    
                    <div class="sold-progress-bg">
                        <div class="sold-progress-fill" style="width: 80%;"></div>
                        <div class="sold-text">Đã bán ${p.sold}</div>
                    </div>

                    <div class="price-row">
                        <span class="current-price">${p.price.toLocaleString("vi-VN")}đ</span>
                        <span class="old-price">${p.oldPrice.toLocaleString("vi-VN")}đ</span>
                    </div>
                    
                    <div class="action-row">
                        <div class="rating">
                            <i class="fa-solid fa-star"></i> ${p.rating}
                        </div>
                        <div>
                            <button class="btn-wishlist" style="margin-right: 5px;"><i class="fa-regular fa-heart"></i></button>
                            <button class="btn-add-cart" onclick="alert('Đã thêm ${p.name} vào giỏ hàng!')"><i class="fa-solid fa-cart-plus"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        `,
      )
      .join("");
  }
}
