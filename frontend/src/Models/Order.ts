export interface ClientOrder {
  id: string;
  date: string;
  total: number;
  status:
    | "Chờ xác nhận"
    | "Đã xác nhận"
    | "Đang giao"
    | "Hoàn thành"
    | "Đã hủy";
}
