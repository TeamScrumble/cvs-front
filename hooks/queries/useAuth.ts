import { LoginProvider } from "@/@types/dto";
import { AuthTokenDTO } from "@/@types/dto/authDto";
import { exchange, logout, reissue } from "@/api/auth";
import { BASE_URL } from "@/api/axios";
import queryClient from "@/api/queryClient";
import { tokenKeys } from "@/constants/auth";
import { queryKeys } from "@/constants/queryKey";
import { removeHeader, setHeader } from "@/utils/header";
import {
  deleteSecureStore,
  getSecureStore,
  saveSecureStore,
} from "@/utils/secureStore";
import { useMutation } from "@tanstack/react-query";
import { openURL } from "expo-linking";
import { router } from "expo-router";
import { useState } from "react";

const useReissue = () => {
  return useMutation({
    mutationFn: reissue,
    onSuccess: async ({ accessToken, refreshToken }: AuthTokenDTO) => {
      console.log("onSuccess accessToken: ", accessToken);
      console.log("onSuccess refreshToken: ", refreshToken);
      setHeader("Authorization", `Bearer ${accessToken}`);
      await saveSecureStore(tokenKeys.ACCESS, accessToken);
      await saveSecureStore(tokenKeys.REFRESH, refreshToken);
      queryClient.fetchQuery({ queryKey: [queryKeys.auth] });
    },
    onError: () => {
      router.replace("/auth");
    },
  });
};

const useExchange = () => {
  return useMutation({
    mutationFn: exchange,
    onSuccess: async ({
      accessToken,
      refreshToken,
      provider,
    }: AuthTokenDTO & { provider: LoginProvider }) => {
      setHeader("Authorization", `Bearer ${accessToken}`);
      await saveSecureStore(tokenKeys.ACCESS, accessToken);
      await saveSecureStore(tokenKeys.REFRESH, refreshToken);
      await saveSecureStore("lastLogin", provider);
      queryClient.fetchQuery({
        queryKey: [queryKeys.auth],
      });
      router.replace("/home");
    },
    onError: () => {
      console.log("여기?");
    },
  });
};

const useLogout = () => {
  return useMutation({
    mutationFn: logout,
    onSuccess: async ({ accessToken, refreshToken }: AuthTokenDTO) => {
      removeHeader("Authorization");
      await deleteSecureStore(tokenKeys.ACCESS);
      await deleteSecureStore(tokenKeys.REFRESH);
      queryClient.fetchQuery({ queryKey: [queryKeys.auth] });
      router.replace("/auth");
    },
    onError: () => {},
  });
};

const useAuth = () => {
  const reissueMutation = useReissue();
  const exchangeMutation = useExchange();
  const logoutMutation = useLogout();

  const reissueMutate = async () => {
    const storedRefreshToken = (await getSecureStore(tokenKeys.REFRESH)) as
      | string
      | null;
    if (storedRefreshToken) {
      setHeader("X-Refresh-Token", storedRefreshToken);
    }
    reissueMutation.mutate();
  };

  const socialLogin = async (provider: LoginProvider) => {
    saveSecureStore("lastTriedLoginProvider", provider)
    const AUTH_URL = `${BASE_URL}/oauth2/authorization/${provider}`;
    openURL(AUTH_URL);
  };

  return {
    socialLogin,
    exchangeMutation,
    logoutMutation,
    reissueMutate,
    reissueMutation,
  };
};

export default useAuth;
