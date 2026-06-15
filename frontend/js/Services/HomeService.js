export class HomeService {
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
    mockHotProducts = [
        {
            id: 1,
            name: "Ghế Công Thái Học F.Style",
            category: "Ghế",
            price: 3200000,
            oldPrice: 4500000,
            discount: "29%",
            rating: 5,
            sold: 1250,
            inStock: true,
            image: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=300",
            dateAdded: "2026-05-10",
        },
        {
            id: 2,
            name: "Bàn Nâng Hạ Smart Desk",
            category: "Bàn",
            price: 4500000,
            oldPrice: 6000000,
            discount: "25%",
            rating: 4.8,
            sold: 840,
            inStock: true,
            image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=300",
            dateAdded: "2026-05-15",
        },
        {
            id: 3,
            name: "Ghế Xoay Lưới Văn Phòng",
            category: "Ghế",
            price: 1200000,
            oldPrice: 1500000,
            discount: "20%",
            rating: 4.5,
            sold: 500,
            inStock: true,
            image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=300",
            dateAdded: "2026-05-20",
        },
        {
            id: 4,
            name: "Arm Màn Hình Kép",
            category: "Phụ kiện",
            price: 850000,
            oldPrice: 1000000,
            discount: "15%",
            rating: 4.9,
            sold: 1120,
            inStock: true,
            image: "https://images.unsplash.com/photo-1527443154391-4208e9baea10?w=300",
            dateAdded: "2026-05-22",
        },
    ];
    async getBanners() {
        return this.mockBanners;
    }
    async getHotProducts() {
        return this.mockHotProducts;
    }
}
