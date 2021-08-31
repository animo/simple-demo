import axios, { AxiosResponse } from "axios";

const baseUrl = process.env.REACT_APP_HOST_BACKEND ?? "http://localhost:49160";
const credDefId = process.env.REACT_APP_CREDENTIAL_DEFINITION_ID ?? "";

const api = axios.create({ baseURL: baseUrl });

export const issueCredential = (connectionId: string, name: string, title: string): Promise<AxiosResponse> => {
  return api.post("/issue-credentials/send-offer", {
    comment: "string",
    connection_id: connectionId,
    cred_def_id: credDefId,
    credential_preview: {
      "@type": "did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/issue-credential/1.0/credential-preview",
      attributes: [
        {
          name: "name",
          value: name,
        },
        {
          name: "title",
          value: title,
        },
      ],
    },
  });
};

export const getCredentialById = (credentialId: string): Promise<AxiosResponse> => {
  return api.get(`/credentials/${credentialId}`);
};
