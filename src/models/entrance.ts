import { IEntrance } from "@/interfaces/entracne";

export class Entrance implements IEntrance {
  _id: string;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
  deletedBy: string;
  deletedAt: string;
  town: string;
  building: string;
  name: string;
  description: string;

  constructor(json: IEntrance) {
    this._id = json._id;
    this.createdBy = json.createdBy;
    this.createdAt = json.createdAt;
    this.updatedBy = json.updatedBy;
    this.updatedAt = json.updatedAt;
    this.deletedBy = json.deletedBy;
    this.deletedAt = json.deletedAt;
    this.town = json.town;
    this.building = json.building;
    this.name = json.name;
    this.description = json.description;
  }

  static fromJson(json: any) {
    return new Entrance(json);
  }
}
