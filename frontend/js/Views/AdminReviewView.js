export class AdminUserView {
    listView = document.getElementById("user-list-view");
    formView = document.getElementById("user-form-view");
    tableBody = document.getElementById("user-table-body");
    btnShowAdd = document.getElementById("btn-show-add");
    btnBackList = document.getElementById("btn-back-list");
    btnSaveUser = document.getElementById("btn-save-user");
    avatarUploadZone = document.getElementById("avatar-upload-zone");
    avatarInput = document.getElementById("avatar-input");
    avatarPreview = document.getElementById("avatar-preview");
    avatarPlaceholder = document.getElementById("avatar-placeholder");
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
        this.avatarUploadZone?.addEventListener("click", () => this.avatarInput?.click());
        this.avatarInput?.addEventListener("change", (e) => {
            const input = e.target;
            if (input.files && input.files[0]) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    if (this.avatarPreview && this.avatarPlaceholder) {
                        this.avatarPreview.src = event.target?.result;
                        this.avatarPreview.style.display = "block";
                        this.avatarPlaceholder.style.display = "none";
                    }
                };
                reader.readAsDataURL(input.files[0]);
            }
        });
    }
    getFormData() {
        const formData = new FormData();
        const fullName = document.getElementById("user-fullname")?.value.trim();
        const email = document.getElementById("user-email")?.value.trim();
        const phone = document.getElementById("user-phone")?.value.trim();
        const address = document.getElementById("user-address")?.value.trim();
        const password = document.getElementById("user-password")?.value;
        const role = document.getElementById("user-role")
            ?.value;
        const status = document.getElementById("user-status")
            ?.value;
        if (fullName)
            formData.append("fullName", fullName);
        if (email)
            formData.append("email", email);
        if (phone)
            formData.append("phone", phone);
        if (address)
            formData.append("address", address);
        if (role)
            formData.append("role", role);
        if (status)
            formData.append("status", status);
        if (password)
            formData.append("password", password);
        if (this.avatarInput &&
            this.avatarInput.files &&
            this.avatarInput.files[0]) {
            formData.append("avatar", this.avatarInput.files[0]);
        }
        return formData;
    }
    fillForm(userData, id) {
        this.currentEditId = id;
        document.getElementById("user-fullname").value =
            userData.fullName || "";
        document.getElementById("user-email").value =
            userData.email || "";
        document.getElementById("user-phone").value =
            userData.phone || "";
        document.getElementById("user-address").value =
            userData.address || "";
        document.getElementById("user-password").value = "";
        const roleSelect = document.getElementById("user-role");
        if (roleSelect)
            roleSelect.value = userData.role || "Customer";
        const statusSelect = document.getElementById("user-status");
        if (statusSelect)
            statusSelect.value = userData.status || "Active";
        if (userData.avatar && this.avatarPreview && this.avatarPlaceholder) {
            this.avatarPreview.src = userData.avatar.startsWith("http")
                ? userData.avatar
                : `http://localhost:3000${userData.avatar}`;
            this.avatarPreview.style.display = "block";
            this.avatarPlaceholder.style.display = "none";
        }
        else {
            this.avatarPreview.style.display = "none";
            this.avatarPlaceholder.style.display = "block";
        }
        const formTitle = document.getElementById("form-title");
        if (formTitle)
            formTitle.innerText = "Sửa thông tin Tài khoản";
        if (this.btnSaveUser)
            this.btnSaveUser.innerHTML =
                '<i class="fa-solid fa-floppy-disk"></i> Cập nhật Tài khoản';
        if (this.listView)
            this.listView.style.display = "none";
        if (this.formView)
            this.formView.style.display = "block";
    }
    clearForm() {
        this.currentEditId = null;
        const inputs = [
            "user-fullname",
            "user-email",
            "user-phone",
            "user-address",
            "user-password",
        ];
        inputs.forEach((id) => {
            const el = document.getElementById(id);
            if (el)
                el.value = "";
        });
        if (this.avatarInput)
            this.avatarInput.value = "";
        if (this.avatarPreview && this.avatarPlaceholder) {
            this.avatarPreview.src = "";
            this.avatarPreview.style.display = "none";
            this.avatarPlaceholder.style.display = "block";
        }
        const formTitle = document.getElementById("form-title");
        if (formTitle)
            formTitle.innerText = "Thêm Tài khoản mới";
        if (this.btnSaveUser)
            this.btnSaveUser.innerHTML =
                '<i class="fa-solid fa-floppy-disk"></i> Lưu Tài khoản';
    }
    renderTable(users) {
        if (!this.tableBody)
            return;
        this.tableBody.innerHTML = users
            .map((u) => {
            const avatarUrl = u.avatar
                ? u.avatar.startsWith("http")
                    ? u.avatar
                    : `http://localhost:3000${u.avatar}`
                : "https://via.placeholder.com/40";
            const currentStatus = u.status;
            const currentRole = u.role;
            const isBanned = currentStatus === "Banned" || currentStatus === "Khóa tài khoản";
            const statusText = isBanned ? "Đã khóa" : "Hoạt động";
            const statusColor = isBanned ? "#ef4444" : "#10b981";
            const isAdmin = currentRole === "Admin" ||
                currentRole === "SuperAdmin" ||
                currentRole === "Quản trị viên";
            const roleText = isAdmin ? "Quản trị viên" : "Khách hàng";
            const roleBadge = isAdmin
                ? "background: rgba(139, 92, 246, 0.1); color: #8b5cf6;"
                : "background: rgba(59, 130, 246, 0.1); color: #3b82f6;";
            return `
                <tr>
                    <td>
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <img src="${avatarUrl}" style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover; border: 1px solid var(--border-color);">
                            <div>
                                <div style="font-weight: 600;">${u.fullName}</div>
                                <div style="font-size: 12px; color: var(--text-muted);">${u.email}</div>
                            </div>
                        </div>
                    </td>
                    <td>${u.phone || "---"}</td>
                    <td><span style="padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: 600; ${roleBadge}">${roleText}</span></td>
                    <td style="color: ${statusColor}; font-weight: 600;">${statusText}</td>
                    <td style="color: var(--text-muted);">${u.joinDate || "---"}</td>
                    <td>
                        <button class="btn-edit" data-id="${u.id}" style="cursor:pointer; color:#3b82f6; border:none; background:none; font-size: 16px; margin-right: 10px;" title="Sửa"><i class="fa-solid fa-pen-to-square"></i></button>
                        <button class="btn-delete" data-id="${u.id}" style="cursor:pointer; color:#ef4444; border:none; background:none; font-size: 16px;" title="Khóa/Xóa"><i class="fa-solid fa-ban"></i></button>
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
                if (confirm(`Sếp có chắc muốn cấm cửa (Ban) hoặc xóa tài khoản này không?`))
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
        this.btnSaveUser?.addEventListener("click", () => handler());
    }
}
