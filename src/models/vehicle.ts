import { IApartment } from "@/interfaces/apartment";
import { IBuilding } from "@/interfaces/building";
import { IComplex } from "@/interfaces/complex";
import { IUser } from "@/interfaces/user";
import { IVehicle } from "@/interfaces/vehicle";

export class Vehicle implements IVehicle {
  mark: string;
  createdAt: string;
  customer: IUser | null;
  deletedAt: string;
  file: string;
  organizationType: string;
  owner: {
    apartment: IApartment;
    apartmentComplex: IComplex;
    building: IBuilding;
    ownerName: string;
    phone: string;
    user: IUser;
    isResident: boolean;
    firstName: string;
    lastName: string;
  };
  updatedAt: string;
  vehiclePlateNo: string;
  vehicleType: string;
  __v: string;
  _id: string;
  apartment: IApartment;
  apartmentComplex: IComplex;
  building: IBuilding;

  constructor({
    mark,
    createdAt,
    customer,
    deletedAt,
    file,
    organizationType,
    owner,
    updatedAt,
    vehiclePlateNo,
    vehicleType,
    __v,
    _id,
    apartment,
    apartmentComplex,
    building,
  }: IVehicle) {
    this.mark = mark;
    this.createdAt = createdAt;
    this.customer = customer;
    this.deletedAt = deletedAt;
    this.file = file;
    this.organizationType = organizationType;
    this.owner = owner;
    this.updatedAt = updatedAt;
    this.vehiclePlateNo = vehiclePlateNo;
    this.vehicleType = vehicleType;
    this.__v = __v;
    this._id = _id;
    this.apartment = apartment;
    this.apartmentComplex = apartmentComplex;
    this.building = building;
  }

  static fromJson(json: any) {
    return new Vehicle(json);
  }
}

const test = {
  owner: {
    isResident: true,
    user: {
      entranceNames: [],
      familyMembers: [],
      tenantMembers: [],
      _id: "67e91f7d9cc9b84c61342c28",
      customer: "67e91f7d9cc9b84c61342bf2",
      isActive: true,
      username: "94119177",
      firstName: "Admin",
      lastName: "Admin",
      email: "munkhsaikhan7712ff@gmail.com",
      phone: "94119177",
      phoneSecond: null,
      address: "Баянзүрх Хороо 5 Тарвилан хийд",
      position: "SYSTEM_ADMIN",
      provider: "ZTO-HOA",
      role: "67e91f7d9cc9b84c61342bf4",
      type: "ZTO-HOA",
      createdBy: "6777d87e4c96746127654208",
      deletedAt: null,
      createdAt: "2025-03-30T10:39:57.558Z",
      updatedAt: "2025-04-03T09:10:09.864Z",
      __v: 0,
      sessionId: "67ee507123ea9b6ccb6eff88",
    },
    apartmentComplex: {
      _id: "67eb644646f2bc810219c837",
      name: "SKY WHEEL COMPLEX",
      deletedAt: null,
      createdAt: "2025-04-01T03:57:58.071Z",
      updatedAt: "2025-04-01T04:00:13.226Z",
      __v: 0,
      buildingCount: 2,
      totalApartment: 412,
      totalParking: 222,
      totalWarehouse: 14,
    },
    building: {
      _id: "67eb652bbf66cc51396ec39a",
      apartmentComplex: "67eb7f1e63eac122b7405a3b",
      customer: "67e91f7d9cc9b84c61342bf2",
      buildingName: "A Block",
      totalEntrance: 5,
      totalApartment: 20,
      totalParking: 20,
      totalWarehouse: 1,
      startDate: "2020-12-01T00:00:00.000Z",
      deletedAt: null,
      createdAt: "2025-04-01T04:01:47.665Z",
      updatedAt: "2025-04-02T08:29:43.675Z",
      __v: 0,
    },
    apartment: {
      _id: "67eb69815fee3d7a4019375f",
      apartmentComplex: "67eb644646f2bc810219c837",
      building: "67eb652bbf66cc51396ec39a",
      customer: "67e91f7d9cc9b84c61342bf2",
      category: "67e922809aa3ffb6d3ca025e",
      entranceNumber: "2orts",
      floorNumber: "12",
      doorNumber: "21",
      apartmentSize: "21mb",
      description: "212121",
      file: null,
      deletedAt: "2025-04-02T06:57:19.458Z",
      createdAt: "2025-04-01T04:20:17.431Z",
      updatedAt: "2025-04-02T06:57:19.459Z",
      __v: 0,
    },
    phone: "12121221",
    ownerName: "asfafs",
  },
  _id: "67ee52e9029ffb08ba6b6c49",
  customer: {
    _id: "67e91f7d9cc9b84c61342bf2",
    name: "elit-cox",
    email: "munkhsaikhan7712ff@gmail.com",
    phone: "94119177",
    expireDate: "2025-12-24T00:00:00.000Z",
    startDate: "2025-01-01T00:00:00.000Z",
    registerNo: "1247890",
    status: "NEW",
    isActive: true,
    deletedAt: null,
    createdAt: "2025-03-30T10:39:57.378Z",
    updatedAt: "2025-03-30T10:39:57.378Z",
    __v: 0,
  },
  mark: "E21241",
  vehiclePlateNo: "1111УАБ",
  vehicleType: "GARBAGE_TRUCK",
  organizationType: "CITIZEN",
  file: null,
  deletedAt: null,
  createdAt: "2025-04-03T09:20:41.651Z",
  updatedAt: "2025-04-03T09:20:41.651Z",
  __v: 0,
};
