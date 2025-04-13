import { IComplex } from "@/interfaces/complex";

export class Complex implements IComplex {
  _id: string;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
  deletedBy: string;
  deletedAt: string;
  isActive: string;
  name: string;
  description: string;
  image: string;
  thumbnail: string;
  isLocated: string;
  location: string;
  coordinates: string[];

  constructor({
    _id,
    createdBy,
    createdAt,
    updatedBy,
    updatedAt,
    deletedBy,
    deletedAt,
    isActive,
    name,
    description,
    image,
    thumbnail,
    isLocated,
    location,
    coordinates,
  }: IComplex) {
    this._id = _id;
    this.createdBy = createdBy;
    this.createdAt = createdAt;
    this.updatedBy = updatedBy;
    this.updatedAt = updatedAt;
    this.deletedBy = deletedBy;
    this.deletedAt = deletedAt;
    this.isActive = isActive;
    this.name = name;
    this.description = description;
    this.image = image;
    this.thumbnail = thumbnail;
    this.isLocated = isLocated;
    this.location = location;
    this.coordinates = coordinates;
  }

  static fromJson(json: any) {
    return new Complex(json);
  }
}
