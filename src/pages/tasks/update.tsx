import React from "react";
import authenticated from "@layouts/authenticated";
import icons from "@assets/images/icons";
import Link from "next/link";
import TaskUpdate from "@components/tasks/Update";

const CreateTaskPage = () => {
  return (
    <>
      <nav className="shadow--soft flex items-center justify-between p-5">
        <img src={icons.pomodoroIcon} alt="Pomodoro" />
        <h1 className="text-xl">Add Task</h1>
        <Link href="/dashboard" passHref>
          <button className="btn--skeleton">Cancel</button>
        </Link>
      </nav>
      <TaskUpdate />
    </>
  );
};

export default authenticated(CreateTaskPage);
