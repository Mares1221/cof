import { IFamilyMembers } from "@/interfaces/family-members";

export class FamilyMembers implements IFamilyMembers {
  createdAt: string;
  customer: string;
  deletedAt: string;
  entranceNames: [];
  familyMembers: IFamilyMembers;
  firstName: string;
  isActive: true;
  isMember: true;
  isTenant: false;
  lastName: string;
  phone: string;
  provider: string;
  tenantMembers: [];
  updatedAt: string;
  userStatus: string;
  userStatusDate: string;
  userType: string;
  username: string;
  gender: string;
  __v: 0;
  _id: string;

  constructor({
    createdAt,
    customer,
    deletedAt,
    entranceNames,
    familyMembers,
    firstName,
    isActive,
    isMember,
    isTenant,
    lastName,
    phone,
    provider,
    tenantMembers,
    updatedAt,
    userStatus,
    userStatusDate,
    userType,
    username,
    gender,
    __v,
    _id,
  }: IFamilyMembers) {
    this.createdAt = createdAt;
    this.customer = customer;
    this.deletedAt = deletedAt;
    this.entranceNames = entranceNames;
    this.familyMembers = familyMembers;
    this.firstName = firstName;
    this.isActive = isActive;
    this.isMember = isMember;
    this.isTenant = isTenant;
    this.lastName = lastName;
    this.phone = phone;
    this.provider = provider;
    this.tenantMembers = tenantMembers;
    this.updatedAt = updatedAt;
    this.userStatus = userStatus;
    this.userStatusDate = userStatusDate;
    this.userType = userType;
    this.username = username;
    this.gender = gender;
    this.__v = __v;
    this._id = _id;
  }

  static fromJson(json: any) {
    return new FamilyMembers(json);
  }
}
