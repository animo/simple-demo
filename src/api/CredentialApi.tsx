import axios, { AxiosResponse } from "axios";

const baseUrl = process.env.REACT_APP_HOST_BACKEND ?? "http://localhost:49160";

const api = axios.create({ baseURL: baseUrl });

export const issueCredential = async (
  connectionId: string,
  credDefId: string,
  name: string,
  title: string
): Promise<AxiosResponse> => {
  return api.post(`/credentials/${connectionId}/offer-credential`, {
    comment: "Here is your Animo Employee Card",
    cred_def_id: credDefId,
    credential_preview: {
      "@type": "https://didcomm.org/issue-credential/1.0/credential-preview",
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

export const createCredentialDefinition = async () => {
  const data = await api.post(`/credential-defintions/`, {
    tag: "latest",
    support_revocation: false,
    schema_id: "WghBqNdoFjaYh6F5N9eBF:2:Animo-Employee-Card:1.0",
  });

  return data.data.credential_definition_id;
};
