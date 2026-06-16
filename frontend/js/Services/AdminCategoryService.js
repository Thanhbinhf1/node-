export class AdminCategoryService {
    apiUrl = "http://localhost:3000/api/categories";
    async getAllCategories() {
        try {
            const response = await fetch(this.apiUrl);
            if (!response.ok)
                return [];
            const data = await response.json();
            return data.map((item) => ({
                id: item._id,
                name: item.name,
                slug: item.slug || item.name.toLowerCase().replace(/ /g, "-"),
                productCount: item.productCount || 0,
                status: item.status || "Hoạt động",
            }));
        }
        catch (error) {
            return [];
        }
    }
    async getCategoryById(id) {
        try {
            const response = await fetch(`${this.apiUrl}/${id}`);
            if (!response.ok)
                return null;
            return await response.json();
        }
        catch (error) {
            console.error("Lỗi lấy chi tiết danh mục:", error);
            return null;
        }
    }
    async addCategory(formData) {
        try {
            const plainData = Object.fromEntries(formData.entries());
            const response = await fetch(this.apiUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(plainData),
            });
            return response.ok;
        }
        catch (error) {
            return false;
        }
    }
    async updateCategory(id, formData) {
        try {
            const plainData = Object.fromEntries(formData.entries());
            const response = await fetch(`${this.apiUrl}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(plainData),
            });
            return response.ok;
        }
        catch (error) {
            return false;
        }
    }
    async deleteCategory(id) {
        try {
            const response = await fetch(`${this.apiUrl}/${id}`, {
                method: "DELETE",
            });
            return response.ok;
        }
        catch (error) {
            return false;
        }
    }
}
