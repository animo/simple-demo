import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { getAgentInfo } from "../api/AgentApi";
import { createCredentialDefinition } from "../api/CredentialApi";

export interface Props {}

export const Home: React.FC<Props> = () => {
  const [state, setState] = useState("offline");

  useEffect(() => {
    window.localStorage.removeItem("connectionId");
    window.localStorage.removeItem("credentialDefinitionId");

    const getAgentState = async () => {
      const credDef = await createCredentialDefinition();
      const agent = await getAgentInfo();
      if (credDef && agent.data.isInitialized) {
        window.localStorage.setItem("credentialDefinitionId", credDef);
        setState("online");
      }
    };
    getAgentState();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <Link to={`/invitation`}>
        <button
          disabled={state !== "online"}
          className={
            state === "online"
              ? "bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-700"
              : "bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700"
          }
        >
          Lets Start
        </button>
      </Link>
      <div className="flex p-6">
        <p className="text-sm text-gray-500 mx-2 py-2">Agent: {state}</p>
      </div>
    </div>
  );
};
