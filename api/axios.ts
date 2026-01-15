import { AuthTokenDTO } from "@/@types/dto/authDto";
import { tokenKeys } from "@/constants/auth";
import {
  deleteSecureStore,
  getSecureStore,
  saveSecureStore,
} from "@/utils/secureStore";
import axios, { AxiosRequestConfig } from "axios";
import { router } from "expo-router";
import { Platform } from "react-native";

const baseUrls = {
  android: process.env.EXPO_PUBLIC_API_URL,
  ios: process.env.EXPO_PUBLIC_API_URL,
};

const BASE_URL = Platform.OS === "ios" ? baseUrls.ios : baseUrls.android;

const https = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 300 * 1000,
});

let authTokenRequest: Promise<AuthTokenDTO> | null = null;

https.interceptors.request.use(async (config) => {
  const accessToken = await getSecureStore(tokenKeys.ACCESS);

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  console.log(
    "[Interceptor.request] request.headers.Authorization:",
    config.headers.Authorization
  );

  return config;
});

type RetryAxiosRequestConfig = AxiosRequestConfig & {
  __isRetryRequest?: boolean;
};

https.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;
    const originalRequest: RetryAxiosRequestConfig = config;

    if (!response) return Promise.reject(error);

    // console.log("[Interceptor] response: ", response);
    // console.log("[Interceptor] originalRequest: ", originalRequest);

    console.log(
      "[Interceptor.error] originalRequest response.status: ",
      response.status
    );
    console.log(
      "[Interceptor.error] originalRequest error:",
      response.data.error
    );
    console.log(
      "[Interceptor.error] originalRequest url:",
      originalRequest.url
    );
    console.log(
      "[Interceptor.error] originalRequest __isRetryRequest: ",
      originalRequest.__isRetryRequest
    );

    if (response.status === 401 && !originalRequest.__isRetryRequest) {
      console.log("[Interceptor.error] try reissue!");
      originalRequest.__isRetryRequest = true;

      if (!authTokenRequest) {
        console.log("[Interceptor.error] activateReissue!");
        authTokenRequest = activateReissue();
      }

      try {
        const { accessToken, refreshToken } = await authTokenRequest;
        await saveSecureStore(tokenKeys.ACCESS, accessToken);
        await saveSecureStore(tokenKeys.REFRESH, refreshToken);
        console.log(
          "[Interceptor.error] reissue success and retry originalRequest:",
          originalRequest.url
        );
        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${accessToken}`,
        };
        return https(originalRequest);
      } catch (refreshError) {
        console.log(
          "[Interceptor.error] catch the refreshError:",
          refreshError
        );
        if (https.defaults.headers.common["Authorization"]) {
          delete https.defaults.headers.common["Authorization"];
        }
        await deleteSecureStore(tokenKeys.ACCESS);
        await deleteSecureStore(tokenKeys.REFRESH);
        router.replace("/auth");
        return Promise.reject(refreshError);
      } finally {
        authTokenRequest = null;
      }
    }

    return Promise.reject(error);
  }
);

// 토큰 갱신 중 추가 토큰 갱신을 시도하지 않도록 막음
const activateReissue = async () => {
  try {
    return await reissue();
  } catch (error) {
    console.log("[refreshAuthToken] error:", error);
    throw new Error("Failed to refresh auth token");
  }
};

// 토큰 갱신 API
const reissue = async (): Promise<AuthTokenDTO> => {
  console.log("[reissue] reissue start!");

  const refreshToken = await getSecureStore(tokenKeys.REFRESH);
  console.log("[reissue] refreshToken in secureStore:", refreshToken);

  const { data } = await axios.post("/api/auth/token/reissue", null, {
    baseURL: BASE_URL,
    headers: {
      "X-Refresh-Token": `Bearer ${refreshToken}`,
    },
  });

  console.log("[reissue] data:", data.body);

  return data.body;
};

export { BASE_URL, https };
