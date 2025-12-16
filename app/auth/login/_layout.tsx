import { Stack } from "expo-router";
import { colors } from "@/constants";

export default function LoginLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: colors.WHITE,
        },
      }}
    >
      <Stack.Screen
        name="redirect"
        options={{
          title: "리다이렉트",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
