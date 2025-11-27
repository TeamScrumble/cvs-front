const colors = {
  MAIN: "#5DAA8F",
  BACKGROUND: "#F7EEDB",
  SUB1: "#F2A65A",
  SUB2: "#754D26",
  BLACK: "#1D2027",
  WHITE: "#FFFFFF",
  GRAY: "#999999",
  SLATE_200: "#DBDEE3",
  SLATE_500: "#717580",
  SLATE_800: "#1D2027",
};

const fontMap = {
  chab: require("@/assets/fonts/chab.ttf"),
  regular: require("@/assets/fonts/Pretendard-Regular.ttf"),
  semiBold: require("@/assets/fonts/Pretendard-SemiBold.ttf"),
  bold: require("@/assets/fonts/Pretendard-Bold.ttf"),
};

const fonts = {
  CHAB: "chab",
  REGULAR: "regular",
  SEMI_BOLD: "semiBold",
  BOLD: "bold",
} as const;

const icons = {
  home: "material-symbols-light:home-rounded",
  homeOutline: "material-symbols-light:home-outline-rounded",
  search: "circum:search",
  person: "material-symbols-light:person-rounded",
  personOutline: "material-symbols-light:person-outline-rounded",
  heartLight: "ph:heart-light",
  heartFill: "ph:heart-fill",
  alert: "fluent:alert-20-regular",
};

const queryKeys = {};

const loginProvider = {
  KAKAO: "kakao",
  NAVER: "naver",
  GOOGLE: "google",
  EMAIL: "email",
} as const;

type LoginProvider = typeof loginProvider[keyof typeof loginProvider] | null;

export { colors, fontMap, fonts, icons, queryKeys, loginProvider, LoginProvider };