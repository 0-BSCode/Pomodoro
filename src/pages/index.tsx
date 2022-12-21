import { type NextPage } from "next";
import Header from "@/components/_common/Header";
import Pomodoro from "public/images/bowling-ball.svg";
import { signIn, signOut, useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";
import { useState } from "react";

const Home: NextPage = () => {
  const hello = trpc.example.hello.useQuery({ text: "from tRPC" });
  const { data: tasks, refetch } = trpc.task.fetchTasks.useQuery();
  const { mutate: addTask } = trpc.task.addTask.useMutation({
    onSuccess: () => {
      refetch();
    },
  });
  const { mutate: deleteTask } = trpc.task.deleteTask.useMutation({
    onSuccess: () => {
      refetch();
    },
  });
  const { mutate: updateTask } = trpc.task.editTask.useMutation({
    onSuccess: () => {
      refetch();
    },
  });

  const [name, setName] = useState<string>("");
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-center">
        <section className="flex flex-col items-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-cGray-200">
            <img className="w-10" src={Pomodoro.src} alt="Pomodoro" />
          </div>
          <div className="mt-7 flex flex-col items-center">
            <h1 className="font-bold">Pomodoro</h1>
            <p>A better way to focus.</p>
          </div>
        </section>
        <section className="mt-10 flex w-48 flex-col items-center">
          <button className="btn--contained w-full" onClick={() => signIn()}>
            Sign In
          </button>
        </section>
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  console.log(sessionData);

  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => signOut() : () => signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
