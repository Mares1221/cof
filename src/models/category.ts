import { ICategory } from "@/interfaces/category";

export class Category implements ICategory {
  _id: string;
  createdBy: string;
  icon: string;
  customer: string;
  type: string;
  deletedAt: null;
  parents: any[];
  parent: null;
  children: any[];
  name: string;
  sort: number;
  childCount: number;
  provider: string;
  createdAt: string;
  updatedAt: string;

  constructor(json: ICategory) {
    this._id = json._id;
    this.createdBy = json.createdBy;
    this.icon = json.icon;
    this.customer = json.customer;
    this.type = json.type;
    this.deletedAt = json.deletedAt;
    this.parents = json.parents;
    this.parent = json.parent;
    this.children = json.children;
    this.name = json.name;
    this.sort = json.sort;
    this.childCount = json.childCount;
    this.provider = json.provider;
    this.createdAt = json.createdAt;
    this.updatedAt = json.updatedAt;
  }

  static fromJson(json: ICategory) {
    return new Category(json);
  }
}
