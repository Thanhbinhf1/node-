export class AdminProductService {
    API_URL = "http://localhost:3000/api/products";
    async getAllProducts() {
        try {
            const response = await fetch(this.API_URL);
            const data = await response.json();
            return data.map((item) => ({
                id: item._id,
                sku: item.sku || "",
                name: item.name || "Sản phẩm chưa có tên",
                category: item.category || "Chưa phân loại",
                price: item.price || 0,
                stock: item.stock || 0,
                status: item.status === "Active"
                    ? "Đang bán"
                    : item.status === "Hidden"
                        ? "Đã ẩn"
                        : "Hết hàng",
                images: item.images || [],
            }));
        }
        catch (error) {
            console.error("Lỗi lấy dữ liệu sản phẩm:", error);
            return [];
        }
    }
    async getProductById(id) {
        try {
            const response = await fetch(`${this.API_URL}/${id}`);
            if (!response.ok)
                return null;
            return await response.json();
        }
        catch (error) {
            console.error("Lỗi lấy chi tiết sản phẩm:", error);
            return null;
        }
    }
    async addProduct(formData) {
        try {
            const token = localStorage.getItem("fstyle_token");
            const response = await fetch(this.API_URL, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });
            return response.ok;
        }
        catch (error) {
            console.error("Lỗi thêm sản phẩm:", error);
            return false;
        }
    }
    async updateProduct(id, formData) {
        try {
            const token = localStorage.getItem("fstyle_token");
            const response = await fetch(`${this.API_URL}/${id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });
            return response.ok;
        }
        catch (error) {
            console.error("Lỗi cập nhật sản phẩm:", error);
            return false;
        }
    }
    async deleteProduct(id) {
        try {
            const token = localStorage.getItem("fstyle_token");
            const response = await fetch(`${this.API_URL}/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.ok;
        }
        catch (error) {
            console.error("Lỗi xóa từ Backend:", error);
            return false;
        }
    }
}
