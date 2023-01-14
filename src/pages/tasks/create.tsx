import React from "react";
import authenticated from "@layouts/authenticated";
import TaskCreate from "@components/tasks/Create";
import CreateTaskNavbar from "@components/tasks/Create/navbar";

const CreateTaskPage = () => {
  return (
    <>
      <CreateTaskNavbar />
      <TaskCreate />
    </>
  );
};

export default authenticated(CreateTaskPage);
