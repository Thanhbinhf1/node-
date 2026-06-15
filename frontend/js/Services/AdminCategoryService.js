export class AdminCategoryService {
    API_URL = "http://localhost:3000/api/categories";
    async getAllCategories() {
        try {
            const response = await fetch(this.API_URL);
            const data = await response.json();
            return data.map((item) => ({
                id: item._id,
                name: item.name,
                slug: item.slug,
                parent: item.parent || "None",
                productsCount: 0,
                status: item.status || "Active",
                image: item.image
                    ? `http://localhost:3000${item.image}`
                    : "https://via.placeholder.com/100",
            }));
        }
        catch (error) {
            return [];
        }
    }
    async getCategoryById(id) {
        try {
            const response = await fetch(`${this.API_URL}/${id}`);
            return response.ok ? await response.json() : null;
        }
        catch (error) {
            return null;
        }
    }
    async addCategory(formData) {
        try {
            const response = await fetch(this.API_URL, {
                method: "POST",
                body: formData,
            });
            return response.ok;
        }
        catch (error) {
            return false;
        }
    }
    async updateCategory(id, formData) {
        try {
            const response = await fetch(`${this.API_URL}/${id}`, {
                method: "PUT",
                body: formData,
            });
            return response.ok;
        }
        catch (error) {
            return false;
        }
    }
    async deleteCategory(id) {
        try {
            const response = await fetch(`${this.API_URL}/${id}`, {
                method: "DELETE",
            });
            return response.ok;
        }
        catch (error) {
            return false;
        }
    }
}
