import { ProfileService } from "../Services/ProfileService.js";
import { ProfileView } from "../Views/ProfileView.js";

export class ProfileController {
  constructor(
    private service: ProfileService,
    private view: ProfileView,
  ) {
    this.init();

    // Lắng nghe sự kiện từ View
    this.view.bindAvatarChange();
    this.view.bindUpdateEvent(this.handleUpdateProfile.bind(this));
  }

  // Chạy khi vừa vào trang
  async init() {
    const profileData = await this.service.getProfile();
    this.view.renderProfileData(profileData);
  }

  // Xử lý khi bấm nút "Lưu thay đổi"
  async handleUpdateProfile(data: {
    fullName: string;
    address: string;
    newAvatar: string;
  }) {
    if (!data.fullName) {
      alert("Họ và tên không được để trống!");
      return;
    }

    this.view.showLoading(true);

    const result = await this.service.updateProfile(data);

    this.view.showLoading(false);

    if (result.success) {
      alert(result.msg);
      // Có thể load lại trang hoặc cập nhật UI nếu cần
    }
  }
}
