import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { getProofFromBase64 } from "../utils/ProofUtils";

// api
import { createProofRequest, getProofByThreadId } from "../api/ProofApi";

// components
import { CompletedModal } from "./CompletedModal";

export interface Props {}

export const Proof: React.FC<Props> = () => {
  const [open, setOpen] = useState(true);
  const [proof, setProof] = useState();
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
        if (con.data.state === "presentation-received") {
          clearInterval(timer);
          var proof = getProofFromBase64(con.data.presentationMessage.presentationAttachments[0].data.base64);
          setProof(proof);
          setOpen(true);
        }
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
      {state === "presentation-received" ? (
        <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} />
      ) : null}
      {proof && <CompletedModal open={open} setOpen={setOpen} proof={proof} />}
    </div>
  );
};
