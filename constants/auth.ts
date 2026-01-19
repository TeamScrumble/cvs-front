const tokenKeys = {
  REFRESH: "refreshToken",
  ACCESS: "accessToken",
};

const loginProvider = {
  KAKAO: "kakao",
  NAVER: "naver",
  GOOGLE: "google",
  EMAIL: "email",
} as const;

export { tokenKeys, loginProvider };
