export class AdminCategoryView {
    listView = document.getElementById("category-list-view");
    formView = document.getElementById("category-form-view");
    tableBody = document.getElementById("category-table-body");
    btnShowAdd = document.getElementById("btn-show-add");
    btnBackList = document.getElementById("btn-back-list");
    btnSave = document.getElementById("btn-save-category");
    uploadZone = document.getElementById("upload-zone");
    fileInput = document.getElementById("file-input");
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
        const name = document.getElementById("cat-name")?.value.trim();
        const slug = document.getElementById("cat-slug")?.value.trim();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("slug", slug);
        if (this.fileInput &&
            this.fileInput.files &&
            this.fileInput.files.length > 0) {
            formData.append("image", this.fileInput.files[0]);
        }
        return formData;
    }
    fillForm(data, id) {
        this.currentEditId = id;
        document.getElementById("cat-name").value =
            data.name || "";
        document.getElementById("cat-slug").value =
            data.slug || "";
        if (this.previewContainer && data.image) {
            this.previewContainer.innerHTML = `<img src="http://localhost:3000${data.image}" class="img-preview">`;
        }
        if (this.btnSave)
            this.btnSave.innerText = "Cập nhật Danh mục";
        if (this.listView)
            this.listView.style.display = "none";
        if (this.formView)
            this.formView.style.display = "block";
        document.getElementById("form-title").innerText = "Sửa Danh mục";
    }
    clearForm() {
        this.currentEditId = null;
        document.getElementById("cat-name").value = "";
        document.getElementById("cat-slug").value = "";
        if (this.previewContainer)
            this.previewContainer.innerHTML = "";
        if (this.fileInput)
            this.fileInput.value = "";
        if (this.btnSave)
            this.btnSave.innerText = "Lưu Danh mục";
        const formTitle = document.getElementById("form-title");
        if (formTitle)
            formTitle.innerText = "Thêm Danh mục mới";
    }
    renderTable(categories) {
        if (!this.tableBody)
            return;
        this.tableBody.innerHTML = categories
            .map((c) => {
            const imgUrl = c.image
                ? `http://localhost:3000${c.image}`
                : "https://via.placeholder.com/50";
            const slugText = c.slug ? c.slug : "---";
            const parentText = !c.parent || c.parent === "none" ? "Không có" : c.parent;
            const currentStatus = c.status;
            const isHidden = currentStatus === "Hidden" || currentStatus === "Ẩn danh mục";
            const statusBg = isHidden
                ? "rgba(245, 158, 11, 0.1)"
                : "rgba(16, 185, 129, 0.1)";
            const statusColor = isHidden ? "#f59e0b" : "#10b981";
            const statusText = isHidden ? "Tạm ẩn" : "Hoạt động";
            const categoryId = c.id || c._id;
            return `
          <tr>
            <td>
              <div style="display: flex; align-items: center; gap: 15px;">
                <img src="${imgUrl}" style="width: 40px; height: 40px; border-radius: 8px; object-fit: cover; border: 1px solid var(--border-color);">
                <strong style="color: var(--text-main);">${c.name}</strong>
              </div>
            </td>
            <td style="color: var(--text-muted);">${slugText}</td>
            <td>${parentText}</td>
            <td><strong>${c.productsCount || 0}</strong> sản phẩm</td>
            <td><span style="background: ${statusBg}; color: ${statusColor}; padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: 600;">${statusText}</span></td>
            <td>
              <button class="btn-edit" data-id="${categoryId}" style="cursor:pointer; color:#3b82f6; border:none; background:none; font-size: 16px; margin-right: 10px;" title="Sửa"><i class="fa-solid fa-pen-to-square"></i></button>
              <button class="btn-delete" data-id="${categoryId}" style="cursor:pointer; color:#ef4444; border:none; background:none; font-size: 16px;" title="Xóa"><i class="fa-solid fa-trash"></i></button>
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
                if (confirm(`Xóa danh mục này vĩnh viễn khỏi MongoDB?`))
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
        this.btnSave?.addEventListener("click", () => handler());
    }
}
