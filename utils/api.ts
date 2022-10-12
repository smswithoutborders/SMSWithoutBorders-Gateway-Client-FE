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

export async function getMessages(modem: any) {
  const { data } = await axios.get(`/modems/${modem}/sms`);
  return data;
}

export async function sendMessage(message: NewSMS, modem: any) {
  const { data } = await axios.post(`/modems/${modem}/sms`, message);
  return data;
}
