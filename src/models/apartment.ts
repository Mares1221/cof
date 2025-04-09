import { IApartment } from "@/interfaces/apartment";
import { IBuilding } from "@/interfaces/building";
import { IComplex } from "@/interfaces/complex";

export class Apartment implements IApartment {
  apartmentComplex: IComplex;
  apartmentSize: string;
  building: IBuilding;
  category: any;
  createdAt: string;
  customer: any;
  deletedAt: string;
  description: string;
  doorNumber: string;
  entranceNumber: string;
  file: string;
  floorNumber: string;
  updatedAt: string;
  __v: string;
  _id: string;
  index: number;

  constructor({
    apartmentComplex,
    apartmentSize,
    building,
    category,
    createdAt,
    customer,
    deletedAt,
    description,
    doorNumber,
    entranceNumber,
    file,
    floorNumber,
    updatedAt,
    __v,
    _id,
    index,
  }: IApartment) {
    this.apartmentComplex = apartmentComplex;
    this.apartmentSize = apartmentSize;
    this.building = building;
    this.category = category;
    this.createdAt = createdAt;
    this.customer = customer;
    this.deletedAt = deletedAt;
    this.description = description;
    this.doorNumber = doorNumber;
    this.entranceNumber = entranceNumber;
    this.file = file;
    this.floorNumber = floorNumber;
    this.updatedAt = updatedAt;
    this.__v = __v;
    this._id = _id;
    this.index = index;
  }

  static fromJson(json: any) {
    return new Apartment(json);
  }
}
