import { UserProfile } from "../Models/Profile.js";

export class ProfileService {
  // Dữ liệu giả lập (Sau này lấy dựa trên Token đăng nhập)
  private mockProfile: UserProfile = {
    id: 1,
    username: "phat.fpt",
    fullName: "Nguyễn Tấn Phát", // Tên lấy từ Profile cũ của ông
    email: "phat.fpt*****@gmail.com",
    phone: "*********67",
    address: "Khu Công Nghệ Cao, Quận 9, TP. Hồ Chí Minh",
    avatarUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200",
  };

  // Lấy thông tin
  async getProfile(): Promise<UserProfile> {
    // Giả lập delay mạng
    return new Promise((resolve) =>
      setTimeout(() => resolve({ ...this.mockProfile }), 500),
    );
  }

  // Cập nhật thông tin
  async updateProfile(updatedData: {
    fullName: string;
    address: string;
    newAvatar?: string;
  }): Promise<{ success: boolean; msg: string }> {
    console.log("Đang gửi API cập nhật:", updatedData);

    return new Promise((resolve) => {
      setTimeout(() => {
        this.mockProfile.fullName = updatedData.fullName;
        this.mockProfile.address = updatedData.address;
        if (updatedData.newAvatar) {
          this.mockProfile.avatarUrl = updatedData.newAvatar;
        }
        resolve({ success: true, msg: "Cập nhật hồ sơ thành công!" });
      }, 1000);
    });
  }
}
