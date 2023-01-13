import React, { useState } from "react";
import icons from "@assets/images/icons";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: sessionData } = useSession();
  const [showProfileActions, setShowProfileActions] = useState<boolean>(false);

  return (
    <nav className="shadow--soft flex items-center justify-between p-5">
      <img src={icons.pomodoroIcon} alt="Pomodoro" />
      <h1>Focus</h1>
      <button
        className="btn--skeleton relative"
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
      </button>
    </nav>
  );
};

export default Navbar;
