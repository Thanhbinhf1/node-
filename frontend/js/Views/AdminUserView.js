export class AdminUserView {
    tableBody = document.getElementById("user-table-body");
    listView = document.getElementById("user-list-view");
    formView = document.getElementById("user-form-view");
    currentEditId = null;
    getFormData() {
        const formData = new FormData();
        formData.append("fullName", document.getElementById("user-fullname").value);
        formData.append("email", document.getElementById("user-email").value);
        formData.append("phone", document.getElementById("user-phone").value);
        formData.append("address", document.getElementById("user-address").value);
        formData.append("role", document.getElementById("user-role").value);
        formData.append("status", document.getElementById("user-status").value);
        const avatarInput = document.getElementById("avatar-input");
        if (avatarInput.files && avatarInput.files[0]) {
            formData.append("avatar", avatarInput.files[0]);
        }
        return formData;
    }
    constructor() {
        this.initUIEvents();
    }
    btnSaveUser = document.getElementById("btn-save-user");
    initUIEvents() {
        document
            .getElementById("btn-show-add")
            ?.addEventListener("click", () => this.clearForm());
        document.getElementById("btn-back-list")?.addEventListener("click", () => {
            if (this.listView)
                this.listView.style.display = "block";
            if (this.formView)
                this.formView.style.display = "none";
        });
    }
    bindSaveEvent(handler) {
        document
            .getElementById("btn-save-user")
            ?.addEventListener("click", () => handler());
    }
    fillForm(u, id) {
        this.currentEditId = id;
        document.getElementById("user-fullname").value =
            u.fullName;
        document.getElementById("user-email").value = u.email;
        document.getElementById("user-phone").value =
            u.phone || "";
        document.getElementById("user-address").value =
            u.address || "";
        document.getElementById("user-role").value = u.role;
        document.getElementById("user-status").value =
            u.status;
        this.listView.style.display = "none";
        this.formView.style.display = "block";
    }
    clearForm() {
        this.currentEditId = null;
        document.getElementById("user-fullname").value = "";
        document.getElementById("user-email").value = "";
        this.listView.style.display = "block";
        this.formView.style.display = "none";
    }
    bindActionEvents(deleteHandler, editHandler) {
        this.tableBody?.addEventListener("click", (e) => {
            const target = e.target;
            const btnDelete = target.closest(".btn-delete");
            const btnEdit = target.closest(".btn-edit");
            if (btnDelete) {
                const id = btnDelete.getAttribute("data-id") || "";
                if (confirm("Bạn có chắc chắn muốn xóa?"))
                    deleteHandler(id);
            }
            if (btnEdit) {
                const id = btnEdit.getAttribute("data-id") || "";
                editHandler(id);
            }
        });
    }
    renderTable(users) {
        if (!this.tableBody)
            return;
        this.tableBody.innerHTML = users
            .map((u) => `
      <tr>
        <td>${u.fullName}</td>
        <td>${u.email}</td>
        <td>${u.role}</td>
        <td>${u.status}</td>
        <td>
          <button class="btn-edit" data-id="${u.id}">Sửa</button>
          <button class="btn-delete" data-id="${u.id}">Xóa</button>
        </td>
      </tr>
    `)
            .join("");
    }
}
