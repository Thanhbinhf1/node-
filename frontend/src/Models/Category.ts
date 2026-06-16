export class CategoryModel {
  id: string;
  name: string;
  slug?: string;
  image?: string;

  // Phải có constructor thì mới dùng "new CategoryModel(id, name)" được
  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}
