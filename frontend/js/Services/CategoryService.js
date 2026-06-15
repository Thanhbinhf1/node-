export class CategoryService {
    mockData = [
        { id: 1, name: "Bàn Làm Việc", slug: "ban-lam-viec", image: "img1.jpg" },
        {
            id: 2,
            name: "Ghế Công Thái Học",
            slug: "ghe-cong-thai-hoc",
            image: "img2.jpg",
        },
    ];
    async getAllCategories() {
        return [...this.mockData];
    }
}
