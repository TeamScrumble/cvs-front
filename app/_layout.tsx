// @@iconify-code-gen

import queryClient from "@/api/queryClient";
import { fontMap } from "@/constants";
import { PortalProvider } from "@gorhom/portal";
import { QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { ReactNode, useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import { StatusBar } from "expo-status-bar";
import * as NavigationBar from "expo-navigation-bar";
import { queryKeys } from "@/constants/queryKey";
import { getMe } from "@/api/member";
import { getReviewAspectInfo, getReviewReportReason } from "@/api/review";
import { ModalProvider } from "@/components/modal/ModalProvider";

// 스플래시 스크린이 자동으로 숨겨지지 않도록 설정
SplashScreen.preventAutoHideAsync();

const PreloadQueries = () => {
  useEffect(() => {
    console.log("[PreloadQueries] start!");
    queryClient.prefetchQuery({
      queryFn: getMe,
      queryKey: [queryKeys.AUTH],
    });
    queryClient.prefetchQuery({
      queryFn: getReviewAspectInfo,
      queryKey: [queryKeys.REVIEW, queryKeys.GET_ASPECTINFO],
    });
    queryClient.prefetchQuery({
      queryFn: getReviewReportReason,
      queryKey: [queryKeys.REVIEW, queryKeys.GET_REPORT_REASON],
    });
  }, []);
  return null;
}

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <PreloadQueries />
      <PortalProvider>
        <ModalProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            {children}
          </GestureHandlerRootView>
        </ModalProvider>
      </PortalProvider>
    </QueryClientProvider>
  );
}

export default function RootLayout() {
  const [loaded, error] = useFonts(fontMap);

  // 폰트 로딩 실패
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  // 폰트 로드가 완료되면 스플래시 스크린 숨김
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // 안드로이드 하단 네비게이션바
  useEffect(() => {
    NavigationBar.setButtonStyleAsync("dark");
  }, []);

  if (!loaded) return null; // null 혹은 로딩 스피너

  return (
    <Providers>
      {/* 상단 상태바 */}
      <StatusBar style="dark" />
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="auth" options={{ headerShown: false }} />
        <Stack.Screen name="product" options={{ headerShown: false }} />
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", title: "Modal" }}
        />
        <Stack.Screen
          name="store-selection"
          options={{
            presentation: "transparentModal",
            headerShown: false,
            animation: "fade",
          }}
        />
      </Stack>
    </Providers>
  );
}
