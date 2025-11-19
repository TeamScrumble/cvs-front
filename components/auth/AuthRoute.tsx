import { router, useFocusEffect } from "expo-router";
import React, { ReactNode } from "react";

interface AuthRouteProps {
  children: ReactNode;
}

function AuthRoute({ children }: AuthRouteProps) {
  useFocusEffect(() => {
    // 로그인 유저가 아니면 auth로 보내야함
    router.replace("/auth");
  });
  return <>{children}</>;
}

export default AuthRoute;
