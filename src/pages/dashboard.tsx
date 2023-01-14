import React from "react";
import authenticated from "@layouts/authenticated";
import Timer from "@components/timer";
import TasksList from "@components/tasks";
import DashboardNavbar from "@components/dashboardNav";

const Dashboard = () => {
  return (
    <>
      <DashboardNavbar />
      <div className="flex flex-col gap-12 px-5 py-14 md:m-auto md:max-w-md">
        <Timer />
        <TasksList />
      </div>
    </>
  );
};

export default authenticated(Dashboard);
