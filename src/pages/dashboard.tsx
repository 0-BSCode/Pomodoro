import React from "react";
import { signOut } from "next-auth/react";
import authenticated from "@layouts/authenticated";

const Dashboard = () => {
  return (
    <div>
      <h3>Dashboard</h3>
      <button onClick={() => signOut()}>Log Out</button>
    </div>
  );
};

export default authenticated(Dashboard);
