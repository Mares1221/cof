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

  constructor({
    createdAt,
    createdBy,
    height,
    rotation,
    thumbnail,
    updatedAt,
    url,
    user,
    width,
    __v,
    _id,
  }: IAvatar) {
    this.createdAt = createdAt;
    this.createdBy = createdBy;
    this.height = height;
    this.rotation = rotation;
    this.thumbnail = thumbnail;
    this.updatedAt = updatedAt;
    this.url = url;
    this.user = user;
    this.width = width;
    this.__v = __v;
    this._id = _id;
  }

  static fromJson(json: any) {
    return new Avatar(json);
  }
}
