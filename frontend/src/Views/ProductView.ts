import { Product } from "../Models/Product.js";

export class ProductView {
  private grid = document.getElementById("product-list-grid");
  private searchInput = document.getElementById(
    "search-input",
  ) as HTMLInputElement;
  private sortBtns = document.querySelectorAll(".sort-btn");
  private catCheckboxes = document.querySelectorAll('input[name="cat"]');
  private minPriceInput = document.getElementById(
    "min-price",
  ) as HTMLInputElement;
  private maxPriceInput = document.getElementById(
    "max-price",
  ) as HTMLInputElement;
  private btnApplyPrice = document.getElementById("btn-apply-price");

  // In dữ liệu ra màn hình
  renderProductList(products: Product[]) {
    if (!this.grid) return;
    if (products.length === 0) {
      this.grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 50px;">Không tìm thấy sản phẩm.</div>`;
      return;
    }

    this.grid.innerHTML = products
      .map(
        (p) => `
            <div class="product-card">
                <a href="product.html?id=${p.id}"><img src="${p.image}" class="product-img"></a>
                <div class="product-info">
                    <div class="product-cat">${p.category}</div>
                    <div class="product-name">${p.name}</div>
                    <div class="current-price">${p.price.toLocaleString("vi-VN")}đ</div>
                </div>
            </div>
        `,
      )
      .join("");
  }

  // Đẩy sự kiện về cho Controller xử lý
  bindFilterEvents(handler: (filters: any) => void) {
    const triggerHandler = () => {
      const keyword = this.searchInput?.value || "";
      const activeSort =
        document.querySelector(".sort-btn.active")?.getAttribute("data-sort") ||
        "new";
      const categories = Array.from(
        document.querySelectorAll('input[name="cat"]:checked'),
      ).map((cb) => (cb as HTMLInputElement).value);
      const minPrice = parseInt(this.minPriceInput?.value) || 0;
      const maxPrice = parseInt(this.maxPriceInput?.value) || 0;

      handler({ keyword, categories, minPrice, maxPrice, sortBy: activeSort });
    };

    // Gắn events
    this.searchInput?.addEventListener("input", triggerHandler);
    this.btnApplyPrice?.addEventListener("click", triggerHandler);
    this.catCheckboxes.forEach((cb) =>
      cb.addEventListener("change", triggerHandler),
    );

    this.sortBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        this.sortBtns.forEach((b) => b.classList.remove("active"));
        (e.target as HTMLElement).classList.add("active");
        triggerHandler();
      });
    });
  }
}
