import axios, { AxiosResponse } from "axios";

const baseUrl = process.env.REACT_APP_HOST_BACKEND ?? "http://localhost:5000";

const api = axios.create({ baseURL: baseUrl });

export const issueCredential = async (
  connectionId: string,
  credDefId: string,
  name: string,
  title: string
): Promise<AxiosResponse> => {
  return api.post(`/credentials/${connectionId}/offer-credential`, {
    comment: "Here is your Animo Employee Card",
    credentialDefinitionId: credDefId,
    preview: {
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
    tag: "Animo Employee Card",
    supportRevocation: false,
    schemaId: "WghBqNdoFjaYh6F5N9eBF:2:Animo-Employee-Card:1.0",
  });

  return data.data.id;
};
