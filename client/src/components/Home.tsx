import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import logo from "../assets/animo-logo.jpeg";

import { getAgentInfo } from "../api/AgentApi";
import { createCredentialDefinition } from "../api/CredentialApi";

export interface Props {}

export const Home: React.FC<Props> = () => {
  const [status, setStatus] = useState(false);
  const [description, setDescription] = useState("Starting...");

  useEffect(() => {
    window.localStorage.removeItem("connectionId");
    window.localStorage.removeItem("credentialDefinitionId");

    const fetchStatus = async () => {
      setDescription("Checking server status");
      const state = await getAgentInfo();
      console.log(state.status);
      if (state.status === 200) {
        clearInterval(timer);
        getAgentState();
      }
    };
    const timer = setInterval(() => {
      fetchStatus();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const getAgentState = async () => {
    setDescription("Creating credential definition");
    const credDef = await createCredentialDefinition();
    setDescription("Getting agent");
    const agent = await getAgentInfo();
    if (credDef && agent.data.isInitialized) {
      window.localStorage.setItem("credentialDefinitionId", credDef);
      setStatus(true);
      setDescription("Ready!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img className="h-48 m-4" src={logo} alt="animo-logo" />
      <div className="flex p-6">
        <Link to={`/invitation`}>
          <button
            disabled={!status}
            className={
              status
                ? "bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-700"
                : "bg-red-500 text-white font-bold py-2 px-4 rounded bg-opacity-50 cursor-not-allowed"
            }
          >
            Get Started
          </button>
        </Link>
      </div>
      <p className="text-sm text-gray-500 mx-2 py-2">{description}</p>
    </div>
  );
};
