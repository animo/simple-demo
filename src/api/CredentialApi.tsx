import axios, { AxiosResponse } from "axios";

const baseUrl = process.env.REACT_APP_HOST_BACKEND ?? "http://localhost:49161";

const api = axios.create({ baseURL: baseUrl });

export const issueCredential = (connectionId: string, credDefId: string, name: string): Promise<AxiosResponse> => {
  return api.post("/issue-credentials/send-offer", {
    comment: "Here is your Animo Credential",
    connection_id: connectionId,
    cred_def_id: credDefId,
    credential_preview: {
      "@type": "did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/issue-credential/1.0/credential-preview",
      attributes: [
        {
          name: "Name",
          value: name,
        },
        {
          name: "Points",
          value: 1000,
        },
      ],
    },
  });
};

export const getCredentialById = (credentialId: string): Promise<AxiosResponse> => {
  return api.get(`/credentials/${credentialId}`);
};
