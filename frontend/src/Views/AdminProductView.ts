import { AdminProduct } from "../Models/AdminProduct.js";

export class AdminProductView {
  private listView = document.getElementById("product-list-view");
  private formView = document.getElementById("product-form-view");
  private tableBody = document.getElementById("admin-product-table-body");

  private btnShowAdd = document.getElementById("btn-show-add");
  private btnBackList = document.getElementById("btn-back-list");
  private btnSaveProduct = document.getElementById("btn-save-product");

  private fileInput = document.getElementById("file-input") as HTMLInputElement;
  private uploadZone = document.getElementById("upload-zone");
  private previewContainer = document.getElementById("preview-container");

  public currentEditId: string | null = null;

  constructor() {
    // Ép ẩn Form mặc định khi mới vào web
    if (this.formView) this.formView.style.display = "none";
    this.initUIEvents();
  }

  private initUIEvents() {
    this.btnShowAdd?.addEventListener("click", () => {
      this.clearForm();
      if (this.listView) this.listView.style.display = "none";
      if (this.formView) this.formView.style.display = "block";
    });

    this.btnBackList?.addEventListener("click", () => {
      if (this.formView) this.formView.style.display = "none";
      if (this.listView) this.listView.style.display = "block";
    });

    this.uploadZone?.addEventListener("click", () => this.fileInput?.click());

    this.fileInput?.addEventListener("change", (e) => {
      const input = e.target as HTMLInputElement;
      if (input.files && this.previewContainer) {
        this.previewContainer.innerHTML = "";
        Array.from(input.files).forEach((file) => {
          const reader = new FileReader();
          reader.onload = (event) => {
            const img = document.createElement("img");
            img.src = event.target?.result as string;
            img.className = "img-preview";
            this.previewContainer?.appendChild(img);
          };
          reader.readAsDataURL(file);
        });
      }
    });
  }

  getFormData(): FormData {
    const name = (
      document.getElementById("form-prod-name") as HTMLInputElement
    )?.value.trim();
    const category = (
      document.getElementById("form-prod-category") as HTMLSelectElement
    )?.value;
    const price = (
      document.getElementById("form-prod-price") as HTMLInputElement
    )?.value;
    const sku = (
      document.getElementById("form-prod-sku") as HTMLInputElement
    )?.value.trim();
    const status = (
      document.getElementById("form-prod-status") as HTMLSelectElement
    )?.value;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category || "Workspace");
    formData.append("price", price || "0");
    formData.append("sku", sku);
    formData.append("status", status || "Active");

    if (this.fileInput && this.fileInput.files) {
      Array.from(this.fileInput.files).forEach((file) => {
        formData.append("images", file);
      });
    }

