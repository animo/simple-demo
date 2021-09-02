import axios, { AxiosResponse } from "axios";

const baseUrl = process.env.REACT_APP_HOST_BACKEND ?? "http://localhost:49160";

const api = axios.create({ baseURL: baseUrl });

export const createProofRequest = (connectionId: string, credDefId: string): Promise<AxiosResponse> => {
  return api.post(`/proofs/${connectionId}/request-proof`, {
    requested_predicates: {},
    requested_attributes: {
      additionalProp1: {
        restrictions: [
          {
            cred_def_id: credDefId,
          },
        ],
        name: "title",
      },
    },
    version: "1.0",
    name: "Animo Title Request",
    comment: "Animo Solutions wants to know your Animo Title",
  });
};

export const getProofById = (proofId: string): Promise<AxiosResponse> => {
  return api.get(`/proofs/${proofId}`);
};
