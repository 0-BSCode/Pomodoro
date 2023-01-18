import React from "react";
import Head from "next/head";
import { useTimerContext } from "@context/timerContext";

const Header = () => {
  const { titleDisplay } = useTimerContext();
  return (
    <Head>
      <title>{titleDisplay ?? "Pomodoro"}</title>
      <meta name="description" content="Generated by create-t3-app" />
      <link rel="icon" href="/images/clipboard-notes.svg" />
    </Head>
  );
};

export default Header;
