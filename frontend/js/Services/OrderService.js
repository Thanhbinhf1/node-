export class OrderService {
    apiUrl = "http://localhost:3000/api/orders";
    async getOrdersByStatus(status) {
        try {
            const userId = localStorage.getItem("userId");
            if (!userId)
                return [];
            const response = await fetch(this.apiUrl);
            if (!response.ok)
                return [];
            const allOrders = await response.json();
            let myOrders = allOrders.filter((order) => {
                const orderUserId = order.user?._id || order.user;
                return orderUserId === userId;
            });
            if (status && status !== "all") {
                myOrders = myOrders.filter((order) => order.status === status);
            }
            return myOrders.map((order) => ({
                id: order.orderId,
                date: new Date(order.createdAt).toLocaleDateString("vi-VN"),
                total: order.totalAmount,
                status: order.status,
            }));
        }
        catch (error) {
            console.error("Lỗi lấy danh sách đơn hàng:", error);
            return [];
        }
    }
}
