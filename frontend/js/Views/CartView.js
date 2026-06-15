export class CartView {
    cartBody = document.getElementById("cart-body");
    cartTable = document.getElementById("cart-table");
    emptyMsg = document.getElementById("empty-cart-msg");
    subtotalEl = document.getElementById("summary-subtotal");
    discountEl = document.getElementById("summary-discount");
    totalEl = document.getElementById("summary-total");
    couponInput = document.getElementById("coupon-input");
    couponMsg = document.getElementById("coupon-msg");
    renderCartList(items) {
        if (items.length === 0) {
            if (this.cartTable)
                this.cartTable.style.display = "none";
            if (this.emptyMsg)
                this.emptyMsg.style.display = "block";
            return;
        }
        if (this.cartTable)
            this.cartTable.style.display = "table";
        if (this.emptyMsg)
            this.emptyMsg.style.display = "none";
        if (this.cartBody) {
            this.cartBody.innerHTML = items
                .map((item) => `
                <tr>
                    <td>
                        <div class="product-cell">
                            <img src="${item.img}" class="product-img">
                            <div>
                                <div class="product-name">${item.name}</div>
                                <div class="product-variant">${item.variant}</div>
                            </div>
                        </div>
                    </td>
                    <td align="center">${item.price.toLocaleString("vi-VN")}đ</td>
                    <td align="center">
                        <div class="qty-control">
                            <button class="qty-btn btn-minus" data-id="${item.id}">-</button>
                            <input type="number" class="qty-input" value="${item.qty}" readonly>
                            <button class="qty-btn btn-plus" data-id="${item.id}">+</button>
                        </div>
                    </td>
                    <td align="center" style="color: var(--primary); font-weight: bold;">
                        ${(item.price * item.qty).toLocaleString("vi-VN")}đ
                    </td>
                    <td align="center">
                        <button class="btn-delete" data-id="${item.id}">Xóa</button>
                    </td>
                </tr>
            `)
                .join("");
        }
    }
    renderSummary(summary) {
        if (this.subtotalEl)
            this.subtotalEl.innerText = `${summary.subtotal.toLocaleString("vi-VN")}đ`;
        if (this.discountEl)
            this.discountEl.innerText = `- ${summary.discount.toLocaleString("vi-VN")}đ`;
        if (this.totalEl)
            this.totalEl.innerText = `${summary.total.toLocaleString("vi-VN")}đ`;
    }
    renderCouponMessage(success, msg) {
        if (!this.couponMsg)
            return;
        this.couponMsg.style.display = "block";
        this.couponMsg.style.color = success ? "#10b981" : "#ef4444";
        this.couponMsg.innerText = msg;
    }
    bindCartEvents(handleQty, handleRemove, handleCoupon) {
        this.cartTable?.addEventListener("click", (e) => {
            const target = e.target;
            if (target.classList.contains("btn-plus")) {
                handleQty(Number(target.getAttribute("data-id")), 1);
            }
            else if (target.classList.contains("btn-minus")) {
                handleQty(Number(target.getAttribute("data-id")), -1);
            }
            else if (target.classList.contains("btn-delete")) {
                if (confirm("Xóa sản phẩm này khỏi giỏ hàng?")) {
                    handleRemove(Number(target.getAttribute("data-id")));
                }
            }
        });
        document
            .getElementById("btn-apply-coupon")
            ?.addEventListener("click", () => {
            handleCoupon(this.couponInput?.value.trim().toUpperCase() || "");
        });
    }
}
