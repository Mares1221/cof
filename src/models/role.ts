import { IRole } from "@/interfaces/role";

export class Role implements IRole {
  _id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  permissions: {
    code: string;
    isFull: boolean;
    isRead: boolean;
    isWrite: boolean;
    isRemove: boolean;
    isExport: boolean;
  }[];

  constructor({
    _id,
    name,
    description,
    createdAt,
    updatedAt,
    permissions,
  }: IRole) {
    this._id = _id;
    this.name = name;
    this.description = description;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.permissions = permissions;
  }

  static fromJson(json: any) {
    return new Role(json);
  }
}
