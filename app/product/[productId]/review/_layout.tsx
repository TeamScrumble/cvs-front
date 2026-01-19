import IconButton from "@/components/ui/button/IconButton";
import { colors, icons } from "@/constants";
import { router, Stack } from "expo-router";

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
        name="index"
        options={{
          headerShown: true,
          headerShadowVisible: false,
          headerTitle: "상품 후기 더보기",
          headerTitleAlign: "left",
          headerLeft: () => {
            return (
              <IconButton
                icon={icons.chevronLeftLine}
                size={24}
                color={colors.SLATE_800}
                onPress={() => router.back()}
                style={{ marginRight: 14 }}
              />
            );
          },
        }}
      />
      <Stack.Screen
        name="[reviewId]"
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
            );
          },
        }}
      />
    </Stack>
  );
}
