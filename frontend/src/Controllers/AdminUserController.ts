import { AdminUserView } from "../Views/AdminUserView.js";
import { AdminUserService } from "../Services/AdminUserService.js";
import { AdminUser } from "../Models/AdminUser.js";

export class AdminUserController {
  private users: AdminUser[] = [];

  constructor(
    private service: AdminUserService,
    private view: AdminUserView,
  ) {}

  async init() {
    // Lắng nghe sự kiện Xóa và Sửa từ View
    this.view.bindActionEvents(
      this.handleDelete.bind(this),
      this.handleEdit.bind(this),
    );
    // Lắng nghe sự kiện Bấm nút Lưu
    this.view.bindSaveEvent(this.handleSave.bind(this));

    // Vừa vào trang là load ngay danh sách
    await this.loadUsers();
  }

  async loadUsers() {
    try {
      this.users = await this.service.getAllUsers();
      this.view.renderTable(this.users);
    } catch (error) {
      console.error(error);
    }
  }

  async handleSave() {
    try {
      const formData = this.view.getFormData();

      if (this.view.currentEditId) {
        // Đang ở chế độ Sửa
        await this.service.updateUser(this.view.currentEditId, formData);
        alert("Cập nhật tài khoản thành công!");
      } else {
        // Đang ở chế độ Thêm mới
        await this.service.createUser(formData);
        alert("Thêm tài khoản mới thành công!");
      }

      this.view.clearForm();
      document.getElementById("btn-back-list")?.click(); // Quay lại bảng
      await this.loadUsers(); // Tải lại bảng dữ liệu mới
    } catch (error) {
      console.error(error);
      alert("Có lỗi xảy ra khi lưu dữ liệu!");
    }
  }

  handleEdit(id: string) {
    const user = this.users.find((u) => u.id === id);
    if (user) {
      this.view.fillForm(user, id);
    }
  }

  async handleDelete(id: string) {
    try {
      await this.service.deleteUser(id);
      alert("Đã xóa tài khoản thành công!");
      await this.loadUsers();
    } catch (error) {
      console.error(error);
      alert("Lỗi khi xóa tài khoản!");
    }
  }
}
