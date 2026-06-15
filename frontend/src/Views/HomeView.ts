import { Banner } from "../Models/Banner.js";
import { Product } from "../Models/Product.js";

export class HomeView {
  private bannerContainer = document.getElementById("hero-slider");
  private hotProductsGrid = document.getElementById("recommend-grid");

  // 1. In Banner Quảng cáo
  renderBanners(banners: Banner[]) {
    if (!this.bannerContainer) return;

    // Code này giả định ông xài CSS grid hoặc flexbox trượt ngang cho banner
    this.bannerContainer.innerHTML = banners
      .map(
        (banner) => `
            <div class="banner-slide">
                <a href="${banner.link}">
                    <img src="${banner.imageUrl}" alt="${banner.altText}" class="banner-img" style="width: 100%; border-radius: 10px;">
                </a>
            </div>
        `,
      )
      .join("");
  }

  // 2. In Lưới sản phẩm nổi bật
  renderHotProducts(products: Product[]) {
    if (!this.hotProductsGrid) return;

    this.hotProductsGrid.innerHTML = products
      .map(
        (p) => `
            <div class="product-card">
                <div class="discount-badge">-${p.discount}</div>
                <a href="product.html?id=${p.id}"><img src="${p.image}" class="product-img"></a>
                <div class="product-info">
                    <div class="product-cat">${p.category}</div>
                    <div class="product-name">${p.name}</div>
                    <div class="price-wrap">
                        <span class="current-price">${p.price.toLocaleString("vi-VN")}đ</span>
                        <span class="old-price">${p.oldPrice.toLocaleString("vi-VN")}đ</span>
                    </div>
                    <div class="rating-sold">
                        <span class="rating">⭐ ${p.rating}</span>
                        <span class="sold">Đã bán ${p.sold}</span>
                    </div>
                    <button class="btn-add-cart" onclick="alert('Thêm ${p.name} vào giỏ!')">Thêm vào giỏ</button>
                </div>
            </div>
        `,
      )
      .join("");
  }
}
