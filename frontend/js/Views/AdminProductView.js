export class AdminProductView {
    listView = document.getElementById("product-list-view");
    formView = document.getElementById("product-form-view");
    tableBody = document.getElementById("admin-product-table-body");
    btnShowAdd = document.getElementById("btn-show-add");
    btnBackList = document.getElementById("btn-back-list");
    btnSaveProduct = document.getElementById("btn-save-product");
    fileInput = document.getElementById("file-input");
    uploadZone = document.getElementById("upload-zone");
    previewContainer = document.getElementById("preview-container");
    currentEditId = null;
    constructor() {
        if (this.formView)
            this.formView.style.display = "none";
        this.initUIEvents();
    }
    initUIEvents() {
        this.btnShowAdd?.addEventListener("click", () => {
            this.clearForm();
            if (this.listView)
                this.listView.style.display = "none";
            if (this.formView)
                this.formView.style.display = "block";
        });
        this.btnBackList?.addEventListener("click", () => {
            if (this.formView)
                this.formView.style.display = "none";
            if (this.listView)
                this.listView.style.display = "block";
        });
        this.uploadZone?.addEventListener("click", () => this.fileInput?.click());
        this.fileInput?.addEventListener("change", (e) => {
            const input = e.target;
            if (input.files && this.previewContainer) {
                this.previewContainer.innerHTML = "";
                Array.from(input.files).forEach((file) => {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        const img = document.createElement("img");
                        img.src = event.target?.result;
                        img.className = "img-preview";
                        this.previewContainer?.appendChild(img);
                    };
                    reader.readAsDataURL(file);
                });
            }
        });
    }
    getFormData() {
        const name = document.getElementById("form-prod-name")?.value.trim();
        const category = document.getElementById("form-prod-category")?.value;
        const price = document.getElementById("form-prod-price")?.value;
        const sku = document.getElementById("form-prod-sku")?.value.trim();
        const status = document.getElementById("form-prod-status")?.value;
        const stock = document.getElementById("form-prod-stock")?.value;
        const discount = document.getElementById("form-prod-discount")?.value;
        const formData = new FormData();
        formData.append("name", name || "");
        formData.append("category", category || "Workspace");
        formData.append("price", price || "0");
        formData.append("sku", sku || "");
        formData.append("status", status || "Active");
        formData.append("stock", stock || "0");
        formData.append("discount", discount || "");
        if (this.fileInput && this.fileInput.files) {
            Array.from(this.fileInput.files).forEach((file) => {
                formData.append("images", file);
            });
        }
        return formData;
    }
    fillForm(productData, id) {
        this.currentEditId = id;
        document.getElementById("form-prod-name").value =
            productData.name || "";
        document.getElementById("form-prod-category").value =
            productData.category || "Workspace";
        document.getElementById("form-prod-price").value =
            productData.price || 0;
        document.getElementById("form-prod-sku").value =
            productData.sku || "";
        const statusSelect = document.getElementById("form-prod-status");
        if (statusSelect) {
            statusSelect.value =
                productData.status === "Active" ? "Active" : "Hidden";
        }
        if (this.previewContainer &&
            productData.images &&
            productData.images.length > 0) {
            this.previewContainer.innerHTML = "";
            productData.images.forEach((imgUrl) => {
                const img = document.createElement("img");
                img.src = `http://localhost:3000${imgUrl}`;
                img.className = "img-preview";
                this.previewContainer?.appendChild(img);
            });
        }
        const formTitle = document.getElementById("form-title");
        if (formTitle)
            formTitle.innerText = "Sửa Sản phẩm";
        if (this.btnSaveProduct)
            this.btnSaveProduct.innerHTML =
                '<i class="fa-solid fa-floppy-disk"></i> Cập nhật Sản phẩm';
        if (this.listView)
            this.listView.style.display = "none";
        if (this.formView)
            this.formView.style.display = "block";
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
            const el = document.getElementById(id);
            if (el)
                el.value = "";
        });
        if (this.previewContainer)
            this.previewContainer.innerHTML = "";
        if (this.fileInput)
            this.fileInput.value = "";
        const formTitle = document.getElementById("form-title");
        if (formTitle)
            formTitle.innerText = "Thêm Sản phẩm mới";
        if (this.btnSaveProduct)
            this.btnSaveProduct.innerHTML =
                '<i class="fa-solid fa-floppy-disk"></i> Lưu Sản phẩm';
    }
    renderTable(products) {
        if (!this.tableBody)
            return;
        this.tableBody.innerHTML = products
            .map((p) => {
            const currentStatus = p.status;
            let displayStatus = "Đang bán";
            let statusColor = "#10b981";
            if (currentStatus === "Hidden" ||
                currentStatus === "Đã ẩn" ||
                currentStatus === "Ẩn (Bản nháp)") {
                displayStatus = "Tạm ẩn";
                statusColor = "#f59e0b";
            }
            else if (p.stock <= 0 || currentStatus === "Hết hàng") {
                displayStatus = "Hết hàng";
                statusColor = "#ef4444";
            }
            else if (currentStatus === "Active" || currentStatus === "Đang bán") {
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
    bindActionEvents(deleteHandler, editHandler) {
        this.tableBody?.addEventListener("click", (e) => {
            const target = e.target;
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
    bindSaveEvent(handler) {
        this.btnSaveProduct?.addEventListener("click", () => handler());
    }
}
