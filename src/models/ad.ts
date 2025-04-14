import { IAd } from "@/interfaces/ad";
import { IBuilding } from "@/interfaces/building";
import { IComplex } from "@/interfaces/complex";
import { IEntrance } from "@/interfaces/entracne";
import { IUser } from "@/interfaces/user";

export class Ad implements IAd {
  _id: string;
  createdBy: IUser;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
  deletedBy: IUser;
  deletedAt: string;
  isActive: string;
  image: string;
  thumbnail: string;
  customer: string;
  durationType: string;
  duration: string;
  startAt: string;
  endAt: string;
  startedAt: string;
  endedAt: string;
  description: string;
  towns: IComplex[];
  buildings: IBuilding[];
  entrances: IEntrance[];
  boards: string;
  queryStr: string;

  constructor(json: IAd) {
    this._id = json._id;
    this.createdBy = json.createdBy;
    this.createdAt = json.createdAt;
    this.updatedBy = json.updatedBy;
    this.updatedAt = json.updatedAt;
    this.deletedBy = json.deletedBy;
    this.deletedAt = json.deletedAt;
    this.isActive = json.isActive;
    this.image = json.image;
    this.thumbnail = json.thumbnail;
    this.customer = json.customer;
    this.durationType = json.durationType;
    this.duration = json.duration;
    this.startAt = json.startAt;
    this.endAt = json.endAt;
    this.startedAt = json.startedAt;
    this.endedAt = json.endedAt;
    this.description = json.description;
    this.towns = json.towns;
    this.buildings = json.buildings;
    this.entrances = json.entrances;
    this.boards = json.boards;
    this.queryStr = json.queryStr;
  }

  static fromJson(json: any) {
    return new Ad(json);
  }
}
