export class AdminUserController {
    view;
    service;
    users = [];
    constructor(view, service) {
        this.view = view;
        this.service = service;
    }
    async init() {
        this.view.bindActionEvents(this.handleDelete.bind(this), this.handleEdit.bind(this));
        this.view.bindSaveEvent(this.handleSave.bind(this));
        await this.loadUsers();
    }
    async loadUsers() {
        try {
            this.users = await this.service.getAllUsers();
            this.view.renderTable(this.users);
        }
        catch (error) {
            console.error(error);
        }
    }
    async handleSave() {
        try {
            const formData = this.view.getFormData();
            if (this.view.currentEditId) {
                await this.service.updateUser(this.view.currentEditId, formData);
                alert("Cập nhật tài khoản thành công!");
            }
            else {
                await this.service.createUser(formData);
                alert("Thêm tài khoản mới thành công!");
            }
            this.view.clearForm();
            document.getElementById("btn-back-list")?.click();
            await this.loadUsers();
        }
        catch (error) {
            console.error(error);
            alert("Có lỗi xảy ra khi lưu dữ liệu!");
        }
    }
    handleEdit(id) {
        const user = this.users.find((u) => u.id === id);
        if (user) {
            this.view.fillForm(user, id);
        }
    }
    async handleDelete(id) {
        try {
            await this.service.deleteUser(id);
            alert("Đã xóa tài khoản thành công!");
            await this.loadUsers();
        }
        catch (error) {
            console.error(error);
            alert("Lỗi khi xóa tài khoản!");
        }
    }
}
