import { Stack } from "expo-router";
import { colors } from "@/constants";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: colors.WHITE,
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "로그인",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          title: "리다이렉트",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
