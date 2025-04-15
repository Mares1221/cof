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

  constructor(json: IRole) {
    this._id = json._id;
    this.name = json.name;
    this.description = json.description;
    this.createdAt = json.createdAt;
    this.updatedAt = json.updatedAt;
    this.permissions = json.permissions;
  }

  static fromJson(json: any) {
    return new Role(json);
  }
}
