import { CR, LoginProvider } from "@/@types/dto";
import { AuthTokenDTO } from "@/@types/dto/authDto";
import { https } from "./axios";

const reissue = async (): Promise<AuthTokenDTO> => {
  const { data } = await https.post<CR<AuthTokenDTO>>("/api/auth/token/reissue");

  return data.body;
}

const exchange = async (params: {
  ticket: string;
  provider: LoginProvider;
}): Promise<AuthTokenDTO & { provider: LoginProvider }> => {
  const { data } = await https.post<CR<AuthTokenDTO>>(
    "/api/auth/token/exchange",
    { ticket: params.ticket }
  );

  return { ...data.body, provider: params.provider };
};

const logout = async () => {
  const { data } = await https.post<CR<AuthTokenDTO>>("/api/auth/logout");

  return data.body;
};

export { reissue, exchange, logout };
