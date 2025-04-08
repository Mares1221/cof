import { IComplex } from "@/interfaces/complex";

export class Complex implements IComplex {
  buildingCount: number;
  createdAt: string;
  customer: string;
  deletedAt: string;
  name: string;
  totalApartment: number;
  totalParking: number;
  totalWarehouse: number;
  updatedAt: string;
  __v: string;
  _id: string;
  index: number;

  constructor({
    buildingCount,
    createdAt,
    customer,
    deletedAt,
    name,
    totalApartment,
    totalParking,
    totalWarehouse,
    updatedAt,
    __v,
    _id,
    index,
  }: IComplex) {
    this.buildingCount = buildingCount;
    this.createdAt = createdAt;
    this.customer = customer;
    this.deletedAt = deletedAt;
    this.name = name;
    this.totalApartment = totalApartment;
    this.totalParking = totalParking;
    this.totalWarehouse = totalWarehouse;
    this.updatedAt = updatedAt;
    this.__v = __v;
    this._id = _id;
    this.index = index;
  }

  static fromJson(json: any) {
    return new Complex(json);
  }
}
