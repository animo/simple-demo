import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Confetti from "react-confetti";

import { createInvitation, getConnectionById } from "../api/ConnectionApi";

var QRCode = require("qrcode.react");

export interface Props {}

export const Invitation: React.FC<Props> = () => {
  const [state, setState] = useState();
  const [invitation, setInvitation] = useState();
  const [connectionId, setConnectionId] = useState("");

  useEffect(() => {
    const con = localStorage.getItem("connectionId");

    if (con) {
      setConnectionId(con);
    } else {
      const fetchInvitation = async () => {
        const inv = await createInvitation();
        setInvitation(inv.data.invitation_url);
        setConnectionId(inv.data.connection.connection_id);
        setState(inv.data.connection.state);
        localStorage.setItem("connectionId", inv.data.connection.connection_id);
      };
      fetchInvitation();
    }
  }, []);

  useEffect(() => {
    const fetchConnection = async () => {
      if (connectionId) {
        const con = await getConnectionById(connectionId);
        if (con.data.state === "complete") clearInterval(timer);
        setState(con.data.state);
      }
    };
    const timer = setInterval(() => {
      fetchConnection();
    }, 1000);

    return () => clearTimeout(timer);
  }, [connectionId]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex p-6">
        <div className="flex-none w-44 relative">{invitation && <QRCode value={invitation} />}</div>
        <form className="flex-auto pl-6">
          <div className="flex flex-wrap items-baseline">
            <h1 className="w-full flex-none font-semibold mb-2.5">Animo Solutions</h1>
            <div className="text-4xl leading-7 font-bold text-red-600 mb-2">Connect with us</div>
          </div>

          <p className="text-sm text-gray-500">You can use any wallet you want</p>
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
      <Link to="/credential">
        <button
          className={`bg-blue-500 text-white font-bold py-2 px-4 rounded ${
            state !== "complete" && state !== "responded" ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
          disabled={state !== "complete" && state !== "responded"}
        >
          Next
        </button>
      </Link>
    </div>
  );
};
