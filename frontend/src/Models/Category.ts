export class CategoryModel {
  id: number;
  name: string;
  slug?: string;
  image?: string;

  // Phải có constructor thì mới dùng "new CategoryModel(id, name)" được
  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}
