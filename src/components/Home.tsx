import React from "react";

import { Link } from "react-router-dom";

export interface Props {}

export const Home: React.FC<Props> = () => {
  window.localStorage.removeItem("connectionId");
  return (
    <div className="flex items-center justify-center h-screen">
      <Link to={`/invitation`}>
        <button
          className={`bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700
          `}
        >
          Lets Start
        </button>
      </Link>
    </div>
  );
};
