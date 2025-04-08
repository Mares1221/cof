import { createSlice } from "@reduxjs/toolkit";
import { IAuth } from "@/interfaces/auth";

const initialState: IAuth = {
  user: null,
  accessToken: null,
  session_scope: null,
  otp: {
    otpMethod: null,
    phone: null,
    expiresAt: null,
    message: null,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (
      state,
      {
        payload,
      }: {
        payload: {
          accessToken: string;
          session_scope: string;
        };
      },
    ) => ({ ...state, accessToken: payload.accessToken }),
    setOtp: (state, action) => {
      const { otpMethod, phone, expiresAt, message } = action.payload;
      return {
        ...state,
        otp: {
          otpMethod,
          phone,
          expiresAt,
          message,
        },
      };
    },
    logout: () => {
      return initialState;
    },
    authMe: (state, { payload }: { payload: any }) => ({
      ...state,
      user: payload,
      permissions: payload.permissions,
      perm: payload.perm,
    }),
  },
});

export const authReducer = authSlice.reducer;

export const { authMe, setToken, logout, setOtp } = authSlice.actions;
