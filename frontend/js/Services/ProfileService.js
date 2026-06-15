export class ProfileService {
    mockProfile = {
        id: 1,
        username: "phat.fpt",
        fullName: "Nguyễn Tấn Phát",
        email: "phat.fpt*****@gmail.com",
        phone: "*********67",
        address: "Khu Công Nghệ Cao, Quận 9, TP. Hồ Chí Minh",
        avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200",
    };
    async getProfile() {
        return new Promise((resolve) => setTimeout(() => resolve({ ...this.mockProfile }), 500));
    }
    async updateProfile(updatedData) {
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
