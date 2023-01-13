import React from "react";
import { signOut, useSession } from "next-auth/react";
import authenticated from "@layouts/authenticated";
import Timer from "@components/timer";
import TasksList from "@components/tasks";
import Navbar from "@components/navbar";

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col gap-20 px-5 py-14">
        <Timer />
        <TasksList />
      </div>
    </>
  );
};

export default authenticated(Dashboard);
