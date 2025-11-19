// @@iconify-code-gen

import { fontMap } from "@/constants";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { router, Stack } from "expo-router";
import { useEffect } from "react";
import "react-native-reanimated";

let isInitialCheckDone = false;

// 스플래시 스크린이 자동으로 숨겨지지 않도록 설정
SplashScreen.preventAutoHideAsync();

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

  useEffect(() => {
    // 앱 실행시 최초 1회 + 로그인이 안 된 상태라면
    if (!isInitialCheckDone) {
      isInitialCheckDone = true;

      // 로그인 화면으로 이동
      // setTimeout은 네비게이션 마운트 시점 안전장치
      setTimeout(() => {
        router.replace("/auth");
      }, 0);
    }
  }, []);

  if (!loaded) return null; // null 혹은 로딩 스피너

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="auth" options={{ headerShown: false }} />
      <Stack.Screen
        name="modal"
        options={{ presentation: "modal", title: "Modal" }}
      />
    </Stack>
  );
}
