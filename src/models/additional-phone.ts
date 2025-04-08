import { IAdditionalPhone } from "@/interfaces/additional-phone";
import { IImage } from "@/interfaces/image";

export class AdditionalPhone implements IAdditionalPhone {
  _id: string;
  customer: string;
  name: string;
  phone: string;
  phoneSecond: string;
  address: string;
  sort: number;
  image: IImage | null;
  schedule: {
    day: string;
    startTime: string;
    endTime: string;
    _id: string;
  }[];
  createdAt: string;
  updatedAt: string;

  constructor(json: IAdditionalPhone) {
    this._id = json._id;
    this.customer = json.customer;
    this.name = json.name;
    this.phone = json.phone;
    this.phoneSecond = json.phoneSecond;
    this.address = json.address;
    this.sort = json.sort;
    this.image = json.image;
    this.schedule = json.schedule;
    this.createdAt = json.createdAt;
    this.updatedAt = json.updatedAt;
  }

  static fromJson(json: any) {
    return new AdditionalPhone(json);
  }
}
