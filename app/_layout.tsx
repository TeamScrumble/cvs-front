// @@iconify-code-gen

import queryClient from "@/api/queryClient";
import { fontMap } from "@/constants";
import useAuth from "@/hooks/queries/useAuth";
import { PortalProvider } from "@gorhom/portal";
import { QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";

let isInitialCheckDone = false;

// 스플래시 스크린이 자동으로 숨겨지지 않도록 설정
SplashScreen.preventAutoHideAsync();

const AuthInitializer = () => {
  const { reissueMutate } = useAuth();

  useEffect(() => {
    (async () => {
      // 앱 실행시 최초 1회 + 로그인이 안 된 상태라면 authScreen으로 보냄
      if (!isInitialCheckDone) {
        isInitialCheckDone = true;
        reissueMutate();
      }
    })();
  }, []);

  return null;
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

  if (!loaded) return null; // null 혹은 로딩 스피너

  return (
    <QueryClientProvider client={queryClient}>
      <AuthInitializer />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <PortalProvider>
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
        </PortalProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
