import { IUser } from "@/interfaces/user";

export class User implements IUser {
  _id: string;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
  deletedBy: string;
  deletedAt: string;
  isActive: string;
  type: string;
  username: string;
  phone: string;
  email: string;
  registerNo: string;
  lastName: string;
  firstName: string;
  avatar: string;
  avatarThumbnail: string;
  password: string;

  constructor(json: IUser) {
    this._id = json._id;
    this.createdBy = json.createdBy;
    this.createdAt = json.createdAt;
    this.updatedBy = json.updatedBy;
    this.updatedAt = json.updatedAt;
    this.deletedBy = json.deletedBy;
    this.deletedAt = json.deletedAt;
    this.isActive = json.isActive;
    this.type = json.type;
    this.username = json.username;
    this.phone = json.phone;
    this.email = json.email;
    this.registerNo = json.registerNo;
    this.lastName = json.lastName;
    this.firstName = json.firstName;
    this.avatar = json.avatar;
    this.avatarThumbnail = json.avatarThumbnail;
    this.password = json.password;
  }

  static fromJson(json: any) {
    return new User(json);
  }
}
