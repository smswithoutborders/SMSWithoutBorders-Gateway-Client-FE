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

export async function sendMessage(modem: any, message: NewSMS) {
  const { data } = await axios.post(`/modems/${modem}/sms`, message);
  return data;
}

export async function deleteMessage(modem: any, id: number) {
  const { data } = await axios.delete(`/modems/${modem}/sms/${id}`);
  return data;
}

export async function getSettings() {
  const { data } = await axios.get("/system/configs");
  return data;
}

export async function updateSetting({ key, value, section }: any) {
  const { data } = await axios.post(`/system/configs/sections/${section}`, {
    [key]: value,
  });
  return data;
}
