import { AdminReview } from "../Models/AdminReview.js";

export class AdminReviewService {
  private API_URL = "http://localhost:3000/api/reviews";

  async getAllReviews(): Promise<AdminReview[]> {
    try {
      const response = await fetch(this.API_URL);
      const data = await response.json();
      return data.map((item: any) => ({
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
    } catch (error) {
      return [];
    }
  }

  async updateReviewStatus(
    id: string,
    status: "Pending" | "Approved" | "Hidden",
  ): Promise<boolean> {
    try {
      const response = await fetch(`${this.API_URL}/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  }

  async deleteReview(id: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.API_URL}/${id}`, {
        method: "DELETE",
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  }
}
