import axios from "axios";
import { getGatewayApiUrl } from "./storage";

const client = axios.create();

client.interceptors.request.use(
  async (config) => {
    config.baseURL = getGatewayApiUrl();
    return config;
  },
  (error) => Promise.reject(error)
);

export async function getState() {
  const { data } = await client.get("/system/state");
  return data;
}

export async function restartAPI(service: string) {
  const { data } = await client.post(`/system/state/restart/services/${service}`);
  return data;
}

export async function getModems() {
  const { data } = await client.get("/modems");
  return data;
}

export async function getMessages(modem: any) {
  const { data } = await client.get(`/modems/${modem}/sms`);
  return data;
}

export async function sendMessage(modem: any, message: NewSMS) {
  const { data } = await client.post(`/modems/${modem}/sms`, message);
  return data;
}

export async function deleteMessage(modem: any, id: number) {
  const { data } = await client.delete(`/modems/${modem}/sms/${id}`);
  return data;
}

export async function getSettings() {
  const { data } = await client.get("/system/configs");
  return data;
}

export async function updateSetting({ label, value, section }: any) {
  await client.post(`/system/configs/sections/${section}`, {
    [label]: value,
  });
  return { label, value };
}
