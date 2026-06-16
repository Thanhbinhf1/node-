export class ProductDetailService {
    apiUrl = "http://localhost:3000/api/products";
    async getProductById(id) {
        try {
            const response = await fetch(`${this.apiUrl}/${id}`);
            if (!response.ok)
                return null;
            const data = await response.json();
            return {
                ...data,
                id: data._id,
                price: data.price || 0,
                images: data.images && data.images.length > 0
                    ? data.images
                    : [
                        data.image ||
                            "https://dummyimage.com/600x600/cccccc/000000&text=No+Image",
                    ],
            };
        }
        catch (error) {
            console.error("Lỗi lấy chi tiết sản phẩm:", error);
            return null;
        }
    }
}
