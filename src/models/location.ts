import { ILocation } from "@/interfaces/location";

export class Location implements ILocation {
  createdAt: string;
  createdBy: string;
  deletedAt: string;
  isActive: string;
  objectId: string;
  objectType: string;
  pinpoint: {
    coordinates: [number, number];
    type: string;
  };
  updatedAt: string;
  __v: string;
  _id: string;

  constructor(json: ILocation) {
    this.createdAt = json.createdAt;
    this.createdBy = json.createdBy;
    this.deletedAt = json.deletedAt;
    this.isActive = json.isActive;
    this.objectId = json.objectId;
    this.objectType = json.objectType;
    this.pinpoint = json.pinpoint;
    this.updatedAt = json.updatedAt;
    this.__v = json.__v;
    this._id = json._id;
  }

  static fromJson(json: any) {
    return new Location(json);
  }
}
