export class AdminCouponController {
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
        const coupons = await this.service.getAllCoupons();
        this.view.renderTable(coupons);
    }
    async handleDelete(id) {
        const success = await this.service.deleteCoupon(id);
        if (success)
            this.init();
    }
    async handleEdit(id) {
        const data = await this.service.getCouponById(id);
        if (data)
            this.view.fillForm(data, id);
        else
            alert("Lỗi tải dữ liệu mã giảm giá từ Server!");
    }
    async handleSave() {
        const data = this.view.getFormData();
        if (!data.code || data.discountValue <= 0 || !data.expiryDate) {
            alert("Vui lòng điền đầy đủ Mã, Giá trị giảm và Ngày hết hạn!");
            return;
        }
        let success = false;
        if (this.view.currentEditId) {
            success = await this.service.updateCoupon(this.view.currentEditId, data);
            if (success)
                alert("Đã cập nhật mã giảm giá!");
        }
        else {
            success = await this.service.addCoupon(data);
            if (success)
                alert("Đã tạo mã giảm giá mới!");
        }
        if (success) {
            this.view.clearForm();
            this.init();
            document.getElementById("btn-back-list")?.click();
        }
    }
}
