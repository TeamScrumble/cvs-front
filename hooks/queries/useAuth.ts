import { LoginProvider } from "@/@types/dto";
import { AuthTokenDTO } from "@/@types/dto/authDto";
import { exchange, logout } from "@/api/auth";
import { BASE_URL } from "@/api/axios";
import { getMe } from "@/api/member";
import queryClient from "@/api/queryClient";
import { tokenKeys } from "@/constants/auth";
import { queryKeys } from "@/constants/queryKey";
import { removeHeader } from "@/utils/header";
import { deleteSecureStore, saveSecureStore } from "@/utils/secureStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { openURL } from "expo-linking";
import { router } from "expo-router";

const useGetMe = (options?: { enabled?: boolean }) => {
  const { data, isLoading } = useQuery({
    queryFn: getMe,
    queryKey: [queryKeys.AUTH, queryKeys.GET_ME],
    staleTime: Infinity,
    enabled: options?.enabled,
  });

  return { data, isLoading };
};

const useExchange = () => {
  return useMutation({
    mutationFn: exchange,
    onSuccess: async ({
      accessToken,
      refreshToken,
      provider,
    }: AuthTokenDTO & { provider: LoginProvider }) => {
      console.log("[useExchange] onSuccess: start!");
      await saveSecureStore(tokenKeys.ACCESS, accessToken);
      await saveSecureStore(tokenKeys.REFRESH, refreshToken);
      await saveSecureStore("lastLogin", provider);
      console.log("[useExchange] onSuccess: invalidateQueries -> getMe");
      await queryClient.invalidateQueries({
        queryKey: [queryKeys.AUTH, queryKeys.GET_ME],
      });
      console.log("[useExchange] onSuccess: replace to /home");
      router.replace("/home");
    },
    onError: () => {
      console.log("[useExchange] onError!");
    },
  });
};

const useLogout = () => {
  return useMutation({
    mutationFn: logout,
    onSuccess: async ({ success }: { success: boolean }) => {
      console.log("[useLogout] onSuccess: start!");
      if (success) {
        removeHeader("Authorization");
        await deleteSecureStore(tokenKeys.ACCESS);
        await deleteSecureStore(tokenKeys.REFRESH);
        console.log(
          "[useLogout] onSuccess: removeHeader and deleteSecureStore"
        );
        console.log("[useLogout] onSuccess: resetQueries -> [queryKeys.AUTH]");
        queryClient.resetQueries({ queryKey: [queryKeys.AUTH] });
      }
    },
    onError: async () => {
      console.log("[useLogout] onError");
    },
  });
};

const useAuthQuery = () => {
  const { data, isLoading } = useGetMe();

  return {
    auth: {
      id: data?.memberId || 0,
      nickname: data?.nickname || "",
      email: data?.email || "",
      profileImage: data?.profileImage || "",
    },
    isLoading,
  }
}

const useAuthAction = () => {
  const exchangeMutation = useExchange();
  const logoutMutation = useLogout();

  const socialLogin = async (provider: LoginProvider) => {
    saveSecureStore("lastTriedLoginProvider", provider);
    const AUTH_URL = `${BASE_URL}/oauth2/authorization/${provider}`;
    openURL(AUTH_URL);
  };

  return {
    exchangeMutation,
    logoutMutation,
    socialLogin,
  };
};

export { useAuthQuery, useAuthAction };
