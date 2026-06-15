import { ClientOrder } from "../Models/Order.js";

export class OrderView {
  private ordersWrapper = document.getElementById("orders-list-wrapper");
  private emptyOrdersMsg = document.getElementById("empty-orders-msg");
  private tabItems = document.querySelectorAll(".order-tabs .tab-item");

  // 1. In danh sách đơn hàng ra màn hình
  renderOrders(orders: ClientOrder[]) {
    if (!this.ordersWrapper || !this.emptyOrdersMsg) return;

    // Nếu trống thì hiện thông báo
    if (orders.length === 0) {
      this.ordersWrapper.style.display = "none";
      this.emptyOrdersMsg.style.display = "block";
      return;
    }

    this.ordersWrapper.style.display = "flex";
    this.emptyOrdersMsg.style.display = "none";

    this.ordersWrapper.innerHTML = orders
      .map((order) => {
        // Định dạng màu sắc trạng thái
        let statusClass = "status-cho-xac-nhan";
        if (order.status === "Đã xác nhận") statusClass = "status-da-xac-nhan";
        else if (order.status === "Đang giao") statusClass = "status-dang-giao";
        else if (order.status === "Hoàn thành")
          statusClass = "status-hoan-thanh";
        else if (order.status === "Đã hủy") statusClass = "status-da-huy";

        return `
                <div class="order-card">
                    <div class="order-card-header">
                        <div>
                            <span class="order-id-txt">Đơn hàng: #${order.id}</span>
                            <div class="order-date-txt" style="margin-top: 4px;">Ngày đặt: ${order.date}</div>
                        </div>
                        <div class="status-txt ${statusClass}">
                            <i class="fa-solid fa-truck-fast" style="font-size: 13px;"></i> ${order.status}
                        </div>
                    </div>
                    <div class="order-card-body">
                        <div class="total-box">
                            <div>Tổng số tiền:</div>
                            <div class="total-amount">${order.total.toLocaleString("vi-VN")}đ</div>
                        </div>
                        <button class="btn-detail" onclick="alert('Xem chi tiết đơn hàng #${order.id}')">Xem chi tiết</button>
                    </div>
                </div>
            `;
      })
      .join("");
  }

  // 2. Bắt sự kiện click Tab chuyển cho Controller xử lý
  bindTabClick(handler: (status: string) => void) {
    this.tabItems.forEach((tab) => {
      tab.addEventListener("click", (e) => {
        const target = e.currentTarget as HTMLElement;

        // Đổi gạch chân đỏ sang Tab đang chọn
        this.tabItems.forEach((t) => t.classList.remove("active"));
        target.classList.add("active");

        // Đọc thuộc tính data-status (VD: 'Đang giao') rồi ném cho Controller
        const targetStatus = target.getAttribute("data-status") || "all";
        handler(targetStatus);
      });
    });
  }
}
