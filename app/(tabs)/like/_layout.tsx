import { colors } from "@/constants";
import { Stack } from "expo-router";

export default function LikeLayout() {
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
          title: "좋아요 목록" 
        }}
      />
    </Stack>
  );
}