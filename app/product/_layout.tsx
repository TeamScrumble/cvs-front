import { Stack } from "expo-router";
import { colors } from "@/constants";

export default function ProductLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: colors.WHITE,
        },
      }}
    >
      <Stack.Screen
        name="[id]"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="review"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
