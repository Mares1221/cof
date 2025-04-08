import { ICar } from "@/interfaces/car";

export class Car implements ICar {
  isActive: boolean;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: number;
  phoneSecond: number;
  address: string;
  index: number;
  _id: string;
  createdAt: string;
  Carname: string;
  note: string;
  registerNo: string;
  gender: string;
  position: string;
  customer: string;

  constructor({
    isActive,
    password,
    firstName,
    lastName,
    email,
    phone,
    phoneSecond,
    address,
    index,
    _id,
    createdAt,
    Carname,
    note,
    registerNo,
    gender,
    position,
    customer,
  }: ICar) {
    this.isActive = isActive;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.phoneSecond = phoneSecond;
    this.address = address;
    this.index = index;
    this._id = _id;
    this.createdAt = createdAt;
    this.Carname = Carname;
    this.note = note;
    this.registerNo = registerNo;
    this.gender = gender;
    this.position = position;
    this.customer = customer;
  }

  static fromJson(json: any) {
    return new Car(json);
  }
}
