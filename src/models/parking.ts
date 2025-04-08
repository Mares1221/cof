import { IApartment } from "@/interfaces/apartment";
import { IBuilding } from "@/interfaces/building";
import { IComplex } from "@/interfaces/complex";
import { IOwner } from "@/interfaces/owner";
import { IParking } from "@/interfaces/parking";

export class Parking implements IParking {
  apartmentComplex: IComplex;
  building: IBuilding;
  createdAt: string;
  customer: string;
  deletedAt: string;
  description: string;
  file: string;
  owner: IOwner;
  parkingNumber: string;
  updatedAt: string;
  __v: string;
  _id: string;
  apartment: IApartment;
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
    parkingNumber,
    updatedAt,
    __v,
    _id,
    apartment,
    index,
  }: IParking) {
    this.apartmentComplex = apartmentComplex;
    this.building = building;
    this.createdAt = createdAt;
    this.customer = customer;
    this.deletedAt = deletedAt;
    this.description = description;
    this.file = file;
    this.owner = owner;
    this.parkingNumber = parkingNumber;
    this.updatedAt = updatedAt;
    this.__v = __v;
    this._id = _id;
    this.apartment = apartment;
    this.index = index;
  }

  static fromJson(json: any) {
    return new Parking(json);
  }
}
