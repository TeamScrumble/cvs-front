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
        name="report"
        options={{
          headerShown: true,
          headerShadowVisible: false,
          headerTitle: "후기 신고",
          headerTitleAlign: "left",
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
        }}
      />
    </Stack>
  );
}
