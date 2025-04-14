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

  constructor(json: IApartment) {
    this.apartmentComplex = json.apartmentComplex;
    this.apartmentSize = json.apartmentSize;
    this.building = json.building;
    this.category = json.category;
    this.createdAt = json.createdAt;
    this.customer = json.customer;
    this.deletedAt = json.deletedAt;
    this.description = json.description;
    this.doorNumber = json.doorNumber;
    this.entranceNumber = json.entranceNumber;
    this.file = json.file;
    this.floorNumber = json.floorNumber;
    this.updatedAt = json.updatedAt;
    this.__v = json.__v;
    this._id = json._id;
    this.index = json.index;
  }

  static fromJson(json: any) {
    return new Apartment(json);
  }
}
