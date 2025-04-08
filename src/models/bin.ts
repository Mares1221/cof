import { IBin } from "@/interfaces/bin";

export class Bin implements IBin {
  _id: string;
  name: string;
  code: string;
  customer: string;
  capacityType: string;
  type: string;
  capacity: string;
  address: string;
  apartmentComplex: string | null;
  building: string | null;
  apartment: string | null;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  lastWasteCollectionDate: string;

  constructor(json: IBin) {
    this._id = json._id;
    this.code = json.code;
    this.name = json.name;
    this.customer = json.customer;
    this.capacityType = json.capacityType;
    this.type = json.type;
    this.capacity = json.capacity;
    this.address = json.address;
    this.apartmentComplex = json.apartmentComplex;
    this.building = json.building;
    this.apartment = json.apartment;
    this.deletedAt = json.deletedAt;
    this.createdAt = json.createdAt;
    this.updatedAt = json.updatedAt;
    this.lastWasteCollectionDate = json.lastWasteCollectionDate;
  }

  static fromJson(json: IBin) {
    return new Bin(json);
  }
}
