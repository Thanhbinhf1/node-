export class AdminProductController {
    service;
    view;
    constructor(service, view) {
        this.service = service;
        this.view = view;
        this.init();
        this.view.bindActionEvents(this.handleDelete.bind(this), this.handleEdit.bind(this));
        this.view.bindSaveEvent(this.handleSave.bind(this));
    }
    async init() {
        const products = await this.service.getAllProducts();
        this.view.renderTable(products);
    }
    async handleDelete(id) {
        const success = await this.service.deleteProduct(id);
        if (success)
            this.init();
    }
    async handleEdit(id) {
        const productData = await this.service.getProductById(id);
        if (productData) {
            this.view.fillForm(productData, id);
        }
        else {
            alert("Không tìm thấy dữ liệu sản phẩm trên Hệ thống Server!");
        }
    }
    async handleSave() {
        const formData = this.view.getFormData();
        const name = formData.get("name");
        const price = parseInt(formData.get("price") || "0");
        if (!name) {
            alert("Vui lòng điền thông tin Tên sản phẩm!");
            return;
        }
        if (price <= 0) {
            alert("Giá trị sản phẩm phải lớn hơn 0 VNĐ!");
            return;
        }
        let success = false;
        if (this.view.currentEditId) {
            success = await this.service.updateProduct(this.view.currentEditId, formData);
            if (success)
                alert("Đã cập nhật thay đổi sản phẩm lên MongoDB thành công!");
        }
        else {
            success = await this.service.addProduct(formData);
            if (success)
                alert("Đã khởi tạo sản phẩm mới vào MongoDB thành công!");
        }
        if (success) {
            this.view.clearForm();
            this.init();
            document.getElementById("btn-back-list")?.click();
        }
        else {
            alert("Có lỗi xảy ra trong tiến trình tương tác với cơ sở dữ liệu!");
        }
    }
}
