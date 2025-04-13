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

  constructor({
    _id,
    createdBy,
    createdAt,
    updatedBy,
    updatedAt,
    deletedBy,
    deletedAt,
    isActive,
    image,
    thumbnail,
    customer,
    durationType,
    duration,
    startAt,
    endAt,
    startedAt,
    endedAt,
    description,
    towns,
    buildings,
    entrances,
    boards,
    queryStr,
  }: IAd) {
    this._id = _id;
    this.createdBy = createdBy;
    this.createdAt = createdAt;
    this.updatedBy = updatedBy;
    this.updatedAt = updatedAt;
    this.deletedBy = deletedBy;
    this.deletedAt = deletedAt;
    this.isActive = isActive;
    this.image = image;
    this.thumbnail = thumbnail;
    this.customer = customer;
    this.durationType = durationType;
    this.duration = duration;
    this.startAt = startAt;
    this.endAt = endAt;
    this.startedAt = startedAt;
    this.endedAt = endedAt;
    this.description = description;
    this.towns = towns;
    this.buildings = buildings;
    this.entrances = entrances;
    this.boards = boards;
    this.queryStr = queryStr;
  }

  static fromJson(json: any) {
    return new Ad(json);
  }
}
