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

  constructor(json: IBuilding) {
    this._id = json._id;
    this.createdBy = json.createdBy;
    this.createdAt = json.createdAt;
    this.updatedBy = json.updatedBy;
    this.updatedAt = json.updatedAt;
    this.deletedBy = json.deletedBy;
    this.deletedAt = json.deletedAt;
    this.isActive = json.isActive;
    this.town = json.town;
    this.name = json.name;
    this.description = json.description;
    this.image = json.image;
    this.thumbnail = json.thumbnail;
    this.isLocated = json.isLocated;
    this.location = json.location;
    this.coordinates = json.coordinates;
  }

  static fromJson(json: any) {
    return new Building(json);
  }
}
