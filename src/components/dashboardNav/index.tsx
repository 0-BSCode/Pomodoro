import React, { useState } from "react";
import icons from "@assets/images/icons";
import { useSession, signOut } from "next-auth/react";

const DashboardNavbar = () => {
  const { data: sessionData } = useSession();
  const [showProfileActions, setShowProfileActions] = useState<boolean>(false);

  return (
    <nav className="shadow--soft flex items-center justify-center p-5">
      <div className="flex w-8 flex-1 items-center justify-between md:max-w-md">
        <img src={icons.pomodoroIcon} alt="Pomodoro" className="w-6" />
        <h1 className="text-2xl">Focus</h1>
        <div className="relative">
          <button
            className="btn--skeleton"
            onClick={(e) => {
              e.preventDefault();
              setShowProfileActions(!showProfileActions);
            }}
          >
            <img
              className="h-7 w-7 rounded-full"
              src={sessionData?.user?.image || icons.personIcon}
              alt="Profile Picture"
              referrerPolicy="no-referrer"
            />
          </button>
          {showProfileActions && (
            <div className="tooltip">
              <button
                className="shadow-none"
                onClick={(e) => {
                  e.preventDefault();
                  signOut();
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
