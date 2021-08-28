import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";

import { createConnection, getConnectionById } from "../api/ConnectionApi";

var QRCode = require("qrcode.react");

export interface Props {}

export const Invitation: React.FC<Props> = () => {
  const [state, setState] = useState();
  const [invitation, setInvitation] = useState();
  const [connectionId, setConnectionId] = useState("");

  useEffect(() => {
    const fetchInvitation = async () => {
      const inv = await createConnection();
      setInvitation(inv.data.invitation_url);
      setConnectionId(inv.data.connection.connection_id);
    };
    fetchInvitation();
  }, []);

  useEffect(() => {
    const fetchConnection = async () => {
      if (connectionId) {
        const con = await getConnectionById(connectionId);
        setState(con.data.state);
      }
    };
    const timer = setInterval(() => {
      fetchConnection();
    }, 2000);

    return () => clearTimeout(timer);
  }, [connectionId]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex p-6">
        <div className="flex-none w-44 relative">{invitation && <QRCode value={invitation} />}</div>
        <form className="flex-auto pl-6">
          <div className="flex flex-wrap items-baseline">
            <h1 className="w-full flex-none font-semibold mb-2.5">Animo Solutions</h1>
            <div className="text-4xl leading-7 font-bold text-red-600">Connect with us</div>
            <div className="text-sm font-medium text-gray-400 ml-3">do it</div>
          </div>

          <p className="text-sm text-gray-500">You can use any wallet you want</p>
          {state && <p className="text-sm text-gray-500">State: {state}</p>}
        </form>
      </div>
      {state === "responded" && <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} />}
    </div>
  );
};
