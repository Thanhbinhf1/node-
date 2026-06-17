export interface UserPayload {
  name?: string;
  email: string;
  phone?: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  msg: string;
  token?: string;
  user?: {
    _id: string;
    name?: string;
    fullName?: string; // Đề phòng backend trả về fullName
    email: string;
    role?: string; // BỔ SUNG DÒNG NÀY ĐỂ HẾT LỖI
  };
}
