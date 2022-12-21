import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";
import RouteGuard from "@/components/_common/routeGuard";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <RouteGuard>
        <Component {...pageProps} />
      </RouteGuard>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
