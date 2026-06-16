export class ProductService {
    apiUrl = "http://localhost:3000/api/products";
    async getAllProducts() {
        try {
            const response = await fetch(this.apiUrl);
            if (!response.ok)
                throw new Error("Lỗi khi tải dữ liệu sản phẩm");
            const data = await response.json();
            return data.map((item) => ({
                ...item,
                id: item._id,
            }));
        }
        catch (error) {
            console.error(error);
            return [];
        }
    }
    async filterProducts(keyword, categories, minPrice, maxPrice, sortBy) {
        let result = await this.getAllProducts();
        if (keyword) {
            result = result.filter((p) => p.name.toLowerCase().includes(keyword.toLowerCase()));
        }
        if (categories.length > 0) {
            result = result.filter((p) => categories.indexOf(p.category) !== -1);
        }
        if (minPrice > 0)
            result = result.filter((p) => p.price >= minPrice);
        if (maxPrice > 0)
            result = result.filter((p) => p.price <= maxPrice);
        if (sortBy === "price-asc")
            result.sort((a, b) => a.price - b.price);
        if (sortBy === "price-desc")
            result.sort((a, b) => b.price - a.price);
        if (sortBy === "sales")
            result.sort((a, b) => b.sold - a.sold);
        if (sortBy === "new") {
            result.sort((a, b) => new Date(b.createdAt || Date.now()).getTime() -
                new Date(a.createdAt || Date.now()).getTime());
        }
        return result;
    }
}
