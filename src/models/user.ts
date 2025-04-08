import { IApartment } from "@/interfaces/apartment";
import { IAvatar } from "@/interfaces/avatar";
import { IBuilding } from "@/interfaces/building";
import { IComplex } from "@/interfaces/complex";
import { ICustomer } from "@/interfaces/customer";
import { IFamilyMembers } from "@/interfaces/family-members";
import { IPaymentSettings } from "@/interfaces/payment-settings";
import { IUser } from "@/interfaces/user";

export class User implements IUser {
  apartment: IApartment;
  apartmentComplex: IComplex;
  avatar: IAvatar;
  building: IBuilding;
  createdAt: string;
  customer: ICustomer;
  deletedAt: string;
  doorNumber: string;
  email: string;
  entranceNames: string;
  entranceNumber: string;
  familyMembers: IFamilyMembers[];
  firstName: string;
  floorNumber: string;
  gender: string;
  isActive: boolean;
  lastName: string;
  paymentSettings: IPaymentSettings;
  phone: string;
  provider: string;
  registerNo: string;
  role: string;
  tenantMembers: IFamilyMembers[];
  updatedAt: string;
  userStatus: string;
  userStatusDate: string;
  userType: string;
  username: string;
  phoneSecond: string;
  password: string;
  search?: string;
  position?: string;
  _id: string;

  constructor({
    apartment,
    apartmentComplex,
    avatar,
    building,
    createdAt,
    customer,
    deletedAt,
    doorNumber,
    email,
    entranceNames,
    entranceNumber,
    familyMembers,
    firstName,
    floorNumber,
    gender,
    isActive,
    lastName,
    paymentSettings,
    phone,
    provider,
    registerNo,
    role,
    tenantMembers,
    updatedAt,
    userStatus,
    userStatusDate,
    userType,
    username,
    phoneSecond,
    password,
    search,
    position,
    _id,
  }: IUser) {
    this.apartment = apartment;
    this.apartmentComplex = apartmentComplex;
    this.avatar = avatar;
    this.building = building;
    this.createdAt = createdAt;
    this.customer = customer;
    this.deletedAt = deletedAt;
    this.doorNumber = doorNumber;
    this.email = email;
    this.entranceNames = entranceNames;
    this.entranceNumber = entranceNumber;
    this.familyMembers = familyMembers;
    this.firstName = firstName;
    this.floorNumber = floorNumber;
    this.gender = gender;
    this.isActive = isActive;
    this.lastName = lastName;
    this.paymentSettings = paymentSettings;
    this.phone = phone;
    this.provider = provider;
    this.registerNo = registerNo;
    this.role = role;
    this.tenantMembers = tenantMembers;
    this.updatedAt = updatedAt;
    this.userStatus = userStatus;
    this.userStatusDate = userStatusDate;
    this.userType = userType;
    this.username = username;
    this.phoneSecond = phoneSecond;
    this.password = password;
    this._id = _id;
    this.position = position;
    this.search = search;
  }

  static fromJson(json: any) {
    return new User(json);
  }
}
