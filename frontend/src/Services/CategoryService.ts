import { CategoryModel } from "../Models/Category.js";

export class CategoryService {
  private apiUrl = "http://localhost:3000/api/categories";

  async getAllCategories(): Promise<CategoryModel[]> {
    try {
      const response = await fetch(this.apiUrl);
      if (!response.ok) return [];

      const data = await response.json();

      return data.map((item: any) => ({
        id: item._id, // Bắt buộc ID của MongoDB
        name: item.name,
        slug: item.slug || item.name.toLowerCase().replace(/ /g, "-"),
        image:
          item.image ||
          "https://dummyimage.com/300x300/cccccc/000000&text=No+Image",
      }));
    } catch (error) {
      console.error("Lỗi lấy danh mục:", error);
      return [];
    }
  }
}
