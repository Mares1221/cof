import { IBuilding } from "@/interfaces/building";
import { ICategory } from "@/interfaces/category";
import { IComplex } from "@/interfaces/complex";
import { IInventory } from "@/interfaces/inventory";

export class Inventory implements IInventory {
  amount: string;
  apartment: string;
  apartmentComplex: IComplex;
  building: IBuilding;
  category: ICategory;
  code: string;
  createdAt: string;
  customer: string;
  deletedAt: string;
  image: string;
  inventoryNumber: string;
  isRequireToMaintenance: string;
  maintenanceMonth: string;
  name: string;
  startDate: string;
  updatedAt: string;
  __v: string;
  _id: string;
  index: number;
  constructor({
    amount,
    apartment,
    apartmentComplex,
    building,
    category,
    code,
    createdAt,
    customer,
    deletedAt,
    image,
    inventoryNumber,
    isRequireToMaintenance,
    maintenanceMonth,
    name,
    startDate,
    updatedAt,
    __v,
    _id,
    index,
  }: IInventory) {
    this.amount = amount;
    this.apartment = apartment;
    this.apartmentComplex = apartmentComplex;
    this.building = building;
    this.category = category;
    this.code = code;
    this.createdAt = createdAt;
    this.customer = customer;
    this.deletedAt = deletedAt;
    this.image = image;
    this.inventoryNumber = inventoryNumber;
    this.isRequireToMaintenance = isRequireToMaintenance;
    this.maintenanceMonth = maintenanceMonth;
    this.name = name;
    this.startDate = startDate;
    this.updatedAt = updatedAt;
    this.__v = __v;
    this._id = _id;
    this.index = index;
  }

  static fromJson(json: any) {
    return new Inventory(json);
  }
}
