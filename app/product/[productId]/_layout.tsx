import { router, Stack } from "expo-router";
import { colors, icons } from "@/constants";
import IconButton from "@/components/button/IconButton";

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
        name="index"
        options={{
          headerShown: true,
          headerTitle: "",
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
                icon={icons.search}
                size={24}
                color={colors.SLATE_800}
                onPress={() => {}}
              />
            )
          }

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
