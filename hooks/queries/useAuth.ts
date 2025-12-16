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
import * as Linking from "expo-linking";
import { router } from "expo-router";
import { openAuthSessionAsync } from "expo-web-browser";
import { useState } from "react";

const REDIRECT_URL = Linking.createURL("auth/login/redirect");

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
        queryKey: [queryKeys.auth, queryKeys.exchange],
      });
      router.replace("/home");
    },
    onError: () => {},
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
  const [provider, setProvider] = useState<LoginProvider | null>(null);

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
    setProvider(provider);
    const AUTH_URL = `${BASE_URL}/oauth2/authorization/${provider}`;
    console.log("redirect_url : ", REDIRECT_URL);
    const result = await openAuthSessionAsync(AUTH_URL, REDIRECT_URL);

    console.log(`${provider}Login => result.type: `, result.type);
  };

  return {
    provider,
    socialLogin,
    exchangeMutation,
    logoutMutation,
    reissueMutate,
    reissueMutation,
  };
};

export default useAuth;
