import axios, { AxiosResponse } from "axios";

const baseUrl = process.env.REACT_APP_HOST_BACKEND ?? "http://localhost:49160";
const credDefId = process.env.REACT_APP_CREDENTIAL_DEFINITION_ID ?? "";

const api = axios.create({ baseURL: baseUrl });

export const createProofRequest = (connectionId: string): Promise<AxiosResponse> => {
  return api.post(`/proofs/${connectionId}/send-request`, {
    proof_request: {
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
    },
    comment: "Agent Jan want's to know your Animo Title",
  });
};

export const getProofByThreadId = (threadId: string): Promise<AxiosResponse> => {
  return api.get(`/proofs/${threadId}`);
};
