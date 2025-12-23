import { router, Stack } from "expo-router";
import { colors, icons } from "@/constants";
import IconButton from "@/components/button/IconButton";

export default function ReviewLayout() {
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
        name="write"
        options={{
          headerShown: true,
          headerShadowVisible: false,
          headerTitle: "상품 후기",
          headerTitleAlign: "center",
          headerLeft: () => {
            return (
              <IconButton
                icon={icons.chevronLeftLine}
                size={24}
                color={colors.SLATE_800}
                onPress={() => router.back()}
              />
            );
          },
          headerRight: () => {
            return (
              <IconButton
                icon={icons.homeOutline}
                size={24}
                color={colors.SLATE_800}
                onPress={() => router.push("/home")}
              />
            )
          }
        }}
      />
    </Stack>
  );
}
