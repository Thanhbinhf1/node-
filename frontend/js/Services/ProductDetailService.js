export class ProductDetailService {
    mockData = [
        {
            id: 1,
            name: "Ghế Công Thái Học F.Style",
            category: "Ghế",
            price: 3200000,
            oldPrice: 4500000,
            description: "Ghế công thái học cao cấp, hỗ trợ cột sống 3D, lưới thoáng khí...",
            images: [
                "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=600",
                "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600",
            ],
            rating: 5,
            sold: 1250,
            inStock: true,
        },
        {
            id: 2,
            name: "Bàn Nâng Hạ Smart Desk",
            category: "Bàn",
            price: 4500000,
            oldPrice: 6000000,
            description: "Bàn nâng hạ chiều cao thông minh, ghi nhớ 4 vị trí, mặt gỗ MDF chống xước.",
            images: [
                "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600",
                "https://images.unsplash.com/photo-1527443154391-4208e9baea10?w=600",
            ],
            rating: 4.8,
            sold: 840,
            inStock: true,
        },
    ];
    async getProductById(id) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const product = this.mockData.find((p) => p.id === id);
                resolve(product || null);
            }, 300);
        });
    }
}
