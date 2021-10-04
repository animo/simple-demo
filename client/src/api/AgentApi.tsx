import axios, { AxiosResponse } from "axios";

const baseUrl = process.env.REACT_APP_HOST_BACKEND ?? "http://localhost:5000";

const api = axios.create({ baseURL: baseUrl });

export const getAgentInfo = (): Promise<AxiosResponse> => {
  return api.get("/agent/");
};
