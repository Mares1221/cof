"use client";

import { authApi, generalApi } from "@/apis";
import { RootState } from "@/store";
import { logout } from "@/store/auth-slice";
import { usePathname, useRouter } from "next/navigation";
import React, { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useSWR from "swr";
import { message } from "../utils/message";
import { LoadingOverlay } from "@mantine/core";

interface Props {
  children: React.ReactNode;
}

export const AdminContext = createContext({});

export default function AdminProvider({ children }: Props) {
  const dispatch = useDispatch();
  const [isClient, setIsClient] = useState(false);
  const { push } = useRouter();
  const pathname = usePathname();
  const { accessToken } = useSelector((state: RootState) => state.auth);

  const { data, error } = useSWR(
    accessToken ? `/api/init?${JSON.stringify(accessToken)}` : null,
    async () => {
      const resInit = await generalApi.init();
      const resMe = await authApi.me();
      return {
        resInit,
        resMe,
      };
    },
    {
      revalidateOnFocus: false,
      onError: (err) => {
        if (err.statusCode === 401) {
          message.error("Та хандах эрхгүй байна!");
          dispatch(logout());
          push("/home");
        }
        return err;
      },
    }
  );

  const state = {};
  const func = {};
  const context = { state, func };

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!accessToken && !isClient) {
      if (pathname !== "/home") {
        push("/home");
      }
    }
  }, [accessToken, push, isClient]);

  if (error) {
    push("/home");
  }

  if (!isClient || !data) {
    return (
      <div>
        <LoadingOverlay visible zIndex={20} />
      </div>
    );
  }

  return (
    <AdminContext.Provider value={context}>{children}</AdminContext.Provider>
  );
}
