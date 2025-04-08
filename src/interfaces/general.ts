import { IPerm } from "@/models/auth";
import { IReference } from "./reference";

export type IType = {
  code: string;
  name: string;
};

export type IPermission = {
  code: string;
  name: string;
  group: string;
  description: string;
  isFull: string;
  isRead: string;
  isWrite: string;
  isRemove: string;
  isExport: string;
};

export interface IGeneral {
  userTypes: IReference[];
  position: IReference[];
  categoryType: IReference[];
  apartmentType: IReference[];
  transactionType: IReference[];
  scheduleType: IReference[];
  cashFlow: IReference[];
  capacityType: IReference[];
  perm: IPerm[];
  permissions: IPermission[];
  permissionGroups: IType[];
}
