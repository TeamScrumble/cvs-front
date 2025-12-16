import axios from "axios";
import { Platform } from "react-native";

const baseUrls = {
  android: process.env.EXPO_PUBLIC_API_URL,
  ios: process.env.EXPO_PUBLIC_API_URL,
}

const BASE_URL = Platform.OS === "ios" ? baseUrls.ios : baseUrls.android;

const https = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

export { BASE_URL, https };
