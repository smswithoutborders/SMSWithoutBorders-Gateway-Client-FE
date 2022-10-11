import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_GATEWAY_API_URL;

export async function getState() {
  const { data } = await axios.get("/system/state");
  return data;
}

export async function getModems() {
  const { data } = await axios.get("/modems");
  return data;
}
