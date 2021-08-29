import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";

import { issueCredential, getCredentialById } from "../api/CredentialApi";

export interface Props {}

export const Credential: React.FC<Props> = () => {
  const [name, setName] = useState("");
  const [credentialId, setCredentialId] = useState();
  // const [state, setState] = useState();
  const con = localStorage.getItem("connectionId") ?? "";

  const handleChange = (e: any) => {
    setName(e.target.value);
  };

  const onButtonClick = async (e: any) => {
    e.preventDefault();
    if (!credentialId) {
      const cred = await issueCredential(con, "WghBqNdoFjaYh6F5N9eBF:3:CL:3109:Animo Card", name);
      console.log(cred.data);
      setCredentialId(cred.data.credential_id);
    }
  };

  // useEffect(() => {
  //   const fetchCredential = async () => {
  //     if (credentialId) {
  //       const con = await getCredentialById(credentialId);
  //       setState(con.data.state);
  //     }
  //   };
  //   const timer = setInterval(() => {
  //     fetchCredential();
  //   }, 2000);

  //   return () => clearTimeout(timer);
  // }, [credentialId]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex p-6">
        <form className="flex-auto pl-6">
          <div className="flex flex-wrap items-baseline mb-4">
            <h1 className="w-full flex-none font-semibold mb-2.5">Animo Solutions</h1>
            <div className="text-4xl leading-7 font-bold text-blue-600">Lets issue a credential</div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-left" htmlFor="inline-full-name">
                Full Name
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-100"
                id="inline-full-name"
                type="text"
                onChange={handleChange}
                value={name}
              />
            </div>
          </div>
          <div className="md:flex">
            <button
              className={`bg-blue-500 text-white font-bold py-2 px-4 rounded ${
                name === "" ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
              }`}
              disabled={name === ""}
              onClick={onButtonClick}
            >
              Send it
            </button>

            {credentialId && (
              <p className="text-sm text-gray-500 mx-2 py-2">Check your agent and accept your Animo Card</p>
            )}
            {credentialId && <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} />}
          </div>
        </form>
      </div>
    </div>
  );
};
