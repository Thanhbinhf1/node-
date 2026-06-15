export class DashboardService {
    async getStats() {
        return new Promise((resolve) => setTimeout(() => resolve({
            revenue: "124.5M",
            revenueTrend: "+12.5%",
            orders: 842,
            ordersTrend: "+5.2%",
            products: 156,
            users: 2845,
            usersTrend: "+184",
        }), 200));
    }
    async getChartData() {
        return new Promise((resolve) => setTimeout(() => resolve({
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
            data: [65, 78, 90, 81, 105, 124, 115],
        }), 200));
    }
    async getLatestOrders() {
        return new Promise((resolve) => setTimeout(() => resolve([
            {
                id: "ORD-2026-9901",
                customer: "Nguyễn Văn A",
                total: 3200000,
                status: "Completed",
            },
            {
                id: "ORD-2026-9902",
                customer: "Lê Thị B",
                total: 14800000,
                status: "Pending",
            },
            {
                id: "ORD-2026-9903",
                customer: "Trần Văn C",
                total: 18500000,
                status: "Completed",
            },
        ]), 200));
    }
    async getTopProducts() {
        return new Promise((resolve) => setTimeout(() => resolve([
            {
                id: "1",
                name: "Ghế Công Thái Học F.Style",
                sku: "FS-ERGO-BLK",
                category: "Workspace",
                price: 3200000,
                sold: 1250,
                stock: 15,
                img: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=100",
            },
            {
                id: "2",
                name: "Bàn Ăn Mặt Đá Ceramic",
                sku: "BAN-DA-TRANG",
                category: "Kitchen",
                price: 14800000,
                sold: 840,
                stock: 5,
                img: "https://images.unsplash.com/photo-1617806118233-18e1c0945594?w=100",
            },
        ]), 200));
    }
}
