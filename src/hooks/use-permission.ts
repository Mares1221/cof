import { IAuth } from "@/interfaces/auth";
import { useSelector } from "react-redux";

export const usePermission = () => {
  const { perm } = useSelector((state: { auth: IAuth }) => state.auth);

  return {
    checkPermission: (
      code: string,
      isRead?: boolean,
      isWrite?: boolean,
      isRemove?: boolean,
      isExport?: boolean
    ) => {
      const permission = perm?.find((perm) => perm.code === code);

      if (isRead === true && permission?.isRead !== true) {
        return false;
      }

      if (isWrite === true && permission?.isWrite !== true) {
        return false;
      }

      if (isRemove === true && permission?.isRemove !== true) {
        return false;
      }

      if (isExport === true && permission?.isExport !== true) {
        return false;
      }

      return true;
    },
  };
};
