import { useAuthQuery } from "@/hooks/queries/useAuth";
import { Redirect } from "expo-router";
import React, { ReactNode, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Loading from "../Loading";

type Props = {
  children: ReactNode;
}

const MIN_LOADING_TIME = 800;

const AuthRoute = ({ children }: Props) => {
  const { auth, isLoading } = useAuthQuery();
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, MIN_LOADING_TIME);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading || showLoading) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Loading />
      </SafeAreaView>
    );
  }

  if (!auth?.id) {
    return <Redirect href={"/auth"} />;
  }

  return <>{children}</>;
};

export default AuthRoute;
