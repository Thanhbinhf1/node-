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
    name: string;
    email: string;
  };
}
