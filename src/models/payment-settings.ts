import { IPaymentSettings } from "@/interfaces/payment-settings";
import { IImage } from "@/interfaces/image";

export class PaymentSettings implements IPaymentSettings {
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

  constructor(json: IPaymentSettings) {
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
  }

  static fromJson(json: any) {
    return new PaymentSettings(json);
  }
}
