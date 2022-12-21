import React, { type ReactElement, type ReactNode } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

interface Props {
  children: ReactNode;
}

const RouteGuard = ({ children }: Props): ReactElement => {
  const router = useRouter();
  const { status, data } = useSession({
    required: true,
    onUnauthenticated: () => {
      router.push("/");
    },
  });

  if (status === "loading" && data === undefined) {
    return <p>Loading...</p>;
  }

  return <>{children}</>;
};

export default RouteGuard;
