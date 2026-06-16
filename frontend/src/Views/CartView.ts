import { CartItem } from "../Models/CartItem.js";

export class CartView {
  private cartBody = document.getElementById("cart-body");
  private cartTable = document.getElementById("cart-table");
  private emptyMsg = document.getElementById("empty-cart-msg");
  private subtotalEl = document.getElementById("summary-subtotal");
  private discountEl = document.getElementById("summary-discount");
  private totalEl = document.getElementById("summary-total");
  private couponInput = document.getElementById(
    "coupon-input",
  ) as HTMLInputElement;
  private couponMsg = document.getElementById("coupon-msg");

  // 1. In danh sách sản phẩm
  renderCartList(items: CartItem[]) {
    if (items.length === 0) {
      if (this.cartTable) this.cartTable.style.display = "none";
      if (this.emptyMsg) this.emptyMsg.style.display = "block";
      return;
    }

    if (this.cartTable) this.cartTable.style.display = "table";
    if (this.emptyMsg) this.emptyMsg.style.display = "none";

    if (this.cartBody) {
      this.cartBody.innerHTML = items
        .map(
          (item) => `
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
            `,
        )
        .join("");
    }
  }

  // 2. In bảng tổng tiền
  renderSummary(summary: {
    subtotal: number;
    discount: number;
    total: number;
  }) {
    if (this.subtotalEl)
      this.subtotalEl.innerText = `${summary.subtotal.toLocaleString("vi-VN")}đ`;
    if (this.discountEl)
      this.discountEl.innerText = `- ${summary.discount.toLocaleString("vi-VN")}đ`;
    if (this.totalEl)
      this.totalEl.innerText = `${summary.total.toLocaleString("vi-VN")}đ`;
  }

  // 3. Hiển thị thông báo mã giảm giá
  renderCouponMessage(success: boolean, msg: string) {
    if (!this.couponMsg) return;
    this.couponMsg.style.display = "block";
    this.couponMsg.style.color = success ? "#10b981" : "#ef4444";
    this.couponMsg.innerText = msg;
  }

  // 4. Bắt sự kiện ném cho Controller (Đã sửa id thành string)
  bindCartEvents(
    handleQty: (id: string, change: number) => void,
    handleRemove: (id: string) => void,
    handleCoupon: (code: string) => void,
  ) {
    // Lắng nghe click trên toàn bộ bảng giỏ hàng (Event Delegation)
    this.cartTable?.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;

      // Lấy id dạng chuỗi và kiểm tra xem có tồn tại không
      const id = target.getAttribute("data-id");
      if (!id) return;

      if (target.classList.contains("btn-plus")) {
        // Trực tiếp truyền id dạng chuỗi
        handleQty(id, 1);
      } else if (target.classList.contains("btn-minus")) {
        handleQty(id, -1);
      } else if (target.classList.contains("btn-delete")) {
        if (confirm("Xóa sản phẩm này khỏi giỏ hàng?")) {
          handleRemove(id);
        }
      }
    });

    // Nút áp dụng mã giảm giá
    document
      .getElementById("btn-apply-coupon")
      ?.addEventListener("click", () => {
        handleCoupon(this.couponInput?.value.trim().toUpperCase() || "");
      });
  }
}
