import { IPerm } from "@/models/auth";

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
  userTypes: any;
  position: any;
  categoryType: any;
  apartmentType: any;
  transactionType: any;
  scheduleType: any;
  cashFlow: any;
  capacityType: any;
  perm: IPerm[];
  permissions: IPermission[];
  permissionGroups: IType[];
}
