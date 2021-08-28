import axios, { AxiosResponse } from "axios";

const baseUrl = process.env.REACT_APP_HOST_BACKEND ?? "http://localhost:49160";

const api = axios.create({ baseURL: baseUrl });

export const createConnection = (): Promise<AxiosResponse> => {
  return api.post("/connections/create-invitation", {
    autoAcceptConnection: true,
  });
};

export const getConnectionById = (connectionId: string): Promise<AxiosResponse> => {
  return api.get(`/connections/${connectionId}`);
};