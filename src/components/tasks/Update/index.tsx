import { trpc } from "@utils/trpc";
import { useRouter } from "next/router";
import React, { useState } from "react";

const TaskUpdate = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const router = useRouter();
  const taskId: string = router.query.taskId as string;
  const fetchTask = trpc.task.fetchTask.useQuery(
    { id: taskId },
    {
      onSuccess: (data) => {
        setName(data.name);
        setDescription(data.description ?? "");
      },
    }
  );

  if (fetchTask.isLoading)
    return <p className="mt-10 text-center">Loading...</p>;

  return (
    <section className="flex flex-col items-center gap-10 px-5 pt-10">
      <h2 className="px-10 text-center text-2xl">
        Give your task a name and short description
      </h2>
      <form
        className="flex w-full flex-col items-center gap-4"
        onSubmit={(e) => {
          e.preventDefault();

          // createTask.mutate(
          //   { name, description },
          //   {
          //     onSuccess: () => {
          //       router.push("/dashboard");
          //     },
          //   }
          // );
        }}
      >
        <input
          type={"text"}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={"Name your task"}
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={"Describe your task"}
        />
        <button
          className="btn--contained mt-5 w-full shadow-none"
          disabled={!name.length}
        >
          Update
        </button>
      </form>
    </section>
  );
};

export default TaskUpdate;
