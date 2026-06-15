export class AdminCouponView {
    listView = document.getElementById("coupon-list-view");
    formView = document.getElementById("coupon-form-view");
    tableBody = document.getElementById("coupon-table-body");
    btnShowAdd = document.getElementById("btn-show-add");
    btnBackList = document.getElementById("btn-back-list");
    btnSave = document.getElementById("btn-save-coupon");
    currentEditId = null;
    constructor() {
        if (this.formView)
            this.formView.style.display = "none";
        this.initUIEvents();
    }
    initUIEvents() {
        this.btnShowAdd?.addEventListener("click", () => {
            this.clearForm();
            if (this.listView)
                this.listView.style.display = "none";
            if (this.formView)
                this.formView.style.display = "block";
        });
        this.btnBackList?.addEventListener("click", () => {
            if (this.formView)
                this.formView.style.display = "none";
            if (this.listView)
                this.listView.style.display = "block";
        });
    }
    getFormData() {
        return {
            code: document.getElementById("cpn-code")?.value
                .trim()
                .toUpperCase(),
            discountType: document.getElementById("cpn-type")
                ?.value,
            discountValue: parseInt(document.getElementById("cpn-value")?.value ||
                "0"),
            minOrderAmount: parseInt(document.getElementById("cpn-min-order")?.value ||
                "0"),
            usageLimit: parseInt(document.getElementById("cpn-limit")?.value ||
                "0"),
            expiryDate: document.getElementById("cpn-expiry")
                ?.value,
            status: document.getElementById("cpn-status")
                ?.value,
        };
    }
    fillForm(data, id) {
        this.currentEditId = id;
        document.getElementById("cpn-code").value =
            data.code || "";
        document.getElementById("cpn-type").value =
            data.discountType || "percentage";
        document.getElementById("cpn-value").value =
            data.discountValue || "";
        document.getElementById("cpn-min-order").value =
            data.minOrderAmount || "";
        document.getElementById("cpn-limit").value =
            data.usageLimit || "";
        if (data.expiryDate) {
            const dateObj = new Date(data.expiryDate);
            const formattedDate = dateObj.toISOString().slice(0, 16);
            document.getElementById("cpn-expiry").value =
                formattedDate;
        }
        document.getElementById("cpn-status").value =
            data.status || "Active";
        const formTitle = document.getElementById("form-title");
        if (formTitle)
            formTitle.innerText = "Sửa Mã giảm giá";
        if (this.btnSave)
            this.btnSave.innerHTML = `<i class="fa-solid fa-floppy-disk"></i> Cập nhật Mã`;
        if (this.listView)
            this.listView.style.display = "none";
        if (this.formView)
            this.formView.style.display = "block";
    }
    clearForm() {
        this.currentEditId = null;
        const inputs = [
            "cpn-code",
            "cpn-value",
            "cpn-min-order",
            "cpn-limit",
            "cpn-expiry",
        ];
        inputs.forEach((id) => {
            const el = document.getElementById(id);
            if (el)
                el.value = "";
        });
        const formTitle = document.getElementById("form-title");
        if (formTitle)
            formTitle.innerText = "Thêm Mã giảm giá mới";
        if (this.btnSave)
            this.btnSave.innerHTML = `<i class="fa-solid fa-floppy-disk"></i> Lưu Mã giảm giá`;
    }
    renderTable(coupons) {
        if (!this.tableBody)
            return;
        this.tableBody.innerHTML = coupons
            .map((c) => {
            const safeValue = c.discountValue || 0;
            const discountStr = c.discountType === "percentage"
                ? `${safeValue}%`
                : `${safeValue.toLocaleString("vi-VN")}đ`;
            let statusClass = "status-active";
            let displayStatus = c.status;
            if (c.status === "Expired" ||
                (c.usageLimit && c.usageCount >= c.usageLimit)) {
                statusClass = "status-expired";
                displayStatus = "Hết lượt/Hết hạn";
            }
            else if (c.status === "Hidden") {
                statusClass = "status-hidden";
                displayStatus = "Tạm ẩn";
            }
            else if (c.status === "Active") {
                displayStatus = "Đang chạy";
            }
            const safeDate = c.expiryDate
                ? new Date(c.expiryDate).toLocaleString("vi-VN")
                : "Không thời hạn";
            return `
        <tr>
          <td><span class="coupon-code">${c.code}</span></td>
          <td style="font-weight: 600;">Giảm ${discountStr}</td>
          <td>${c.usageCount || 0} / ${c.usageLimit || "∞"}</td>
          <td>${safeDate}</td>
          <td><span class="status-badge ${statusClass}">${displayStatus}</span></td>
          <td>
            <button class="btn-edit" data-id="${c.id}" style="cursor:pointer; color:#3b82f6; border:none; background:none; font-size: 16px; margin-right: 10px;"><i class="fa-solid fa-pen-to-square"></i></button>
            <button class="btn-delete" data-id="${c.id}" style="cursor:pointer; color:#ef4444; border:none; background:none; font-size: 16px;"><i class="fa-solid fa-trash"></i></button>
          </td>
        </tr>
      `;
        })
            .join("");
    }
    bindActionEvents(deleteHandler, editHandler) {
        this.tableBody?.addEventListener("click", (e) => {
            const target = e.target;
            const btnDelete = target.closest(".btn-delete");
            if (btnDelete) {
                const id = btnDelete.getAttribute("data-id") || "";
                if (confirm(`Bạn có chắc chắn muốn xóa mã giảm giá này vĩnh viễn?`))
                    deleteHandler(id);
            }
            const btnEdit = target.closest(".btn-edit");
            if (btnEdit) {
                const id = btnEdit.getAttribute("data-id") || "";
                editHandler(id);
            }
        });
    }
    bindSaveEvent(handler) {
        this.btnSave?.addEventListener("click", () => handler());
    }
}
