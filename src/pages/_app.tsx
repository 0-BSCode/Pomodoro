import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import Header from "@components/_common/header";
import { trpc } from "../utils/trpc";

import "../styles/globals.css";
import TimerProvider from "@context/timerContext";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <TimerProvider>
        <>
          <Header />
          <Component {...pageProps} />
        </>
      </TimerProvider>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
