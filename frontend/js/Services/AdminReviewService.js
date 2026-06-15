export class AdminReviewService {
    API_URL = "http://localhost:3000/api/reviews";
    async getAllReviews() {
        try {
            const response = await fetch(this.API_URL);
            const data = await response.json();
            return data.map((item) => ({
                id: item._id,
                userName: item.userName || "Ẩn danh",
                userAvatar: item.userAvatar || "https://via.placeholder.com/100",
                date: item.createdAt
                    ? new Date(item.createdAt).toLocaleDateString("vi-VN")
                    : "",
                productName: item.productName || "Sản phẩm",
                rating: item.rating || 5,
                comment: item.comment || "",
                status: item.status || "Pending",
            }));
        }
        catch (error) {
            return [];
        }
    }
    async updateReviewStatus(id, status) {
        try {
            const response = await fetch(`${this.API_URL}/${id}/status`, {
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
            const response = await fetch(`${this.API_URL}/${id}`, {
                method: "DELETE",
            });
            return response.ok;
        }
        catch (error) {
            return false;
        }
    }
}
