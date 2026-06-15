export interface AdminCoupon {
  id: string; // Đổi sang string cho MongoDB
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minOrderAmount: number;
  usageLimit: number;
  usageCount: number;
  expiryDate: string;
  status: "Active" | "Hidden" | "Expired";
}
