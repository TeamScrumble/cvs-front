import axios from "axios";
import { Platform } from "react-native";

const baseUrls = {
  android: "http://localhost:3030",
  ios: "http://localhost:3030",
} 

const axiosInstance = axios.create({
  baseURL: Platform.OS === "ios" ? baseUrls.ios : baseUrls.android,
});

export { baseUrls, axiosInstance };
