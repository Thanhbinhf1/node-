export class CheckoutView {
    itemsContainer = document.getElementById("checkout-items");
    subtotalEl = document.getElementById("checkout-subtotal");
    discountEl = document.getElementById("checkout-discount");
    shippingEl = document.getElementById("checkout-shipping");
    totalEl = document.getElementById("checkout-total");
    btnSubmit = document.getElementById("btn-submit-order");
    nameInput = document.getElementById("cus-name");
    phoneInput = document.getElementById("cus-phone");
    emailInput = document.getElementById("cus-email");
    addressInput = document.getElementById("cus-address");
    renderItems(items) {
        if (!this.itemsContainer)
            return;
        this.itemsContainer.innerHTML = items
            .map((item) => `
            <div class="order-item">
                <div class="item-img-wrap">
                    <img src="${item.img}" class="item-img">
                    <div class="item-qty">${item.qty}</div>
                </div>
                <div class="item-info">
                    <div class="item-name">${item.name}</div>
                    <div class="item-variant">${item.variant}</div>
                </div>
                <div class="item-price">${(item.price * item.qty).toLocaleString("vi-VN")}đ</div>
            </div>
        `)
            .join("");
    }
    renderTotals(totals) {
        if (this.subtotalEl)
            this.subtotalEl.innerText = `${totals.subtotal.toLocaleString("vi-VN")}đ`;
        if (this.discountEl)
            this.discountEl.innerText = `- ${totals.discount.toLocaleString("vi-VN")}đ`;
        if (this.shippingEl)
            this.shippingEl.innerText = `${totals.shipping.toLocaleString("vi-VN")}đ`;
        if (this.totalEl)
            this.totalEl.innerText = `${totals.finalTotal.toLocaleString("vi-VN")}đ`;
    }
    bindPaymentSelection() {
        const paymentCards = document.querySelectorAll(".payment-card");
        paymentCards.forEach((card) => {
            card.addEventListener("click", (e) => {
                paymentCards.forEach((c) => c.classList.remove("active"));
                e.currentTarget.classList.add("active");
            });
        });
    }
    bindSubmitOrder(handler) {
        this.btnSubmit?.addEventListener("click", () => {
            const activePaymentCard = document.querySelector(".payment-card.active");
            const paymentMethod = activePaymentCard
                ? activePaymentCard.getAttribute("data-method") || "cod"
                : "cod";
            const formData = {
                customerName: this.nameInput?.value.trim(),
                phone: this.phoneInput?.value.trim(),
                email: this.emailInput?.value.trim(),
                address: this.addressInput?.value.trim(),
                note: "",
                paymentMethod: paymentMethod,
            };
            handler(formData);
        });
    }
    showLoading(isLoading) {
        if (!this.btnSubmit)
            return;
        if (isLoading) {
            this.btnSubmit.innerText = "ĐANG XỬ LÝ...";
            this.btnSubmit.disabled = true;
            this.btnSubmit.style.opacity = "0.7";
        }
        else {
            this.btnSubmit.innerText = "ĐẶT HÀNG";
            this.btnSubmit.disabled = false;
            this.btnSubmit.style.opacity = "1";
        }
    }
}
