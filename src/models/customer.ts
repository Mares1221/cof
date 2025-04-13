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

  constructor({
    _id,
    createdBy,
    createdAt,
    updatedBy,
    updatedAt,
    deletedBy,
    deletedAt,
    name,
    logo,
    logoThumbnail,
    description,
  }: ICustomer) {
    this._id = _id;
    this.createdBy = createdBy;
    this.createdAt = createdAt;
    this.updatedBy = updatedBy;
    this.updatedAt = updatedAt;
    this.deletedBy = deletedBy;
    this.deletedAt = deletedAt;
    this.name = name;
    this.logo = logo;
    this.logoThumbnail = logoThumbnail;
    this.description = description;
  }

  static fromJson(json: any) {
    return new Customer(json);
  }
}
