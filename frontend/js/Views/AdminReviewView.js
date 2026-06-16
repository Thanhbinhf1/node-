export class AdminReviewView {
    tableBody = document.getElementById("review-table-body");
    renderTable(reviews) {
        if (!this.tableBody)
            return;
        this.tableBody.innerHTML = reviews
            .map((r) => {
            const avatarUrl = r.userAvatar
                ? r.userAvatar.startsWith("http")
                    ? r.userAvatar
                    : `http://localhost:3000${r.userAvatar}`
                : "https://via.placeholder.com/40";
            const currentStatus = r.status;
            let statusClass = "status-pending";
            let statusText = "Chờ duyệt";
            if (currentStatus === "Approved" || currentStatus === "Đã duyệt") {
                statusClass = "status-approved";
                statusText = "Đã duyệt";
            }
            else if (currentStatus === "Hidden" || currentStatus === "Đã ẩn") {
                statusClass = "status-hidden";
                statusText = "Đã ẩn";
            }
            else if (currentStatus === "Pending") {
                statusText = "Chờ duyệt";
            }
            let starsHtml = "";
            for (let i = 1; i <= 5; i++) {
                if (i <= r.rating) {
                    starsHtml += `<i class="fa-solid fa-star"></i>`;
                }
                else {
                    starsHtml += `<i class="fa-regular fa-star"></i>`;
                }
            }
            return `
          <tr>
            <td>
              <div style="display: flex; align-items: center; gap: 12px;">
                <img src="${avatarUrl}" style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover; border: 1px solid var(--border-color);">
                <div>
                  <div style="font-weight: 600;">${r.userName}</div>
                  <div style="font-size: 12px; color: var(--text-muted);">${r.date}</div>
                </div>
              </div>
            </td>
            <td style="font-weight: 500;">${r.productName}</td>
            <td>
              <div class="stars">${starsHtml}</div>
              <div class="review-comment">${r.comment}</div>
            </td>
            <td><span class="status-badge ${statusClass}">${statusText}</span></td>
            <td>
              <button class="action-btn btn-approve" data-id="${r.id}" title="Duyệt hiển thị"><i class="fa-solid fa-check-circle"></i></button>
              <button class="action-btn btn-hide" data-id="${r.id}" title="Ẩn đánh giá"><i class="fa-solid fa-eye-slash"></i></button>
              <button class="action-btn btn-delete" data-id="${r.id}" title="Xóa vĩnh viễn"><i class="fa-solid fa-trash"></i></button>
            </td>
          </tr>
        `;
        })
            .join("");
    }
    bindActionEvents(approveHandler, hideHandler, deleteHandler) {
        this.tableBody?.addEventListener("click", (e) => {
            const target = e.target;
            const btnApprove = target.closest(".btn-approve");
            if (btnApprove) {
                const id = btnApprove.getAttribute("data-id") || "";
                if (confirm("Duyệt đánh giá này cho phép hiển thị lên Website?")) {
                    approveHandler(id);
                }
            }
            const btnHide = target.closest(".btn-hide");
            if (btnHide) {
                const id = btnHide.getAttribute("data-id") || "";
                if (confirm("Ẩn đánh giá này khỏi Website?")) {
                    hideHandler(id);
                }
            }
            const btnDelete = target.closest(".btn-delete");
            if (btnDelete) {
                const id = btnDelete.getAttribute("data-id") || "";
                if (confirm("Xóa vĩnh viễn đánh giá này khỏi cơ sở dữ liệu?")) {
                    deleteHandler(id);
                }
            }
        });
    }
}
