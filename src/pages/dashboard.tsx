import React from "react";
import { signOut, useSession } from "next-auth/react";
import authenticated from "@layouts/authenticated";
import Timer from "@components/timer";
import TasksList from "@components/tasks";
import icons from "@assets/images/icons";

const Dashboard = () => {
  const { data: sessionData } = useSession();

  return (
    <>
      <nav className="shadow--soft flex items-center justify-between p-5">
        <img src={icons.pomodoroIcon} alt="Pomodoro" />
        <h1>Focus</h1>
        <img
          className="h-7 w-7 rounded-full"
          src={sessionData?.user?.image || icons.personIcon}
          alt="Profile Picture"
          referrerPolicy="no-referrer"
        />
      </nav>
      <div className="flex flex-col gap-20 px-5 pt-14">
        <Timer />
        <TasksList />
        <button onClick={() => signOut()}>Log Out</button>
      </div>
    </>
  );
};

export default authenticated(Dashboard);
