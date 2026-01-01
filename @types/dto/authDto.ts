export type AuthTokenDTO = {
  accessToken: string;
  refreshToken: string;
};

export type GetMeDTO = {
  memberId: number;
  email: string;
  nickname: string;
  profileImage: string;
}