import { CategoryService } from "../Services/CategoryService.js";
import { CategoryView } from "../Views/CategoryView.js";

export class CategoryController {
  constructor(
    private service: CategoryService,
    private view: CategoryView,
  ) {
    this.init();
  }

  async init() {
    const categories = await this.service.getAllCategories();
    this.view.render(categories);
  }
}
