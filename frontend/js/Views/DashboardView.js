export class DashboardView {
    statRevenue = document.getElementById("stat-revenue");
    statOrders = document.getElementById("stat-orders");
    statProducts = document.getElementById("stat-products");
    statUsers = document.getElementById("stat-users");
    ordersBody = document.getElementById("dashboard-orders-body");
    productsBody = document.getElementById("dashboard-products-body");
    chartCtx = document.getElementById("revenueChart");
    revenueChartInstance = null;
    renderStats(stats) {
        if (this.statRevenue)
            this.statRevenue.innerText = `${Number(stats.revenue).toLocaleString("vi-VN")}đ`;
        if (this.statOrders)
            this.statOrders.innerText = Number(stats.orders).toLocaleString("vi-VN");
        if (this.statProducts)
            this.statProducts.innerText = Number(stats.products).toLocaleString("vi-VN");
        if (this.statUsers)
            this.statUsers.innerText = Number(stats.users).toLocaleString("vi-VN");
    }
    renderChart(labels, data) {
        if (!this.chartCtx)
            return;
        if (this.revenueChartInstance) {
            this.revenueChartInstance.destroy();
        }
        this.revenueChartInstance = new Chart(this.chartCtx, {
            type: "line",
            data: {
                labels: labels,
                datasets: [
                    {
                        label: "Doanh thu (VNĐ)",
                        data: data,
                        borderColor: "#3b82f6",
                        backgroundColor: "rgba(59, 130, 246, 0.1)",
                        borderWidth: 2,
                        tension: 0.4,
                        fill: true,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: "#334155" },
                        ticks: { color: "#94a3b8" },
                    },
                    x: { grid: { display: false }, ticks: { color: "#94a3b8" } },
                },
            },
        });
    }
    renderOrders(orders) {
        if (!this.ordersBody)
            return;
        this.ordersBody.innerHTML = orders
            .map((o) => {
            let statusClass = "status-pending";
            let statusText = "Chờ xác nhận";
            if (o.status === "Hoàn thành" || o.status === "Completed") {
                statusClass = "status-completed";
                statusText = "Hoàn thành";
            }
            else if (o.status === "Đang giao" || o.status === "Shipping") {
                statusClass = "status-shipping";
                statusText = "Đang giao";
            }
            return `
            <tr>
                <td>
                    <div style="font-weight: 600">${o.customer}</div>
                    <div style="font-size: 12px; color: var(--text-muted)">${o.id}</div>
                </td>
                <td style="font-weight: 600; color: var(--primary);">${o.total.toLocaleString("vi-VN")}đ</td>
                <td>
                    <span class="status-badge ${statusClass}">${statusText}</span>
                </td>
            </tr>
        `;
        })
            .join("");
    }
    renderProducts(products) {
        if (!this.productsBody)
            return;
        this.productsBody.innerHTML = products
            .map((p) => {
            const stockColor = p.stock > 10 ? "#10b981" : "#ef4444";
            const imgUrl = p.img
                ? `http://localhost:3000${p.img}`
                : "https://via.placeholder.com/50";
            return `
                <tr>
                    <td>
                        <div class="table-product">
                            <img src="${imgUrl}" alt="Product" style="border: 1px solid var(--border-color);"/>
                            <div>
                                <div style="font-weight: 600">${p.name}</div>
                                <div style="font-size: 12px; color: var(--text-muted)">SKU: ${p.sku || "---"}</div>
                            </div>
                        </div>
                    </td>
                    <td>${p.category}</td>
                    <td style="font-weight: 600;">${p.price.toLocaleString("vi-VN")}đ</td>
                    <td><strong>${p.sold.toLocaleString("vi-VN")}</strong></td>
                    <td><span style="color: ${stockColor}">${p.stock} sản phẩm</span></td>
                </tr>
            `;
        })
            .join("");
    }
}
