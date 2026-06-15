export class ProductService {
    mockData = [
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
    ];
    async getAllProducts() {
        return [...this.mockData];
    }
    async filterProducts(keyword, categories, minPrice, maxPrice, sortBy) {
        let result = [...this.mockData];
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
        if (sortBy === "new")
            result.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
        return result;
    }
}
