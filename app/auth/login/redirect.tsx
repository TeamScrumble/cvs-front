import useAuth from "@/hooks/queries/useAuth";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";

function RedirectScreen() {
  const params = useLocalSearchParams();
  const { exchangeMutation, provider } = useAuth();

  useEffect(() => {
    const ticket = params.ticket as string | undefined;

    if (!ticket || !provider) return;

    exchangeMutation.mutate({ ticket, provider });
  }, [params, provider]);

  return null;
}

export default RedirectScreen;
  