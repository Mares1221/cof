import { ICustomer } from "@/interfaces/customer";

export class Customer implements ICustomer {
  _id: string;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
  deletedBy: string;
  deletedAt: string;
  name: string;
  logo: string;
  logoThumbnail: string;
  description: string;

  constructor(json: ICustomer) {
    this._id = json._id;
    this.createdBy = json.createdBy;
    this.createdAt = json.createdAt;
    this.updatedBy = json.updatedBy;
    this.updatedAt = json.updatedAt;
    this.deletedBy = json.deletedBy;
    this.deletedAt = json.deletedAt;
    this.name = json.name;
    this.logo = json.logo;
    this.logoThumbnail = json.logoThumbnail;
    this.description = json.description;
  }

  static fromJson(json: any) {
    return new Customer(json);
  }
}
