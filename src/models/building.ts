import { IBuilding } from "@/interfaces/building";

export class Building implements IBuilding {
  _id: string;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
  deletedBy: string;
  deletedAt: string;
  isActive: string;
  town: string;
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
    town,
    name,
    description,
    image,
    thumbnail,
    isLocated,
    location,
    coordinates,
  }: IBuilding) {
    this._id = _id;
    this.createdBy = createdBy;
    this.createdAt = createdAt;
    this.updatedBy = updatedBy;
    this.updatedAt = updatedAt;
    this.deletedBy = deletedBy;
    this.deletedAt = deletedAt;
    this.isActive = isActive;
    this.town = town;
    this.name = name;
    this.description = description;
    this.image = image;
    this.thumbnail = thumbnail;
    this.isLocated = isLocated;
    this.location = location;
    this.coordinates = coordinates;
  }

  static fromJson(json: any) {
    return new Building(json);
  }
}
