import { CR } from "@/@types/dto";
import { https } from "./axios";
import { GetMeDTO } from "@/@types/dto/authDto";
import { tokenKeys } from "@/constants/auth";
import { getSecureStore } from "@/utils/secureStore";
import { router } from "expo-router";

const getMe = async () => {
  console.log("[getMe] start!");

  const accessToken = await getSecureStore(tokenKeys.ACCESS);
  if (!accessToken) {
    console.log("[getMe] accessToken is not exist!");
    router.replace("/auth");
    return { memberId: 0, email: "", nickname: "", profileImage: "" };
  }

  const { data } = await https.get<CR<GetMeDTO>>("/api/member/me");
  console.log("[getMe] data: ", data);

  return data.body;
};

export { getMe };
