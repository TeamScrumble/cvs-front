import { CR } from "@/@types/dto";
import { https } from "./axios";
import { GetMeDTO } from "@/@types/dto/authDto";
import { getSecureStore } from "@/utils/secureStore";
import { tokenKeys } from "@/constants/auth";

const getMe = async () => {
  console.log("[getMe] start!");
  const accessToken = await getSecureStore(tokenKeys.ACCESS);

  console.log("[getMe] accessToken in SecureStore : ", accessToken);
  
  const { data } = await https.get<CR<GetMeDTO>>("/api/member/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  console.log("[getMe] data: ", data);

  return data.body;
};

export { getMe }