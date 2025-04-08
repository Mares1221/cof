import { ICustomer } from "@/interfaces/customer";

export class Customer implements ICustomer {
  _id: string;
  name: string;
  email: string;
  phone: string;
  expireDate: string;
  startDate: string;
  registerNo: string;
  status: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;

  constructor(json: ICustomer) {
    this._id = json._id;
    this.name = json.name;
    this.email = json.email;
    this.phone = json.phone;
    this.expireDate = json.expireDate;
    this.startDate = json.startDate;
    this.registerNo = json.registerNo;
    this.status = json.status;
    this.isActive = json.isActive;
    this.createdAt = json.createdAt;
    this.updatedAt = json.updatedAt;
  }

  static fromJson(json: ICustomer) {
    return new Customer(json);
  }
}
