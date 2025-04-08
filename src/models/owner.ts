import { IApartment } from "@/interfaces/apartment";
import { IBuilding } from "@/interfaces/building";
import { IComplex } from "@/interfaces/complex";
import { IOwner } from "@/interfaces/owner";
import { IUser } from "@/interfaces/user";

export class Owner implements IOwner {
  apartment: IApartment;
  apartmentComplex: IComplex;
  building: IBuilding;
  ownerName: string;
  phone: string;
  user: IUser;
  isResident: boolean;

  constructor({
    apartment,
    apartmentComplex,
    building,
    ownerName,
    phone,
    user,
    isResident,
  }: IOwner) {
    this.apartment = apartment;
    this.apartmentComplex = apartmentComplex;
    this.building = building;
    this.ownerName = ownerName;
    this.phone = phone;
    this.user = user;
    this.isResident = isResident;
  }

  static fromJson(json: any) {
    return new Owner(json);
  }
}
