export class HomeService {
    productApiUrl = "http://localhost:3000/api/products";
    mockBanners = [
        {
            id: 1,
            imageUrl: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200",
            link: "/products.html",
            altText: "Sale nội thất văn phòng",
        },
        {
            id: 2,
            imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200",
            link: "/products.html",
            altText: "Ghế công thái học cao cấp",
        },
    ];
    async getBanners() {
        return this.mockBanners;
    }
    async getHotProducts() {
        try {
            const response = await fetch(this.productApiUrl);
            if (!response.ok)
                return [];
            const data = await response.json();
            const products = data.map((item) => ({
                ...item,
                id: item._id,
            }));
            return products.slice(0, 4);
        }
        catch (error) {
            console.error("Lỗi lấy sản phẩm HOT:", error);
            return [];
        }
    }
}
