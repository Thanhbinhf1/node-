import { AdminUser } from "../Models/AdminUser.js";

export class AdminUserView {
  private tableBody = document.getElementById("user-table-body");
  private listView = document.getElementById("user-list-view");
  private formView = document.getElementById("user-form-view");

  public currentEditId: string | null = null;

  // Lấy dữ liệu từ form
  public getFormData(): FormData {
    const formData = new FormData();
    formData.append(
      "fullName",
      (document.getElementById("user-fullname") as HTMLInputElement).value,
    );
    formData.append(
      "email",
      (document.getElementById("user-email") as HTMLInputElement).value,
    );
    formData.append(
      "phone",
      (document.getElementById("user-phone") as HTMLInputElement).value,
    );
    formData.append(
      "address",
      (document.getElementById("user-address") as HTMLTextAreaElement).value,
    );
    formData.append(
      "role",
      (document.getElementById("user-role") as HTMLSelectElement).value,
    );
    formData.append(
      "status",
      (document.getElementById("user-status") as HTMLSelectElement).value,
    );

    const avatarInput = document.getElementById(
      "avatar-input",
    ) as HTMLInputElement;
    if (avatarInput.files && avatarInput.files[0]) {
      formData.append("avatar", avatarInput.files[0]);
    }
    return formData;
  }
  constructor() {
    this.initUIEvents();
  }
  private btnSaveUser = document.getElementById("btn-save-user");
  private initUIEvents() {
    document
      .getElementById("btn-show-add")
      ?.addEventListener("click", () => this.clearForm());
    document.getElementById("btn-back-list")?.addEventListener("click", () => {
      if (this.listView) this.listView.style.display = "block";
      if (this.formView) this.formView.style.display = "none";
    });
  }
  public bindSaveEvent(handler: () => void) {
    document
      .getElementById("btn-save-user")
      ?.addEventListener("click", () => handler());
  }
  // Điền dữ liệu vào form khi sửa
  public fillForm(u: AdminUser, id: string) {
    this.currentEditId = id;
    (document.getElementById("user-fullname") as HTMLInputElement).value =
      u.fullName;
    (document.getElementById("user-email") as HTMLInputElement).value = u.email;
    (document.getElementById("user-phone") as HTMLInputElement).value =
      u.phone || "";
    (document.getElementById("user-address") as HTMLTextAreaElement).value =
      u.address || "";
    (document.getElementById("user-role") as HTMLSelectElement).value = u.role;
    (document.getElementById("user-status") as HTMLSelectElement).value =
      u.status;

    this.listView!.style.display = "none";
    this.formView!.style.display = "block";
  }

  // Reset form
  public clearForm() {
    this.currentEditId = null;
    (document.getElementById("user-fullname") as HTMLInputElement).value = "";
    (document.getElementById("user-email") as HTMLInputElement).value = "";
    // ... reset các field khác
    this.listView!.style.display = "block";
    this.formView!.style.display = "none";
  }

  public bindActionEvents(
    deleteHandler: (id: string) => void,
    editHandler: (id: string) => void,
  ) {
    this.tableBody?.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      const btnDelete = target.closest(".btn-delete");
      const btnEdit = target.closest(".btn-edit");

      if (btnDelete) {
        const id = btnDelete.getAttribute("data-id") || "";
        if (confirm("Bạn có chắc chắn muốn xóa?")) deleteHandler(id);
      }
      if (btnEdit) {
        const id = btnEdit.getAttribute("data-id") || "";
        editHandler(id);
      }
    });
  }
  // Render bảng
  public renderTable(users: AdminUser[]) {
    if (!this.tableBody) return;
    this.tableBody.innerHTML = users
      .map(
        (u) => `
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
    `,
      )
      .join("");
  }
}
