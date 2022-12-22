import React from "react";
import { type FunctionComponent } from "react";
import { type ReactElement } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Pomodoro from "public/images/bowling-ball.svg";
import ProfilePicture from "public/images/user-circle.svg";

const layoutsPomodoro = (Page: FunctionComponent) =>
  function Content(): ReactElement {
    const router = useRouter();
    const { status, data: sessionData } = useSession();

    useEffect(() => {
      const redirect = () => {
        if (status === "unauthenticated") {
          router.push("/sign-in");
        }
      };

      redirect();
    }, [sessionData, status]);

    if (status === "loading" || !sessionData) return <></>;

    console.log(sessionData.user);
    return (
      <>
        <nav className="flex items-center justify-between p-4">
          <div className="flex items-center gap-1">
            <img src={Pomodoro.src} alt="Pomodoro" />
            <h1>Pomodoro</h1>
          </div>
          <img
            className="h-7 w-7 rounded-full border-2 border-cGray-300"
            src={sessionData.user?.image || ProfilePicture.src}
            alt="Profile Picture"
            referrerPolicy="no-referrer"
          />
        </nav>
        <Page />
      </>
    );
  };

export default layoutsPomodoro;
