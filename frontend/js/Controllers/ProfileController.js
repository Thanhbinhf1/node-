export class ProfileController {
    service;
    view;
    constructor(service, view) {
        this.service = service;
        this.view = view;
        this.init();
        this.view.bindAvatarChange();
        this.view.bindUpdateEvent(this.handleUpdateProfile.bind(this));
    }
    async init() {
        const profileData = await this.service.getProfile();
        this.view.renderProfileData(profileData);
    }
    async handleUpdateProfile(data) {
        if (!data.fullName) {
            alert("Họ và tên không được để trống!");
            return;
        }
        this.view.showLoading(true);
        const result = await this.service.updateProfile(data);
        this.view.showLoading(false);
        if (result.success) {
            alert(result.msg);
        }
    }
}
