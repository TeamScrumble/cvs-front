import "react-native-reanimated";

// @@iconify-code-gen
import { getMe } from "@/api/member";
import queryClient from "@/api/queryClient";
import { getReviewAspectInfo, getReviewReportReason } from "@/api/review";
import { ModalProvider } from "@/components/ui/modal/ModalProvider";
import { fontMap } from "@/constants";
import { queryKeys } from "@/constants/queryKey";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { PortalProvider } from "@gorhom/portal";
import { QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import * as NavigationBar from "expo-navigation-bar";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { ReactNode, useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

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
};

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <PreloadQueries />
        <PortalProvider>
          <BottomSheetModalProvider>
            <ModalProvider>{children}</ModalProvider>
          </BottomSheetModalProvider>
        </PortalProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
};

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
      </Stack>
    </Providers>
  );
}
