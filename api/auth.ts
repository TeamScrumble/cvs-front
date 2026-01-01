import { CR, LoginProvider } from "@/@types/dto";
import { AuthTokenDTO } from "@/@types/dto/authDto";
import { https } from "./axios";
import { getSecureStore } from "@/utils/secureStore";
import { tokenKeys } from "@/constants/auth";

const exchange = async (params: {
  ticket: string;
  provider: LoginProvider;
}): Promise<AuthTokenDTO & { provider: LoginProvider }> => {
  console.log("[exchange] start!");

  const { data } = await https.post<CR<AuthTokenDTO>>(
    "/api/auth/token/exchange",
    { ticket: params.ticket }
  );

  console.log("[exchange] data: ", data);

  return { ...data.body, provider: params.provider };
};

const logout = async () => {
  console.log("[logout] start!");

  const accessToken = await getSecureStore(tokenKeys.ACCESS);

  console.log("[logout] accessToken in secureStore:", accessToken);

  const { data } = await https.post<CR<{ success: boolean }>>("/api/auth/logout");

  console.log("[logout] data:", data);

  return data.body;
};

export { exchange, logout };
