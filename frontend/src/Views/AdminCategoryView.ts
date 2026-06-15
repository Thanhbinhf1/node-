import { AdminCategory } from "../Models/AdminCategory.js";

export class AdminCategoryView {
  private listView = document.getElementById("category-list-view");
  private formView = document.getElementById("category-form-view");
  private tableBody = document.getElementById("category-table-body");

  private btnShowAdd = document.getElementById("btn-show-add");
  private btnBackList = document.getElementById("btn-back-list");
  private btnSave = document.getElementById("btn-save-category");

  private uploadZone = document.getElementById("upload-zone");
  private fileInput = document.getElementById("file-input") as HTMLInputElement;
  private previewContainer = document.getElementById("preview-container");

  public currentEditId: string | null = null;

  constructor() {
    if (this.formView) this.formView.style.display = "none"; // Ép ẩn Form mặc định
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
      document.getElementById("cat-name") as HTMLInputElement
    )?.value.trim();
    const slug = (
      document.getElementById("cat-slug") as HTMLInputElement
    )?.value.trim();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("slug", slug);

    if (
      this.fileInput &&
      this.fileInput.files &&
      this.fileInput.files.length > 0
    ) {
      formData.append("image", this.fileInput.files[0]); // Category dùng upload.single('image')
    }

    return formData;
  }

  // 1. Hàm bật Form sửa (Đổi chữ thành tiếng Việt)
  fillForm(data: any, id: string) {
    this.currentEditId = id;
    (document.getElementById("cat-name") as HTMLInputElement).value =
      data.name || "";
    (document.getElementById("cat-slug") as HTMLInputElement).value =
      data.slug || "";

    if (this.previewContainer && data.image) {
      this.previewContainer.innerHTML = `<img src="http://localhost:3000${data.image}" class="img-preview">`;
    }

    if (this.btnSave) this.btnSave.innerText = "Cập nhật Danh mục"; // Đã Việt hóa
    if (this.listView) this.listView.style.display = "none";
    if (this.formView) this.formView.style.display = "block";
    document.getElementById("form-title")!.innerText = "Sửa Danh mục"; // Cập nhật tiêu đề
  }

  // 2. Hàm reset Form (Đổi chữ thành tiếng Việt)
  clearForm() {
    this.currentEditId = null;
    (document.getElementById("cat-name") as HTMLInputElement).value = "";
    (document.getElementById("cat-slug") as HTMLInputElement).value = "";
    if (this.previewContainer) this.previewContainer.innerHTML = "";
    if (this.fileInput) this.fileInput.value = "";

    if (this.btnSave) this.btnSave.innerText = "Lưu Danh mục"; // Đã Việt hóa
    const formTitle = document.getElementById("form-title");
    if (formTitle) formTitle.innerText = "Thêm Danh mục mới";
  }

  // 3. Hàm constructor (Thêm lệnh ép ẩn Form lúc vừa load trang)

  renderTable(categories: AdminCategory[]) {
    if (!this.tableBody) return;
    this.tableBody.innerHTML = categories
      .map((c) => {
        // 1. Fix lỗi ảnh gãy
        const imgUrl = c.image
          ? `http://localhost:3000${c.image}`
          : "https://via.placeholder.com/50";

        // 2. Fix lỗi undefined
        const slugText = c.slug ? c.slug : "---";

        // 3. Việt hóa chữ "none" cho danh mục cha
        const parentText =
          !c.parent || c.parent === "none" ? "Không có" : c.parent;

        // 4. Việt hóa trạng thái & Màu sắc (Đã fix lỗi TypeScript)
        const currentStatus: string = c.status;
        const isHidden =
          currentStatus === "Hidden" || currentStatus === "Ẩn danh mục";
        const statusBg = isHidden
          ? "rgba(245, 158, 11, 0.1)"
          : "rgba(16, 185, 129, 0.1)";
        const statusColor = isHidden ? "#f59e0b" : "#10b981";
        const statusText = isHidden ? "Tạm ẩn" : "Hoạt động";

        // Đề phòng trường hợp MongoDB trả về _id thay vì id
        const categoryId = c.id || (c as any)._id;

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

  bindActionEvents(
    deleteHandler: (id: string) => void,
    editHandler: (id: string) => void,
  ) {
    this.tableBody?.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;

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

  bindSaveEvent(handler: () => void) {
    this.btnSave?.addEventListener("click", () => handler());
  }
}
