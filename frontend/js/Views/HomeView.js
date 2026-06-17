export class HomeView {
    bannerContainer = document.getElementById("hero-slider");
    hotProductsGrid = document.getElementById("recommend-grid");
    renderBanners(banners) {
        if (!this.bannerContainer)
            return;
        this.bannerContainer.innerHTML = banners
            .map((banner, index) => `
            <div class="slide ${index === 0 ? "active" : ""}" style="background-image: url('${banner.imageUrl}')">
                <div class="slide-overlay"></div>
                <div class="slide-content">
                    <h2>${banner.altText}</h2>
                    <a href="${banner.link}" class="btn-buy">Xem Ngay</a>
                </div>
            </div>
        `)
            .join("");
    }
    renderHotProducts(products) {
        if (!this.hotProductsGrid)
            return;
        this.hotProductsGrid.innerHTML = products
            .map((p) => {
            let imgUrl = "https://dummyimage.com/300x300/cccccc/000000&text=No+Image";
            if (p.image) {
                imgUrl = p.image.startsWith("http")
                    ? p.image
                    : `http://localhost:3000${p.image}`;
            }
            else if (p.images && p.images.length > 0) {
                const firstImg = p.images[0];
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
