import AuthRoute from "@/components/feature/auth/AuthRoute";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LikeScreen() {
  return (
    <AuthRoute>
      <SafeAreaView>
        <Text>좋아요 스크린</Text>
      </SafeAreaView>
    </AuthRoute>
  );
}
