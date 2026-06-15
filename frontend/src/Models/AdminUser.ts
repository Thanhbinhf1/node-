export interface AdminUser {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  address?: string;
  avatar?: string;
  role: "Customer" | "Admin" | "SuperAdmin";
  status: "Active" | "Banned";
  joinDate?: string;
}
