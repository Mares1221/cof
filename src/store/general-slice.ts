import { createSlice } from "@reduxjs/toolkit";
import { IGeneral } from "@/interfaces/general";

const initialState: IGeneral = {
  userTypes: [],
  position: [],
  categoryType: [],
  apartmentType: [],
  scheduleType: [],
  cashFlow: [],
  transactionType: [],
  capacityType: [],
  perm: [],
  permissionGroups: [],
  permissions: [],
};

const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    setInit: (
      state,
      {
        payload,
      }: {
        payload: any;
      },
    ) => {
      const {
        userTypes,
        position,
        categoryType,
        apartmentType,
        scheduleType,
        cashFlow,
        transactionType,
        capacityType,
        perm,
        permissionGroups,
        permissions,
      } = payload;

      return {
        ...state,
        userTypes,
        position,
        categoryType,
        apartmentType,
        scheduleType,
        cashFlow,
        transactionType,
        capacityType,
        perm,
        permissionGroups,
        permissions,
      };
    },
  },
});

export const generalReducer = generalSlice.reducer;

export const { setInit } = generalSlice.actions;
