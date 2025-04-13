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

  constructor({
    _id,
    createdBy,
    createdAt,
    updatedBy,
    updatedAt,
    deletedBy,
    deletedAt,
    town,
    building,
    name,
    description,
  }: IEntrance) {
    this._id = _id;
    this.createdBy = createdBy;
    this.createdAt = createdAt;
    this.updatedBy = updatedBy;
    this.updatedAt = updatedAt;
    this.deletedBy = deletedBy;
    this.deletedAt = deletedAt;
    this.town = town;
    this.building = building;
    this.name = name;
    this.description = description;
  }

  static fromJson(json: any) {
    return new Entrance(json);
  }
}
