import { useAuthQuery } from "@/hooks/queries/useAuth";
import { Redirect } from "expo-router";
import React, { ReactNode } from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface AuthRouteProps {
  children: ReactNode;
}

const AuthRoute = ({ children }: AuthRouteProps) => {
  const { auth, isLoading } = useAuthQuery();

  if (isLoading) {
    return (
      <SafeAreaView>
        <Text>로딩중입니다</Text>
      </SafeAreaView>
    );
  }

  if (!auth?.id) {
    return <Redirect href={"/auth"} />;
  }

  return <>{children}</>;
};

export default AuthRoute;
