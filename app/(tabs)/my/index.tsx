import AuthRoute from "@/components/feature/auth/AuthRoute";
import CustomButton from "@/components/ui/button/CustomButton";
import { useAuthAction, useAuthQuery } from "@/hooks/queries/useAuth";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MyScreen() {
  const { auth } = useAuthQuery();
  const { logoutMutation } = useAuthAction();
  return (
    <AuthRoute>
      <SafeAreaView>
        <Text>내 정보 스크린</Text>
        <Text>{`id : ${auth?.id}`}</Text>
        <Text>{`닉네임 : ${auth?.nickname}`}</Text>
        <Text>{`이메일 : ${auth?.email}`}</Text>
        <CustomButton
          label="로그아웃"
          onPress={() => logoutMutation.mutate()}
        />
      </SafeAreaView>
    </AuthRoute>
  );
}
