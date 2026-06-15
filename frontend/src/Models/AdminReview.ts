export interface AdminReview {
  id: string; // Đổi sang string cho MongoDB
  userName: string;
  userAvatar: string;
  date: string;
  productName: string;
  rating: number;
  comment: string;
  status: "Pending" | "Approved" | "Hidden";
}
