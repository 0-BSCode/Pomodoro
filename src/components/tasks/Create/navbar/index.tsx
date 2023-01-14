import React from "react";
import Link from "next/link";
import icons from "@assets/images/icons";

const CreateTaskNavbar = () => {
  return (
    <nav className="shadow--soft flex items-center justify-center p-5">
      <div className="flex w-8 flex-1 items-center justify-between md:max-w-md">
        <img src={icons.pomodoroIcon} alt="Pomodoro" className="w-6" />
        <h1 className="text-xl">Add Task</h1>
        <Link href="/dashboard" passHref>
          <button className="btn--skeleton">Cancel</button>
        </Link>
      </div>
    </nav>
  );
};

export default CreateTaskNavbar;
