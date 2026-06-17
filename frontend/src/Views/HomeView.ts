import { Banner } from "../Models/Banner.js";
import { Product } from "../Models/Product.js";

export class HomeView {
  private bannerContainer = document.getElementById("hero-slider");
  private hotProductsGrid = document.getElementById("recommend-grid");

  // 1. In Banner Quảng cáo
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

  // 2. In Lưới sản phẩm nổi bật từ MongoDB
  renderHotProducts(products: Product[]) {
    if (!this.hotProductsGrid) return;

    this.hotProductsGrid.innerHTML = products
      .map((p) => {
        // XỬ LÝ ĐƯỜNG DẪN ẢNH THÔNG MINH CHỐNG GÃY GIAO DIỆN
        let imgUrl =
          "https://dummyimage.com/300x300/cccccc/000000&text=No+Image";

        // Kiểm tra nếu có biến image đơn lẻ
        if (p.image) {
          imgUrl = p.image.startsWith("http")
            ? p.image
            : `http://localhost:3000${p.image}`;
        }
        // Nếu không có, check mảng images (số nhiều) bốc tấm đầu tiên lên xài
        else if ((p as any).images && (p as any).images.length > 0) {
          const firstImg = (p as any).images[0];
          imgUrl = firstImg.startsWith("http")
            ? firstImg
            : `http://localhost:3000${firstImg}`;
        }

        return `
            <div class="product-card">
                ${p.discount ? `<div class="discount-badge">-${p.discount}</div>` : ""}
                
                <a href="product.html?id=${p.id}">
                    <img src="${imgUrl}" class="product-img" alt="${p.name}">
                </a>
                
                <div class="product-info">
                    <div class="product-name">${p.name}</div>
                    
                    <div class="sold-progress-bg">
                        <div class="sold-progress-fill" style="width: 80%;"></div>
                        <div class="sold-text">Đã bán ${p.sold || 0}</div>
                    </div>

                    <div class="price-row">
                        <span class="current-price">${(p.price || 0).toLocaleString("vi-VN")}đ</span>
                        ${p.oldPrice ? `<span class="old-price">${p.oldPrice.toLocaleString("vi-VN")}đ</span>` : ""}
                    </div>
                    
                    <div class="action-row">
                        <div class="rating">
                            <i class="fa-solid fa-star"></i> ${p.rating || 5}
                        </div>
                        <div>
                            <button class="btn-wishlist" style="margin-right: 5px;"><i class="fa-regular fa-heart"></i></button>
                            <button class="btn-add-cart" onclick="alert('Đã thêm ${p.name} vào giỏ hàng!')"><i class="fa-solid fa-cart-plus"></i></button>
                        </div>
                    </div>
                </div>
            </div>
          `;
      })
      .join("");
  }
}
