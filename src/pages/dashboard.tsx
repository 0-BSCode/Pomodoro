import React from "react";
import { signOut } from "next-auth/react";
import authenticated from "@layouts/authenticated";
import Timer from "@components/timer";
import TasksList from "@components/tasks";

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-20 px-5 pt-14">
      <Timer />
      <TasksList />
      <button onClick={() => signOut()}>Log Out</button>
    </div>
  );
};

export default authenticated(Dashboard);
