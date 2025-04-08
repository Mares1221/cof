import { IBuilding } from "@/interfaces/building";
import { IComplex } from "@/interfaces/complex";

export class Building implements IBuilding {
  apartmentComplex: IComplex;
  buildingName: string;
  createdAt: string;
  customer: string;
  deletedAt: string;
  startDate: string;
  totalApartment: string;
  totalEntrance: string;
  totalParking: string;
  totalWarehouse: string;
  updatedAt: string;
  __v: string;
  _id: string;
  index: number;

  constructor({
    apartmentComplex,
    buildingName,
    createdAt,
    customer,
    deletedAt,
    startDate,
    totalApartment,
    totalEntrance,
    totalParking,
    totalWarehouse,
    updatedAt,
    __v,
    _id,
    index,
  }: IBuilding) {
    this.apartmentComplex = apartmentComplex;
    this.buildingName = buildingName;
    this.createdAt = createdAt;
    this.customer = customer;
    this.deletedAt = deletedAt;
    this.startDate = startDate;
    this.totalApartment = totalApartment;
    this.totalEntrance = totalEntrance;
    this.totalParking = totalParking;
    this.totalWarehouse = totalWarehouse;
    this.updatedAt = updatedAt;
    this.__v = __v;
    this._id = _id;
    this.index = index;
  }

  static fromJson(json: any) {
    return new Building(json);
  }
}
