import { CR } from "@/@types/dto";
import { https } from "./axios";
import { GetMeDTO } from "@/@types/dto/authDto";

const getMe = async () => {
  console.log("[getMe] start!");

  const { data } = await https.get<CR<GetMeDTO>>("/api/member/me");
  
  console.log("[getMe] data: ", data);

  return data.body;
};

export { getMe }