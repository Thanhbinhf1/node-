import { AdminProductService } from "../Services/AdminProductService.js";
import { AdminProductView } from "../Views/AdminProductView.js";

export class AdminProductController {
  constructor(
    private service: AdminProductService,
    private view: AdminProductView,
  ) {
    this.init();

    // Đăng ký cổng bắt sự kiện Xóa và Sửa tích hợp liên thông lên View
    this.view.bindActionEvents(
      this.handleDelete.bind(this),
      this.handleEdit.bind(this),
    );

    this.view.bindSaveEvent(this.handleSave.bind(this));
  }

  async init() {
    const products = await this.service.getAllProducts();
    this.view.renderTable(products);
  }

  async handleDelete(id: string) {
    const success = await this.service.deleteProduct(id);
    if (success) this.init();
  }

  async handleEdit(id: string) {
    const productData = await this.service.getProductById(id);
    if (productData) {
      this.view.fillForm(productData, id); // Rót dữ liệu cũ vào các ô input form và chuyển trang
    } else {
      alert("Không tìm thấy dữ liệu sản phẩm trên Hệ thống Server!");
    }
  }

  async handleSave() {
    const formData = this.view.getFormData();

    // Bóc tách dữ liệu ảo trong FormData để kiểm định điều kiện (Validate)
    const name = formData.get("name") as string;
    const price = parseInt((formData.get("price") as string) || "0");

    if (!name) {
      alert("Vui lòng điền thông tin Tên sản phẩm!");
      return;
    }
    if (price <= 0) {
      alert("Giá trị sản phẩm phải lớn hơn 0 VNĐ!");
      return;
    }

    let success = false;

    // PHÂN LUỒNG QUY TRÌNH: Kiểm tra biến trạng thái currentEditId của View
    if (this.view.currentEditId) {
      // Gọi luồng SỬA (PUT API)
      success = await this.service.updateProduct(
        this.view.currentEditId,
        formData,
      );
      if (success)
        alert("Đã cập nhật thay đổi sản phẩm lên MongoDB thành công!");
    } else {
      // Gọi luồng THÊM MỚI (POST API)
      success = await this.service.addProduct(formData);
      if (success) alert("Đã khởi tạo sản phẩm mới vào MongoDB thành công!");
    }

    if (success) {
      this.view.clearForm(); // Làm sạch ô nhập liệu và reset trạng thái nút bấm
      this.init(); // Đổ lại danh sách bảng tươi mới nhất từ Database
      document.getElementById("btn-back-list")?.click(); // Trượt quay lại màn hình danh sách chính
    } else {
      alert("Có lỗi xảy ra trong tiến trình tương tác với cơ sở dữ liệu!");
    }
  }
}
