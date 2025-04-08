import { IApartment } from "@/interfaces/apartment";
import { IBuilding } from "@/interfaces/building";
import { IComplex } from "@/interfaces/complex";
import { IUser } from "@/interfaces/user";
import { IWarehouse } from "@/interfaces/warehouse";

export class Warehouse implements IWarehouse {
  apartmentComplex: IComplex;
  building: IBuilding;
  createdAt: string;
  customer: string;
  deletedAt: string;
  description: string;
  file: string;
  owner: {
    apartment: IApartment;
    apartmentComplex: IComplex;
    building: IBuilding;
    ownerName: string;
    phone: string;
    user: IUser;
    isResident: boolean;
  };
  warehouseNumber: string;
  updatedAt: string;
  __v: string;
  _id: string;
  index: number;
  constructor({
    apartmentComplex,
    building,
    createdAt,
    customer,
    deletedAt,
    description,
    file,
    owner,
    warehouseNumber,
    updatedAt,
    __v,
    _id,
    index,
  }: IWarehouse) {
    this.apartmentComplex = apartmentComplex;
    this.building = building;
    this.createdAt = createdAt;
    this.customer = customer;
    this.deletedAt = deletedAt;
    this.description = description;
    this.file = file;
    this.owner = owner;
    this.warehouseNumber = warehouseNumber;
    this.updatedAt = updatedAt;
    this.__v = __v;
    this._id = _id;
    this.index = index;
  }

  static fromJson(json: any) {
    return new Warehouse(json);
  }
}
