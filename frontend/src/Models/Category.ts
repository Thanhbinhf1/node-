export class CategoryModel {
  id: string;
  name: string;
  slug?: string;
  image?: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}
