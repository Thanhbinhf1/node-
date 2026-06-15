export class ProfileView {
    nameInput = document.getElementById("profile-name");
    addressInput = document.getElementById("profile-address");
    btnUpdate = document.getElementById("btn-update-profile");
    avatarInput = document.getElementById("avatar-input");
    bigAvatar = document.getElementById("profile-avatar-preview");
    sideAvatar = document.getElementById("side-avatar");
    currentBase64Avatar = "";
    renderProfileData(profile) {
        if (this.nameInput)
            this.nameInput.value = profile.fullName;
        if (this.addressInput)
            this.addressInput.value = profile.address;
        if (this.bigAvatar)
            this.bigAvatar.src = profile.avatarUrl;
        if (this.sideAvatar)
            this.sideAvatar.src = profile.avatarUrl;
    }
    bindAvatarChange() {
        this.avatarInput?.addEventListener("change", (e) => {
            const input = e.target;
            if (input.files && input.files[0]) {
                const file = input.files[0];
                if (file.size > 1048576) {
                    alert("File ảnh quá lớn! Vui lòng chọn ảnh dưới 1MB.");
                    input.value = "";
                    return;
                }
                const reader = new FileReader();
                reader.onload = (event) => {
                    const base64String = event.target?.result;
                    this.currentBase64Avatar = base64String;
                    if (this.bigAvatar)
                        this.bigAvatar.src = base64String;
                    if (this.sideAvatar)
                        this.sideAvatar.src = base64String;
                };
                reader.readAsDataURL(file);
            }
        });
    }
    bindUpdateEvent(handler) {
        this.btnUpdate?.addEventListener("click", () => {
            const fullName = this.nameInput?.value.trim() || "";
            const address = this.addressInput?.value.trim() || "";
            handler({ fullName, address, newAvatar: this.currentBase64Avatar });
        });
    }
    showLoading(isLoading) {
        if (!this.btnUpdate)
            return;
        this.btnUpdate.innerText = isLoading ? "Đang lưu..." : "Lưu thay đổi";
        this.btnUpdate.disabled = isLoading;
    }
}
