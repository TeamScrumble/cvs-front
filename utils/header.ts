import { https } from "@/api/axios";

function setHeader(key: string, value: string) {
  https.defaults.headers.common[key] = value;
}

function removeHeader(key: string) {
  if (!https.defaults.headers.common[key]) return;

  delete https.defaults.headers.common[key];
}

export { setHeader, removeHeader };
