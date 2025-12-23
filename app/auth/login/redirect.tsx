import { LoginProvider } from "@/@types/dto";
import useAuth from "@/hooks/queries/useAuth";
import { getSecureStore } from "@/utils/secureStore";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";

function RedirectScreen() {
  const params = useLocalSearchParams();
  const { exchangeMutation } = useAuth();

  useEffect(() => {
    (async () => {
      const ticket = params.ticket as string | undefined;
      const provider = (await getSecureStore("lastTriedLoginProvider")) as
        | LoginProvider
        | undefined;
      console.log("ticket: ", ticket);
      console.log("provider: ", provider);

      if (!ticket || !provider) return;

      console.log("exchangeMutation start");

      exchangeMutation.mutate({ ticket, provider });
    })();
  }, []);

  return null;
}

export default RedirectScreen;
