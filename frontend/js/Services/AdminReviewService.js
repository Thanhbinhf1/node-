export class AdminReviewService {
    apiUrl = "http://localhost:3000/api/reviews";
    async getAllReviews() {
        try {
            const response = await fetch(this.apiUrl);
            if (!response.ok)
                return [];
            const data = await response.json();
            return data.map((item) => ({
                id: item._id,
                customerName: item.user?.fullName || item.customerName || "Khách ẩn danh",
                productName: item.product?.name || "Sản phẩm không rõ",
                rating: item.rating || 5,
                content: item.content || "",
                date: new Date(item.createdAt).toLocaleDateString("vi-VN"),
                status: item.status || "Approved",
            }));
        }
        catch (error) {
            return [];
        }
    }
    async updateReviewStatus(id, status) {
        try {
            const response = await fetch(`${this.apiUrl}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status }),
            });
            return response.ok;
        }
        catch (error) {
            return false;
        }
    }
    async deleteReview(id) {
        try {
            const response = await fetch(`${this.apiUrl}/${id}`, {
                method: "DELETE",
            });
            return response.ok;
        }
        catch (error) {
            return false;
        }
    }
}
