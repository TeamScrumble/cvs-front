import { tokenKeys } from "@/constants/auth";
import useAuth from "@/hooks/queries/useAuth";
import { setHeader } from "@/utils/header";
import { getSecureStore } from "@/utils/secureStore";
import { useFocusEffect } from "expo-router";
import React, { ReactNode, useCallback } from "react";
import { Text, View } from "react-native";

interface AuthRouteProps {
  children: ReactNode;
}

const AuthRoute = ({ children }: AuthRouteProps) => {
  const {
    reissueMutation: { mutate, isSuccess },
  } = useAuth();

  const callbackMutate = useCallback(() => {
    let isActive = true;

    const run = async () => {
      const refreshToken = await getSecureStore(tokenKeys.REFRESH);
      console.log("run refreshToken: ", refreshToken);
      setHeader("X-Refresh-Token", refreshToken ? refreshToken : "");
      if (isActive) mutate();
    };

    run();

    return () => {
      isActive = false;
    };
  }, [mutate]);

  useFocusEffect(callbackMutate);

  if (isSuccess) return <>{children}</>;

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>로딩중이지롱</Text>
    </View>
  );
}

export default AuthRoute;
