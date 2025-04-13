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

  constructor({
    _id,
    createdBy,
    createdAt,
    updatedBy,
    updatedAt,
    deletedBy,
    deletedAt,
    isActive,
    type,
    username,
    phone,
    email,
    registerNo,
    lastName,
    firstName,
    avatar,
    avatarThumbnail,
    password,
  }: IUser) {
    this._id = _id;
    this.createdBy = createdBy;
    this.createdAt = createdAt;
    this.updatedBy = updatedBy;
    this.updatedAt = updatedAt;
    this.deletedBy = deletedBy;
    this.deletedAt = deletedAt;
    this.isActive = isActive;
    this.type = type;
    this.username = username;
    this.phone = phone;
    this.email = email;
    this.registerNo = registerNo;
    this.lastName = lastName;
    this.firstName = firstName;
    this.avatar = avatar;
    this.avatarThumbnail = avatarThumbnail;
    this.password = password;
  }

  static fromJson(json: any) {
    return new User(json);
  }
}
