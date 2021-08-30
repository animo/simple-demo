import React, { useEffect, useState } from "react";

import { createProofRequest, getProofByThreadId } from "../api/ProofApi";
import Confetti from "react-confetti";

export interface Props {}

export const Proof: React.FC<Props> = () => {
  const [state, setState] = useState();
  const [threadId, setThreadId] = useState();
  const con = localStorage.getItem("connectionId") ?? "";

  useEffect(() => {
    const requestProof = async () => {
      const resp = await createProofRequest(con);
      setState(resp.data.state);
      setThreadId(resp.data.threadId);
    };
    requestProof();
  }, [con]);

  useEffect(() => {
    const fetchProof = async () => {
      if (threadId) {
        const con = await getProofByThreadId(threadId);
        if (con.data.state === "done") clearInterval(timer);
        setState(con.data.state);
      }
    };
    const timer = setInterval(() => {
      fetchProof();
    }, 2000);

    return () => clearTimeout(timer);
  }, [threadId]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex p-6">
        <form className="flex-auto pl-6">
          <div className="flex flex-wrap items-baseline">
            <h1 className="w-full flex-none font-semibold mb-2.5">Animo Solutions</h1>
            <div className="text-4xl leading-7 font-bold text-green-600 mb-2">Proof your identity</div>
          </div>
          <p className="text-sm text-gray-500 py-2">Check your agent and accept our proof request</p>

          <p className="text-sm text-gray-500"></p>
          {state && (
            <p className="text-sm text-gray-500">
              <strong>State:</strong> {state}
            </p>
          )}
        </form>
      </div>
      {state === "complete" || state === "responded" ? (
        <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} />
      ) : null}
    </div>
  );
};
