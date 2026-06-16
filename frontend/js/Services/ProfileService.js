export class ProfileService {
    apiUrl = "http://localhost:3000/api/users";
    getUserId() {
        return localStorage.getItem("userId");
    }
    async getProfile() {
        const userId = this.getUserId();
        if (!userId)
            return null;
        try {
            const response = await fetch(`${this.apiUrl}/${userId}`);
            if (!response.ok)
                return null;
            const data = await response.json();
            return {
                id: data._id,
                username: data.email.split("@")[0],
                fullName: data.fullName,
                email: data.email,
                phone: data.phone || "Chưa cập nhật",
                address: data.address || "Chưa cập nhật",
                avatarUrl: data.avatar ||
                    "https://dummyimage.com/200x200/cccccc/000000&text=Avatar",
            };
        }
        catch (error) {
            console.error("Lỗi lấy thông tin cá nhân:", error);
            return null;
        }
    }
    async updateProfile(updatedData) {
        const userId = this.getUserId();
        if (!userId)
            return { success: false, msg: "Vui lòng đăng nhập lại!" };
        try {
            const response = await fetch(`${this.apiUrl}/${userId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    fullName: updatedData.fullName,
                    address: updatedData.address,
                    avatar: updatedData.newAvatar,
                }),
            });
            if (response.ok) {
                return { success: true, msg: "Cập nhật hồ sơ thành công!" };
            }
            else {
                const errData = await response.json();
                return { success: false, msg: errData.message || "Cập nhật thất bại!" };
            }
        }
        catch (error) {
            return { success: false, msg: "Không thể kết nối đến máy chủ!" };
        }
    }
}
