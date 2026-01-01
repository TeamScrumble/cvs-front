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
        name="[productId]"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
