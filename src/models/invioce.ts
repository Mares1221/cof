import { IInvoice } from "@/interfaces/invoice";
import { IImage } from "@/interfaces/image";

export class Invoice implements IInvoice {
  _id: string;
  customer: string;
  name: string;
  amount: number;
  description: string;
  isActive: boolean;
  isDefault: boolean;
  detailedList: {
    name: string;
    amount: number;
    _id: string;
  }[];
  file: IImage | null;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  userCount: number;
  constructor(json: IInvoice) {
    this._id = json._id;
    this.customer = json.customer;
    this.name = json.name;
    this.amount = json.amount;
    this.description = json.description;
    this.isActive = json.isActive;
    this.isDefault = json.isDefault;
    this.detailedList = json.detailedList;
    this.file = json.file;
    this.deletedAt = json.deletedAt;
    this.createdAt = json.createdAt;
    this.updatedAt = json.updatedAt;
    this.userCount = json.userCount;
  }

  static fromJson(json: any) {
    return new Invoice(json);
  }
}
