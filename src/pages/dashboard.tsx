import React from "react";
import { signOut } from "next-auth/react";
import authenticated from "@layouts/authenticated";
import { trpc } from "@utils/trpc";
import Timer from "@components/timer";

const Dashboard = () => {
  const settingsQuery = trpc.settings.fetchSettings.useQuery();

  console.log(settingsQuery.data);
  return (
    <div>
      <h3>Dashboard</h3>
      <Timer />
      <button onClick={() => signOut()}>Log Out</button>
    </div>
  );
};

export default authenticated(Dashboard);
