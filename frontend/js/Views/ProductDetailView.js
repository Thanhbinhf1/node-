export class ProductDetailView {
    titleEl = document.getElementById("detail-title");
    priceEl = document.getElementById("detail-price");
    oldPriceEl = document.getElementById("detail-old-price");
    descEl = document.getElementById("detail-desc");
    mainImgEl = document.getElementById("detail-main-img");
    galleryEl = document.getElementById("detail-gallery");
    qtyInput = document.getElementById("detail-qty");
    btnAddCart = document.getElementById("btn-add-to-cart");
    btnBuyNow = document.getElementById("btn-buy-now");
    btnPlus = document.getElementById("btn-qty-plus");
    btnMinus = document.getElementById("btn-qty-minus");
    renderProduct(product) {
        if (this.titleEl)
            this.titleEl.innerText = product.name;
        if (this.priceEl)
            this.priceEl.innerText = `${product.price.toLocaleString("vi-VN")}đ`;
        if (this.oldPriceEl)
            this.oldPriceEl.innerText = `${product.oldPrice.toLocaleString("vi-VN")}đ`;
        if (this.descEl)
            this.descEl.innerText = product.description;
        if (this.mainImgEl && product.images.length > 0) {
            this.mainImgEl.src = product.images[0];
        }
        if (this.galleryEl) {
            this.galleryEl.innerHTML = product.images
                .map((img, index) => `
                <img src="${img}" class="thumb-img" data-src="${img}" style="width: 80px; cursor: pointer; border: ${index === 0 ? "2px solid var(--primary)" : "1px solid #ccc"};">
            `)
                .join("");
            const thumbs = this.galleryEl.querySelectorAll(".thumb-img");
            thumbs.forEach((thumb) => {
                thumb.addEventListener("click", (e) => {
                    const target = e.target;
                    if (this.mainImgEl)
                        this.mainImgEl.src = target.getAttribute("data-src") || "";
                    thumbs.forEach((t) => (t.style.border = "1px solid #ccc"));
                    target.style.border = "2px solid var(--primary)";
                });
            });
        }
    }
    renderError() {
        if (this.titleEl)
            this.titleEl.innerText = "Không tìm thấy sản phẩm!";
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
    bindAddToCart(handler) {
        this.btnAddCart?.addEventListener("click", () => {
            const qty = parseInt(this.qtyInput?.value || "1");
            handler(qty);
        });
    }
    bindVariantSelection() {
        const variantGroups = document.querySelectorAll(".variant-options");
        variantGroups.forEach((group) => {
            const buttons = group.querySelectorAll(".opt-btn");
            buttons.forEach((btn) => {
                btn.addEventListener("click", (e) => {
                    buttons.forEach((b) => b.classList.remove("active"));
                    const target = e.currentTarget;
                    target.classList.add("active");
                });
            });
        });
    }
    getSelectedVariants() {
        const activeColor = document.querySelector("#color-options .opt-btn.active");
        const activeSize = document.querySelector("#size-options .opt-btn.active");
        return {
            color: activeColor ? activeColor.getAttribute("data-value") : "Đen",
            size: activeSize ? activeSize.getAttribute("data-value") : "Size S",
        };
    }
}