    return formData;
  }

  fillForm(productData: any, id: string) {
    this.currentEditId = id;

    (document.getElementById("form-prod-name") as HTMLInputElement).value =
      productData.name || "";
    (document.getElementById("form-prod-category") as HTMLSelectElement).value =
      productData.category || "Workspace";
    (document.getElementById("form-prod-price") as HTMLInputElement).value =
      productData.price || 0;
    (document.getElementById("form-prod-sku") as HTMLInputElement).value =
      productData.sku || "";

    const statusSelect = document.getElementById(
      "form-prod-status",
    ) as HTMLSelectElement;
    if (statusSelect) {
      statusSelect.value =
        productData.status === "Active" ? "Active" : "Hidden";
    }

    if (
      this.previewContainer &&
      productData.images &&
      productData.images.length > 0
    ) {
      this.previewContainer.innerHTML = "";
      productData.images.forEach((imgUrl: string) => {
        const img = document.createElement("img");
        img.src = `http://localhost:3000${imgUrl}`;
        img.className = "img-preview";
        this.previewContainer?.appendChild(img);
      });
    }

    // Việt hóa tiêu đề và nút
    const formTitle = document.getElementById("form-title");
    if (formTitle) formTitle.innerText = "Sửa Sản phẩm";
    if (this.btnSaveProduct)
      this.btnSaveProduct.innerHTML =
        '<i class="fa-solid fa-floppy-disk"></i> Cập nhật Sản phẩm';

    if (this.listView) this.listView.style.display = "none";
    if (this.formView) this.formView.style.display = "block";
  }

  clearForm() {
    this.currentEditId = null;
    const inputs = [
      "form-prod-name",
      "form-prod-price",
      "form-prod-sku",
      "form-prod-desc",
    ];
    inputs.forEach((id) => {
      const el = document.getElementById(id) as
        | HTMLInputElement
        | HTMLTextAreaElement;
      if (el) el.value = "";
    });
    if (this.previewContainer) this.previewContainer.innerHTML = "";
    if (this.fileInput) this.fileInput.value = "";

    // Việt hóa tiêu đề và nút
    const formTitle = document.getElementById("form-title");
    if (formTitle) formTitle.innerText = "Thêm Sản phẩm mới";
    if (this.btnSaveProduct)
      this.btnSaveProduct.innerHTML =
        '<i class="fa-solid fa-floppy-disk"></i> Lưu Sản phẩm';
  }

  renderTable(products: AdminProduct[]) {
    if (!this.tableBody) return;
    this.tableBody.innerHTML = products
      .map((p) => {
        // ĐÃ FIX: Ép kiểu sang string để lách luật TypeScript
        const currentStatus: string = p.status;

        let displayStatus = "Đang bán";
        let statusColor = "#10b981"; // Xanh lá

        if (
          currentStatus === "Hidden" ||
          currentStatus === "Đã ẩn" ||
          currentStatus === "Ẩn (Bản nháp)"
        ) {
          displayStatus = "Tạm ẩn";
          statusColor = "#f59e0b"; // Vàng cam
        } else if (p.stock <= 0 || currentStatus === "Hết hàng") {
          displayStatus = "Hết hàng";
          statusColor = "#ef4444"; // Đỏ
        } else if (currentStatus === "Active" || currentStatus === "Đang bán") {
          displayStatus = "Đang bán";
        }

        return `
        <tr>
          <td>
             <div style="display: flex; align-items: center; gap: 15px;">
                <img src="${p.images?.[0] ? "http://localhost:3000" + p.images[0] : "https://via.placeholder.com/50"}" style="width: 40px; height: 40px; border-radius: 8px; object-fit: cover;">
                <strong style="color: var(--text-main);">${p.name}</strong>
             </div>
          </td>
          <td>${p.category}</td>
         <td style="font-weight: 600;">${(p.price || 0).toLocaleString("vi-VN")}đ</td>
          <td>${p.stock || 0}</td>
          <td><span style="color: ${statusColor}; font-weight: 600; background: ${statusColor}15; padding: 4px 10px; border-radius: 20px; font-size: 12px;">${displayStatus}</span></td>
          <td>
            <button class="btn-edit" data-id="${p.id}" style="cursor:pointer; color:#3b82f6; border:none; background:none; margin-right:10px; font-size:16px;"><i class="fa-solid fa-pen-to-square"></i></button>
            <button class="btn-delete" data-id="${p.id}" style="cursor:pointer; color:#ef4444; border:none; background:none; font-size:16px;"><i class="fa-solid fa-trash"></i></button>
          </td>
        </tr>
      `;
      })
      .join("");
  }

  bindActionEvents(
    deleteHandler: (id: string) => void,
    editHandler: (id: string) => void,
  ) {
    this.tableBody?.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;

      const btnDelete = target.closest(".btn-delete");
      if (btnDelete) {
        const id = btnDelete.getAttribute("data-id") || "";
        if (confirm(`Bạn có chắc chắn muốn xóa sản phẩm này vĩnh viễn?`))
          deleteHandler(id);
      }

      const btnEdit = target.closest(".btn-edit");
      if (btnEdit) {
        const id = btnEdit.getAttribute("data-id") || "";
        editHandler(id);
      }
    });
  }

  bindSaveEvent(handler: () => void) {
    this.btnSaveProduct?.addEventListener("click", () => handler());
  }
}
