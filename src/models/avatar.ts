import { IAvatar } from "@/interfaces/avatar";

export class Avatar implements IAvatar {
  createdAt: string;
  createdBy: string;
  height: number;
  rotation: string;
  thumbnail: string;
  updatedAt: string;
  url: string;
  user: string;
  width: number;
  __v: string;
  _id: string;

  constructor(json: IAvatar) {
    this.createdAt = json.createdAt;
    this.createdBy = json.createdBy;
    this.height = json.height;
    this.rotation = json.rotation;
    this.thumbnail = json.thumbnail;
    this.updatedAt = json.updatedAt;
    this.url = json.url;
    this.user = json.user;
    this.width = json.width;
    this.__v = json.__v;
    this._id = json._id;
  }

  static fromJson(json: any) {
    return new Avatar(json);
  }
}
