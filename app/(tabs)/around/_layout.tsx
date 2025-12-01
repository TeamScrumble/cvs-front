import { colors } from "@/constants";
import { Stack } from "expo-router";

export default function AroundLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: colors.WHITE,
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{ 
          headerShown: false, 
          title: "내 주변" 
        }}
      />
    </Stack>
  );
}