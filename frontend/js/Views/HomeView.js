export class HomeView {
    bannerContainer = document.getElementById("hero-slider");
    hotProductsGrid = document.getElementById("recommend-grid");
    renderBanners(banners) {
        if (!this.bannerContainer)
            return;
        this.bannerContainer.innerHTML = banners
            .map((banner) => `
            <div class="banner-slide">
                <a href="${banner.link}">
                    <img src="${banner.imageUrl}" alt="${banner.altText}" class="banner-img" style="width: 100%; border-radius: 10px;">
                </a>
            </div>
        `)
            .join("");
    }
    renderHotProducts(products) {
        if (!this.hotProductsGrid)
            return;
        this.hotProductsGrid.innerHTML = products
            .map((p) => `
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
        `)
            .join("");
    }
}
