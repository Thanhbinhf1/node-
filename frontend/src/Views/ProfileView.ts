import { UserProfile } from "../Models/Profile.js";

export class ProfileView {
  // Các ô input & text
  private nameInput = document.getElementById(
    "profile-name",
  ) as HTMLInputElement;
  private addressInput = document.getElementById(
    "profile-address",
  ) as HTMLTextAreaElement;

  // Nút & Ảnh
  private btnUpdate = document.getElementById(
    "btn-update-profile",
  ) as HTMLButtonElement;
  private avatarInput = document.getElementById(
    "avatar-input",
  ) as HTMLInputElement;
  private bigAvatar = document.getElementById(
    "profile-avatar-preview",
  ) as HTMLImageElement;
  private sideAvatar = document.getElementById(
    "side-avatar",
  ) as HTMLImageElement;

  // Biến tạm lưu chuỗi base64 của ảnh mới
  private currentBase64Avatar: string = "";

  // 1. In dữ liệu ra màn hình khi load trang
  renderProfileData(profile: UserProfile) {
    if (this.nameInput) this.nameInput.value = profile.fullName;
    if (this.addressInput) this.addressInput.value = profile.address;

    // Cập nhật ảnh ở cả avatar lớn và avatar nhỏ bên sidebar
    if (this.bigAvatar) this.bigAvatar.src = profile.avatarUrl;
    if (this.sideAvatar) this.sideAvatar.src = profile.avatarUrl;
  }

  // 2. Bắt sự kiện chọn ảnh (Preview Avatar)
  bindAvatarChange() {
    this.avatarInput?.addEventListener("change", (e) => {
      const input = e.target as HTMLInputElement;
      if (input.files && input.files[0]) {
        const file = input.files[0];

        // Validate dung lượng (1MB)
        if (file.size > 1048576) {
          alert("File ảnh quá lớn! Vui lòng chọn ảnh dưới 1MB.");
          input.value = "";
          return;
        }

        // Đọc file để hiện Preview
        const reader = new FileReader();
        reader.onload = (event) => {
          const base64String = event.target?.result as string;
          this.currentBase64Avatar = base64String; // Lưu lại để tí đưa cho Controller

          if (this.bigAvatar) this.bigAvatar.src = base64String;
          if (this.sideAvatar) this.sideAvatar.src = base64String;
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // 3. Bắt sự kiện bấm nút Lưu
  bindUpdateEvent(
    handler: (data: {
      fullName: string;
      address: string;
      newAvatar: string;
    }) => void,
  ) {
    this.btnUpdate?.addEventListener("click", () => {
      const fullName = this.nameInput?.value.trim() || "";
      const address = this.addressInput?.value.trim() || "";

      handler({ fullName, address, newAvatar: this.currentBase64Avatar });
    });
  }

  // 4. Trạng thái nút Loading
  showLoading(isLoading: boolean) {
    if (!this.btnUpdate) return;
    this.btnUpdate.innerText = isLoading ? "Đang lưu..." : "Lưu thay đổi";
    this.btnUpdate.disabled = isLoading;
  }
}
