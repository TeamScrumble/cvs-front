import { LoginProvider } from "@/@types/dto";
import { getSecureStore } from "@/utils/secureStore";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback } from "react";
import { useAuthAction } from "@/hooks/queries/useAuth";

function RedirectScreen() {
  const params = useLocalSearchParams();
  const { exchangeMutation } = useAuthAction();

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const ticket = params.ticket as string | undefined;
        const provider = (await getSecureStore("lastTriedLoginProvider")) as
          | LoginProvider
          | undefined;

        console.log("[RedirectScreen] ticket: ", ticket);
        console.log("[RedirectScreen] provider: ", provider);

        if (!ticket || !provider) return;

        console.log("[RedirectScreen] exchangeMutation start");

        exchangeMutation.mutate({ ticket, provider });
      })();
    }, [])
  );

  return null;
}

export default RedirectScreen;
