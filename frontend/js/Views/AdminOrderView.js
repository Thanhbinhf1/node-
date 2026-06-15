export class AdminOrderView {
    listView = document.getElementById("order-list-view");
    detailView = document.getElementById("order-detail-view");
    tableBody = document.getElementById("admin-order-table-body");
    btnBackList = document.getElementById("btn-back-list");
    constructor() {
        if (this.detailView)
            this.detailView.style.display = "none";
        this.btnBackList?.addEventListener("click", () => {
            if (this.detailView)
                this.detailView.style.display = "none";
            if (this.listView)
                this.listView.style.display = "block";
        });
    }
    renderOrdersTable(orders) {
        if (!this.tableBody)
            return;
        this.tableBody.innerHTML = orders
            .map((order) => {
            let badgeBg = "#334155";
            let badgeColor = "#f8fafc";
            if (order.status === "Chờ xác nhận") {
                badgeBg = "rgba(245, 158, 11, 0.2)";
                badgeColor = "#f59e0b";
            }
            else if (order.status === "Đang giao") {
                badgeBg = "rgba(139, 92, 246, 0.2)";
                badgeColor = "#8b5cf6";
            }
            else if (order.status === "Đã xác nhận") {
                badgeBg = "rgba(59, 130, 246, 0.2)";
                badgeColor = "#3b82f6";
            }
            else if (order.status === "Hoàn thành") {
                badgeBg = "rgba(16, 185, 129, 0.2)";
                badgeColor = "#10b981";
            }
            else if (order.status === "Đã hủy") {
                badgeBg = "rgba(239, 68, 68, 0.2)";
                badgeColor = "#ef4444";
            }
            return `
                <tr>
                    <td style="font-weight: 600;">${order.orderIdCode || order.id}</td>
                    <td>${order.date}</td>
                    <td>${order.customerName}</td>
                    <td><span style="font-size: 12px; border: 1px solid var(--border-color); padding: 3px 8px; border-radius: 4px;">${order.paymentMethod}</span></td>
                    <td><span style="background: ${badgeBg}; color: ${badgeColor}; padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: 600;">${order.status}</span></td>
                    <td style="font-weight: 600; color: var(--primary);">${order.totalAmount.toLocaleString("vi-VN")}đ</td>
                    <td>
                        <button class="btn-view-detail" data-id="${order.id}" style="cursor:pointer; color:#3b82f6; background:none; border:none; margin-right: 10px; font-size: 16px;" title="Xem chi tiết">
                            <i class="fa-solid fa-eye"></i>
                        </button>
                    </td>
                </tr>
            `;
        })
            .join("");
    }
    renderOrderDetail(order) {
        if (this.listView)
            this.listView.style.display = "none";
        if (this.detailView)
            this.detailView.style.display = "block";
        const setText = (id, text) => {
            const el = document.getElementById(id);
            if (el)
                el.innerText = text;
        };
        setText("detail-order-id", `${order.orderIdCode || "#" + order.id}`);
        setText("detail-order-date", order.date);
        setText("detail-customer-name", order.customerName);
        setText("detail-customer-email", order.email || "Chưa cập nhật");
        setText("detail-customer-phone", order.phone);
        setText("detail-customer-address", order.address);
        setText("detail-payment-method", order.paymentMethod);
        const statusEl = document.getElementById("detail-order-status");
        if (statusEl) {
            statusEl.innerText = order.status;
            let statusClass = "status-pending";
            if (order.status === "Đã xác nhận")
                statusClass = "status-confirmed";
            else if (order.status === "Đang giao")
                statusClass = "status-shipping";
            else if (order.status === "Hoàn thành")
                statusClass = "status-completed";
            else if (order.status === "Đã hủy")
                statusClass = "status-cancelled";
            statusEl.className = `status-badge ${statusClass}`;
        }
        const payStatusEl = document.getElementById("detail-payment-status");
        if (payStatusEl) {
            const isPaid = order.paymentStatus === "Paid" ||
                order.paymentStatus === "Đã thanh toán";
            payStatusEl.innerText = isPaid ? "Đã thanh toán" : "Chưa thanh toán";
            payStatusEl.className = `status-badge ${isPaid ? "status-paid" : "status-unpaid"}`;
        }
        const selectStatus = document.getElementById("status-update-select");
        if (selectStatus)
            selectStatus.value = order.status;
        const tbody = document.getElementById("detail-products-body");
        if (tbody) {
            tbody.innerHTML = order.items
                .map((item) => `
                <tr>
                    <td style="font-weight: 500;">${item.name}</td>
                    <td>${item.price.toLocaleString("vi-VN")}đ</td>
                    <td>${item.qty}</td>
                    <td style="text-align: right; font-weight: 600;">${(item.price * item.qty).toLocaleString("vi-VN")}đ</td>
                </tr>
            `)
                .join("");
        }
        setText("detail-subtotal", `${order.totalAmount.toLocaleString("vi-VN")}đ`);
        setText("detail-total", `${order.totalAmount.toLocaleString("vi-VN")}đ`);
        const btnUpdateStatus = document.getElementById("btn-update-order-status");
        const newBtn = btnUpdateStatus?.cloneNode(true);
        btnUpdateStatus?.parentNode?.replaceChild(newBtn, btnUpdateStatus);
        document
            .getElementById("btn-update-order-status")
            ?.addEventListener("click", () => {
            const newStatus = document.getElementById("status-update-select").value;
            if (confirm(`Bạn có chắc chắn muốn chuyển trạng thái đơn hàng thành "${newStatus}"?`)) {
                console.log("Cần gọi API update status với ID:", order.id, "và trạng thái:", newStatus);
                alert("Tính năng cập nhật đang được gắn API!");
            }
        });
    }
    bindViewDetail(handler) {
        this.tableBody?.addEventListener("click", (e) => {
            const target = e.target;
            const btn = target.closest(".btn-view-detail");
            if (btn) {
                handler(btn.getAttribute("data-id") || "");
            }
        });
    }
}
