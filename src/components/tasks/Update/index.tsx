import { trpc } from "@utils/trpc";
import useTasks from "@_hooks/useTasks";
import { useRouter } from "next/router";
import React, { useState } from "react";

const TaskUpdate = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const router = useRouter();
  const taskId: string = router.query.taskId as string;
  const { editTask, deleteTask } = useTasks();
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

          editTask.mutate(
            { taskId, name, description },
            {
              onSuccess: () => {
                router.push("/dashboard");
              },
            }
          );
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
        <div className="mt-5 flex w-full items-center justify-between gap-3">
          <button
            className="btn--skeleton flex-grow"
            onClick={(e) => {
              e.preventDefault();

              deleteTask.mutate(
                { taskId },
                {
                  onSuccess: () => {
                    router.push("/dashboard");
                  },
                }
              );
            }}
          >
            Delete
          </button>
          <button
            className="btn--contained flex-grow shadow-none"
            disabled={!name.length}
          >
            Update
          </button>
        </div>
      </form>
    </section>
  );
};

export default TaskUpdate;
