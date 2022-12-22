import React from "react";
import { type FunctionComponent } from "react";
import { type ReactElement } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const layoutsPomodoro = (Page: FunctionComponent) =>
  function Content(): ReactElement {
    const router = useRouter();
    const { status, data: sessionData } = useSession();

    useEffect(() => {
      const redirect = () => {
        if (status === "loading") return;

        if (!sessionData) {
          router.push("/sign-in");
        }
      };

      redirect();
    }, [sessionData, status]);

    if (status === "loading" || !sessionData) return <></>;
    return <Page />;
  };

export default layoutsPomodoro;
