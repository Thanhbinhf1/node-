import { CategoryModel } from "../Models/Category.js";

export class CategoryView {
  render(categories: CategoryModel[]) {
    console.log("Đang in danh mục ra màn hình:", categories);
    // Logic in ra HTML tương tự ProductView
  }
}
