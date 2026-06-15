import { AdminCategoryService } from "../Services/AdminCategoryService.js";
import { AdminCategoryView } from "../Views/AdminCategoryView.js";

export class AdminCategoryController {
  constructor(
    private service: AdminCategoryService,
    private view: AdminCategoryView,
  ) {
    this.init();
    this.view.bindActionEvents(
      this.handleDelete.bind(this),
      this.handleEdit.bind(this),
    );
    this.view.bindSaveEvent(this.handleSave.bind(this));
  }

  async init() {
    const categories = await this.service.getAllCategories();
    this.view.renderTable(categories);
  }

  async handleDelete(id: string) {
    const success = await this.service.deleteCategory(id);
    if (success) this.init();
  }

  async handleEdit(id: string) {
    const data = await this.service.getCategoryById(id);
    if (data) this.view.fillForm(data, id);
    else alert("Lỗi tải dữ liệu danh mục từ Server!");
  }

  async handleSave() {
    const formData = this.view.getFormData();
    if (!formData.get("name")) {
      alert("Tên danh mục không được để trống!");
      return;
    }

    let success = false;
    if (this.view.currentEditId) {
      success = await this.service.updateCategory(
        this.view.currentEditId,
        formData,
      );
      if (success) alert("Đã cập nhật danh mục!");
    } else {
      success = await this.service.addCategory(formData);
      if (success) alert("Đã tạo danh mục mới!");
    }

    if (success) {
      this.view.clearForm();
      this.init();
      document.getElementById("btn-back-list")?.click();
    }
  }
}
