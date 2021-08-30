import axios, { AxiosResponse } from "axios";

const baseUrl = process.env.REACT_APP_HOST_BACKEND ?? "http://localhost:49160";

const api = axios.create({ baseURL: baseUrl });

export const createProofRequest = (connectionId: string): Promise<AxiosResponse> => {
  return api.post(`/proofs/${connectionId}/send-request`, {
    proof_request: {
      requested_predicates: {},
      requested_attributes: {
        additionalProp1: {
          restrictions: [
            {
              cred_def_id: "WghBqNdoFjaYh6F5N9eBF:3:CL:3263:latest",
            },
          ],
          name: "title",
        },
      },
      version: "1.0",
      name: "Hoi Timo",
    },
    comment: "lol",
  });
};

export const getProofByThreadId = (threadId: string): Promise<AxiosResponse> => {
  return api.get(`/proofs/${threadId}`);
};
